/**
 * NEXORA API — /api/digital-twin
 * GET → full city snapshot: all 9 zones with traffic + flood + complaints overlay
 */

import db from '../../../lib/db';
import { allow, withErrorHandler } from '../../../lib/middleware';

const ZONE_COORDS = {
  Vashi:            { lat: 19.0748, lng: 73.0071 },
  Nerul:            { lat: 19.0399, lng: 73.0181 },
  Kharghar:         { lat: 19.0475, lng: 73.0750 },
  Belapur:          { lat: 19.0221, lng: 73.0344 },
  Airoli:           { lat: 19.1500, lng: 72.9990 },
  Ghansoli:         { lat: 19.1200, lng: 73.0100 },
  'Kopar Khairane': { lat: 19.1083, lng: 73.0083 },
  Taloja:           { lat: 19.0083, lng: 73.0917 },
  Ulwe:             { lat: 18.9700, lng: 73.0500 },
};

export default withErrorHandler(async function handler(req, res) {
  if (!allow(req, res, ['GET'])) return;

  const zones = Object.keys(ZONE_COORDS).map(zoneName => {
    const traffic = db.traffic.zones[zoneName] || {};
    const coords = ZONE_COORDS[zoneName];

    // Flood risk for this zone (match by name)
    const floodKey = Object.keys(db.flood.zones).find(k => k.includes(zoneName));
    const flood = floodKey ? db.flood.zones[floodKey] : null;

    // Complaints in this zone
    const zoneComplaints = db.complaints.filter(c => c.zone === zoneName);

    // Overall zone status: worst of traffic + flood
    let overallStatus = traffic.status || 'green';
    if (flood?.riskLevel === 'red') overallStatus = 'red';
    else if (flood?.riskLevel === 'yellow' && overallStatus === 'green') overallStatus = 'yellow';

    return {
      name: zoneName,
      ...coords,
      status: overallStatus,
      traffic: {
        density: traffic.density || 0,
        status: traffic.status || 'green',
        signalMode: traffic.signalMode || 'normal',
        predictedJamAt: traffic.predictedJamAt || null,
      },
      flood: flood
        ? {
            riskLevel: flood.riskLevel,
            rainfallMM: flood.rainfallMM,
            pumpStatus: flood.pumpStatus,
            barrierStatus: flood.barrierStatus,
            alert: flood.alert,
          }
        : { riskLevel: 'green', rainfallMM: 0, pumpStatus: 'off', barrierStatus: 'not-deployed', alert: false },
      complaints: {
        total: zoneComplaints.length,
        open: zoneComplaints.filter(c => c.status !== 'Resolved').length,
        highPriority: zoneComplaints.filter(c => c.priority === 'High' || c.priority === 'Critical').length,
      },
      emergency: db.emergency.active.filter(e => e.zone === zoneName).length,
    };
  });

  const summary = {
    redZones: zones.filter(z => z.status === 'red').length,
    yellowZones: zones.filter(z => z.status === 'yellow').length,
    greenZones: zones.filter(z => z.status === 'green').length,
    totalActiveEmergencies: db.emergency.active.length,
    totalOpenComplaints: db.complaints.filter(c => c.status !== 'Resolved').length,
    imdForecast: db.flood.imdForecast,
  };

  return res.status(200).json({
    success: true,
    zones,
    summary,
    updatedAt: new Date().toISOString(),
  });
});

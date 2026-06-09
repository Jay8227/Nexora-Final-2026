/**
 * NEXORA API — /api/dashboard
 * GET → aggregated city-wide metrics for Dashboard page
 */

import db from '../../lib/db';
import { allow, withErrorHandler } from '../../lib/middleware';

export default withErrorHandler(async function handler(req, res) {
  if (!allow(req, res, ['GET'])) return;

  // Drift IoT device counts slightly
  const iot = db.dashboard.iot;
  iot.trafficSensors += Math.floor(Math.random() * 3);
  iot.energyMeters += Math.floor(Math.random() * 5);

  // Aggregate from live stores
  const redZones = Object.values(db.traffic.zones).filter(z => z.status === 'red').length;
  const floodAlerts = db.flood.activeAlerts;
  const activeEmergencies = db.emergency.active.length;
  const openComplaints = db.complaints.filter(c => c.status !== 'Resolved').length;

  const activeAlerts = redZones + floodAlerts + activeEmergencies;

  const metrics = {
    iot,
    activeAlerts,
    citizenRequests: db.complaints.length,
    energyEfficiency: db.dashboard.energyEfficiency,
    aqi: db.dashboard.aqi,
    systemHealth: 98.7,
    zones: {
      red: redZones,
      yellow: Object.values(db.traffic.zones).filter(z => z.status === 'yellow').length,
      green: Object.values(db.traffic.zones).filter(z => z.status === 'green').length,
    },
    complaints: {
      total: db.complaints.length,
      open: openComplaints,
      resolved: db.complaints.filter(c => c.status === 'Resolved').length,
    },
    emergency: {
      active: activeEmergencies,
      avgResponseTime: db.emergency.stats.avgResponseTimeNow,
    },
    flood: {
      activeAlerts: floodAlerts,
    },
    predictions: {
      traffic: db.traffic.predictions.length,
      avgConfidence: 88,
    },
    updatedAt: new Date().toISOString(),
  };

  return res.status(200).json({ success: true, metrics });
});

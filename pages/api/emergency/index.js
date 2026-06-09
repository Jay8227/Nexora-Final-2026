/**
 * NEXORA API — /api/emergency
 * GET  → active emergencies + hospital list + stats
 * POST → trigger new emergency response (clears signals, dispatches ambulance)
 * PATCH /api/emergency/[id] → update emergency status
 */

import db from '../../lib/db';
import { allow, withErrorHandler } from '../../lib/middleware';

/** Find the nearest available hospital to incident location */
function nearestHospital(zone) {
  const zonePreference = {
    Vashi: 'MGM Hospital',
    Nerul: 'DY Patil Hospital',
    Belapur: 'Apollo Hospitals',
    Kharghar: 'MGM Hospital',
    Airoli: 'MGM Hospital',
    Ghansoli: 'MGM Hospital',
    'Kopar Khairane': 'DY Patil Hospital',
    Taloja: 'Apollo Hospitals',
    Ulwe: 'Apollo Hospitals',
  };
  const preferred = zonePreference[zone];
  const hospital = db.emergency.hospitals.find(h => h.name === preferred && h.available);
  return hospital || db.emergency.hospitals.find(h => h.available) || db.emergency.hospitals[0];
}

/** Estimate response time based on zone proximity */
function estimateResponseTime(zone) {
  const times = { Vashi: 7, Nerul: 8, Kharghar: 9, Belapur: 8, Airoli: 10, Ghansoli: 9, 'Kopar Khairane': 8, Taloja: 11, Ulwe: 12 };
  return times[zone] || 9;
}

export default withErrorHandler(async function handler(req, res) {
  if (!allow(req, res, ['GET', 'POST'])) return;

  // ── GET ────────────────────────────────────────────────────────────────────
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      active: db.emergency.active,
      resolved: db.emergency.resolved.slice(-10), // last 10
      hospitals: db.emergency.hospitals,
      stats: db.emergency.stats,
      updatedAt: new Date().toISOString(),
    });
  }

  // ── POST (new emergency) ───────────────────────────────────────────────────
  if (req.method === 'POST') {
    const { type, location, zone, reportedBy } = req.body || {};
    if (!type || !location) {
      return res.status(400).json({ error: 'type and location are required' });
    }

    const emergencyZone = zone || 'Vashi';
    const hospital = nearestHospital(emergencyZone);
    const eta = estimateResponseTime(emergencyZone);
    const signalsCleared = Math.floor(Math.random() * 5) + 5; // 5–10

    const emergency = {
      id: `EM-${String(db.emergency.active.length + db.emergency.resolved.length + 1).padStart(3, '0')}`,
      type,
      location,
      zone: emergencyZone,
      reportedAt: new Date().toISOString(),
      reportedBy: reportedBy || 'Citizen Report',
      assignedHospital: hospital.name,
      estimatedArrival: eta,
      routeCleared: true,
      signalsCleared,
      status: 'en-route',
    };

    db.emergency.active.push(emergency);

    // Update stats
    db.emergency.stats.totalSignalsCleared += signalsCleared;
    db.emergency.stats.avgResponseTimeNow = Math.round(
      (db.emergency.stats.avgResponseTimeNow + eta) / 2
    );

    console.log(`[NEXORA Emergency] ${emergency.id} → ${type} at ${location} — ${hospital.name} dispatched, ETA ${eta} min`);

    return res.status(201).json({
      success: true,
      emergency,
      message: `Emergency response activated. ${hospital.name} dispatched. ETA: ${eta} min. ${signalsCleared} signals cleared.`,
      decisionEngine: {
        action: 'Route cleared, signals pre-empted',
        signalsCleared,
        hospital: hospital.name,
        eta,
      },
    });
  }
});

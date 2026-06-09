/**
 * NEXORA API — /api/traffic
 * GET  → all zone data + predictions
 * POST → update a zone's density (sensor push simulation)
 */

import db from '../../lib/db';
import { allow, withErrorHandler } from '../../lib/middleware';

/** Simulate realistic density drift */
function driftDensity(current) {
  const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
  return Math.max(0, Math.min(100, current + delta));
}

/** Derive status from density */
function statusFromDensity(density) {
  if (density >= 80) return 'red';
  if (density >= 55) return 'yellow';
  return 'green';
}

/** Predict jam time (~30-45 min ahead if trending red) */
function predictJam(density, zone) {
  if (density >= 80) {
    const minutesAhead = Math.floor(Math.random() * 16) + 30; // 30-45
    const d = new Date(Date.now() + minutesAhead * 60 * 1000);
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  }
  return null;
}

export default withErrorHandler(async function handler(req, res) {
  if (!allow(req, res, ['GET', 'POST'])) return;

  // ── GET ────────────────────────────────────────────────────────────────────
  if (req.method === 'GET') {
    // Live-drift each zone
    for (const zone of Object.keys(db.traffic.zones)) {
      const z = db.traffic.zones[zone];
      z.density = driftDensity(z.density);
      z.status = statusFromDensity(z.density);
      z.predictedJamAt = predictJam(z.density, zone);
      z.signalMode = z.density >= 55 ? 'adaptive' : 'normal';
    }

    const criticalZones = Object.entries(db.traffic.zones)
      .filter(([, v]) => v.status === 'red')
      .map(([name, v]) => ({ name, ...v }));

    return res.status(200).json({
      success: true,
      zones: db.traffic.zones,
      predictions: db.traffic.predictions,
      criticalZones,
      sensors: {
        total: db.traffic.totalSensors,
        active: db.traffic.activeSensors,
      },
      updatedAt: new Date().toISOString(),
    });
  }

  // ── POST (sensor push) ────────────────────────────────────────────────────
  if (req.method === 'POST') {
    const { zone, density } = req.body || {};
    if (!zone || density === undefined) {
      return res.status(400).json({ error: 'zone and density are required' });
    }
    if (!db.traffic.zones[zone]) {
      return res.status(404).json({ error: `Zone ${zone} not found` });
    }

    db.traffic.zones[zone].density = Math.max(0, Math.min(100, Number(density)));
    db.traffic.zones[zone].status = statusFromDensity(density);
    db.traffic.zones[zone].predictedJamAt = predictJam(density, zone);
    db.traffic.zones[zone].signalMode = density >= 55 ? 'adaptive' : 'normal';

    return res.status(200).json({ success: true, zone: db.traffic.zones[zone] });
  }
});

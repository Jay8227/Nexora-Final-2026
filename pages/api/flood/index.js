/**
 * NEXORA API — /api/flood
 * GET  → all zone risk levels + IMD forecast
 * POST → trigger pump / barrier (admin action)
 */

import db from '../../../lib/db';
import { allow, withErrorHandler } from '../../../lib/middleware';

/** Simulate rainfall drift */
function driftRainfall(current) {
  return Math.max(0, Math.min(100, current + (Math.random() * 4 - 2)));
}

/** Compute risk from rainfall + drainage */
function computeRisk(rainfallMM, drainageCapacity) {
  const load = (rainfallMM / drainageCapacity) * 100;
  if (load >= 55) return 'red';
  if (load >= 30) return 'yellow';
  return 'green';
}

export default withErrorHandler(async function handler(req, res) {
  if (!allow(req, res, ['GET', 'POST'])) return;

  // ── GET ────────────────────────────────────────────────────────────────────
  if (req.method === 'GET') {
    // Drift rainfall values
    for (const zone of Object.keys(db.flood.zones)) {
      const z = db.flood.zones[zone];
      z.rainfallMM = parseFloat(driftRainfall(z.rainfallMM).toFixed(1));
      z.riskLevel = computeRisk(z.rainfallMM, z.drainageCapacity);
      z.alert = z.riskLevel === 'red';

      // Auto-activate pumps in red zones
      if (z.riskLevel === 'red' && z.pumpStatus === 'off') {
        z.pumpStatus = 'active';
      }
    }

    db.flood.activeAlerts = Object.values(db.flood.zones).filter(z => z.alert).length;

    // Refresh IMD timestamp
    db.flood.imdForecast.updatedAt = new Date().toISOString();

    return res.status(200).json({
      success: true,
      zones: db.flood.zones,
      imdForecast: db.flood.imdForecast,
      activeAlerts: db.flood.activeAlerts,
      totalDrainageSensors: db.flood.totalDrainageSensors,
      warningAdvanceHours: '6–12',
      updatedAt: new Date().toISOString(),
    });
  }

  // ── POST (admin action) ────────────────────────────────────────────────────
  if (req.method === 'POST') {
    const { zone, action } = req.body || {};
    if (!zone || !action) return res.status(400).json({ error: 'zone and action are required' });
    if (!db.flood.zones[zone]) return res.status(404).json({ error: `Zone "${zone}" not found` });

    const z = db.flood.zones[zone];
    const validActions = ['activate-pump', 'deactivate-pump', 'deploy-barrier', 'recall-barrier'];
    if (!validActions.includes(action)) {
      return res.status(400).json({ error: `Invalid action. Must be one of: ${validActions.join(', ')}` });
    }

    if (action === 'activate-pump') z.pumpStatus = 'active';
    if (action === 'deactivate-pump') z.pumpStatus = 'off';
    if (action === 'deploy-barrier') z.barrierStatus = 'deployed';
    if (action === 'recall-barrier') z.barrierStatus = 'not-deployed';

    console.log(`[NEXORA Flood] ${action} → ${zone}`);

    return res.status(200).json({
      success: true,
      zone: z,
      message: `Action "${action}" executed for ${zone}`,
    });
  }
});

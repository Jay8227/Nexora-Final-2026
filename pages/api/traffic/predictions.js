/**
 * NEXORA API — /api/traffic/predictions
 * GET  → current AI predictions
 * POST → add a new prediction (Decision Engine push)
 */

import db from '../../../lib/db';
import { allow, withErrorHandler } from '../../../lib/middleware';

export default withErrorHandler(async function handler(req, res) {
  if (!allow(req, res, ['GET', 'POST', 'PATCH'])) return;

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      predictions: db.traffic.predictions,
      count: db.traffic.predictions.length,
    });
  }

  if (req.method === 'POST') {
    const { road, zone, expectedAt, confidence, action } = req.body || {};
    if (!road || !zone) return res.status(400).json({ error: 'road and zone required' });

    const prediction = {
      id: Date.now(),
      road,
      zone,
      expectedAt: expectedAt || 'TBD',
      confidence: confidence || 80,
      action: action || 'Signal timing adjustment',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    db.traffic.predictions.push(prediction);
    return res.status(201).json({ success: true, prediction });
  }

  if (req.method === 'PATCH') {
    const { id, status } = req.body || {};
    const pred = db.traffic.predictions.find(p => p.id === id);
    if (!pred) return res.status(404).json({ error: 'Prediction not found' });
    pred.status = status;
    return res.status(200).json({ success: true, prediction: pred });
  }
});

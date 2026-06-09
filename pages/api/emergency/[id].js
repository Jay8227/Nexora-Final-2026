/**
 * NEXORA API — /api/emergency/[id]
 * PATCH → update status (resolve, etc.)
 * GET   → single emergency details
 */

import db from '../../../lib/db';
import { allow, withErrorHandler } from '../../../lib/middleware';

export default withErrorHandler(async function handler(req, res) {
  if (!allow(req, res, ['GET', 'PATCH'])) return;

  const { id } = req.query;

  let emergency = db.emergency.active.find(e => e.id === id)
    || db.emergency.resolved.find(e => e.id === id);

  if (!emergency) return res.status(404).json({ error: `Emergency ${id} not found` });

  if (req.method === 'GET') {
    return res.status(200).json({ success: true, emergency });
  }

  if (req.method === 'PATCH') {
    const { status } = req.body || {};

    if (status === 'resolved') {
      emergency.status = 'resolved';
      emergency.resolvedAt = new Date().toISOString();

      const responseMs = new Date(emergency.resolvedAt) - new Date(emergency.reportedAt);
      emergency.responseTimeMinutes = Math.round(responseMs / 60000);

      // Move from active → resolved
      db.emergency.active = db.emergency.active.filter(e => e.id !== id);
      db.emergency.resolved.push(emergency);
    } else {
      emergency.status = status;
    }

    return res.status(200).json({ success: true, emergency });
  }
});

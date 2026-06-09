/**
 * NEXORA API — /api/complaints/[id]
 * GET   → get complaint by ID (citizen status tracking)
 * PATCH → update status (officer/admin)
 */

import db from '../../../lib/db';
import { allow, withErrorHandler } from '../../../lib/middleware';

export default withErrorHandler(async function handler(req, res) {
  if (!allow(req, res, ['GET', 'PATCH'])) return;

  const { id } = req.query;
  const complaint = db.complaints.find(c => c.id === id);

  if (!complaint) {
    return res.status(404).json({ error: `Complaint ${id} not found` });
  }

  // ── GET ────────────────────────────────────────────────────────────────────
  if (req.method === 'GET') {
    return res.status(200).json({ success: true, complaint });
  }

  // ── PATCH ─────────────────────────────────────────────────────────────────
  if (req.method === 'PATCH') {
    const { status, note, priority, assignedTo } = req.body || {};
    const now = new Date().toISOString();

    if (status) complaint.status = status;
    if (priority) complaint.priority = priority;
    if (assignedTo) complaint.assignedTo = assignedTo;
    complaint.updatedAt = now;

    if (status || note) {
      complaint.timeline.push({
        status: status || complaint.status,
        time: now,
        note: note || `Status updated to ${status}`,
      });
    }

    console.log(`[NEXORA] Complaint ${id} updated → ${complaint.status}`);

    return res.status(200).json({ success: true, complaint });
  }
});

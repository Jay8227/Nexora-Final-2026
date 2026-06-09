/**
 * NEXORA API — /api/complaints/escalate
 * POST → trigger escalation check (call this from a cron job / Vercel cron)
 *
 * Escalation ladder:
 *  Day 7  → Supervisor
 *  Day 15 → Department Head
 *  Day 30 → Minister Dashboard
 *  Day 45 → Public Escalation Report
 */

import db from '../../../lib/db';
import { allow, withErrorHandler } from '../../../lib/middleware';

const ESCALATION_DAYS = [7, 15, 30, 45];
const ESCALATION_LABELS = ['Supervisor', 'Department Head', 'Minister Dashboard', 'Public Escalation Report'];

export default withErrorHandler(async function handler(req, res) {
  if (!allow(req, res, ['POST', 'GET'])) return;

  const now = new Date();
  const escalated = [];

  for (const complaint of db.complaints) {
    if (['Resolved', 'Closed'].includes(complaint.status)) continue;

    const ageMs = now - new Date(complaint.submittedAt);
    const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));

    for (let i = ESCALATION_DAYS.length - 1; i >= 0; i--) {
      if (ageDays >= ESCALATION_DAYS[i] && complaint.escalationLevel <= i) {
        complaint.escalationLevel = i + 1;
        complaint.updatedAt = now.toISOString();
        complaint.timeline.push({
          status: `Escalated — ${ESCALATION_LABELS[i]}`,
          time: now.toISOString(),
          note: `Auto-escalated on Day ${ageDays}: Reached ${ESCALATION_LABELS[i]}`,
        });
        escalated.push({ id: complaint.id, level: i + 1, label: ESCALATION_LABELS[i], ageDays });
        break;
      }
    }
  }

  return res.status(200).json({
    success: true,
    checkedAt: now.toISOString(),
    escalated,
    message: `Checked ${db.complaints.length} complaints. ${escalated.length} escalated.`,
  });
});

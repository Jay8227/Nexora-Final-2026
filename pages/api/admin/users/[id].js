/**
 * NEXORA API — /api/admin/users/[id]
 * PATCH  → update user status/role
 * DELETE → remove user
 */

import db from '../../../../lib/db';
import { allow, withErrorHandler } from '../../../../lib/middleware';

export default withErrorHandler(async function handler(req, res) {
  if (!allow(req, res, ['PATCH', 'DELETE'])) return;

  const { id } = req.query;
  const userIndex = db.users.findIndex(u => u.id === Number(id));

  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

  if (req.method === 'PATCH') {
    const { status, role } = req.body || {};
    if (status) db.users[userIndex].status = status;
    if (role) db.users[userIndex].role = role;
    return res.status(200).json({ success: true, user: db.users[userIndex] });
  }

  if (req.method === 'DELETE') {
    const deleted = db.users.splice(userIndex, 1)[0];
    return res.status(200).json({ success: true, deleted });
  }
});

/**
 * NEXORA API — /api/admin
 * GET  → system overview (users, alerts, stats)
 * POST → add user
 */

import db from '../../lib/db';
import { allow, withErrorHandler } from '../../lib/middleware';

const systemAlerts = [
  { id: 1, type: 'traffic', message: 'Kharghar zone hit RED — signal adaptive mode activated', time: new Date(Date.now() - 5 * 60000).toISOString(), priority: 'high' },
  { id: 2, type: 'flood', message: 'Taloja MIDC — flood pumps auto-activated (rainfall 42mm)', time: new Date(Date.now() - 20 * 60000).toISOString(), priority: 'high' },
  { id: 3, type: 'system', message: 'Database backup completed successfully', time: new Date(Date.now() - 2 * 3600000).toISOString(), priority: 'low' },
  { id: 4, type: 'complaint', message: '3 complaints auto-escalated (Day 7 threshold)', time: new Date(Date.now() - 3600000).toISOString(), priority: 'medium' },
];

export default withErrorHandler(async function handler(req, res) {
  if (!allow(req, res, ['GET', 'POST', 'DELETE'])) return;

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      users: db.users,
      alerts: systemAlerts,
      stats: {
        totalUsers: db.users.length,
        activeSessions: Math.floor(Math.random() * 200) + 50,
        systemUptime: '99.9%',
        avgResponseTime: '0.8s',
      },
      complaintStats: {
        total: db.complaints.length,
        pending: db.complaints.filter(c => c.status === 'Pending').length,
        inProgress: db.complaints.filter(c => c.status === 'In Progress').length,
        resolved: db.complaints.filter(c => c.status === 'Resolved').length,
        escalated: db.complaints.filter(c => c.escalationLevel > 0).length,
      },
    });
  }

  if (req.method === 'POST') {
    const { name, email, role } = req.body || {};
    if (!name || !email || !role) {
      return res.status(400).json({ error: 'name, email, and role are required' });
    }
    const user = {
      id: db.users.length + 1,
      name,
      email,
      role,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
    return res.status(201).json({ success: true, user });
  }
});

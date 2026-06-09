/**
 * NEXORA API — /api/complaints
 * GET  → list complaints (optional ?status=&zone=&category= filters)
 * POST → submit a new complaint (AI classification + duplicate detection)
 */

import db from '../../../lib/db';
import { allow, withErrorHandler, classifyComplaint, detectDuplicates, extractZone } from '../../../lib/middleware';

export default withErrorHandler(async function handler(req, res) {
  if (!allow(req, res, ['GET', 'POST'])) return;

  // ── GET ────────────────────────────────────────────────────────────────────
  if (req.method === 'GET') {
    let data = [...db.complaints];

    const { status, zone, category, limit = 50, page = 1 } = req.query;

    if (status) data = data.filter(c => c.status.toLowerCase() === status.toLowerCase());
    if (zone) data = data.filter(c => c.zone.toLowerCase() === zone.toLowerCase());
    if (category) data = data.filter(c => c.category.toLowerCase().includes(category.toLowerCase()));

    // newest first
    data.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    const total = data.length;
    const start = (Number(page) - 1) * Number(limit);
    const paginated = data.slice(start, start + Number(limit));

    const stats = {
      total: db.complaints.length,
      pending: db.complaints.filter(c => c.status === 'Pending').length,
      inProgress: db.complaints.filter(c => c.status === 'In Progress').length,
      resolved: db.complaints.filter(c => c.status === 'Resolved').length,
      escalated: db.complaints.filter(c => c.escalationLevel > 0).length,
    };

    return res.status(200).json({ success: true, complaints: paginated, total, stats });
  }

  // ── POST ───────────────────────────────────────────────────────────────────
  if (req.method === 'POST') {
    const { category, subject, description, location, contact } = req.body || {};

    if (!category || !subject || !description || !location) {
      return res.status(400).json({ error: 'Missing required fields: category, subject, description, location' });
    }

    const zone = extractZone(location);
    const { department, priority } = classifyComplaint(category, description);
    const duplicateCount = detectDuplicates(db.complaints, category, zone);
    const id = db.nextComplaintId();
    const now = new Date().toISOString();

    const complaint = {
      id,
      category,
      subject,
      description,
      location,
      zone,
      contact: contact || '',
      status: 'Pending',
      priority,
      department,
      assignedTo: `${department} — ${zone}`,
      submittedAt: now,
      updatedAt: now,
      escalationLevel: 0,
      duplicateCount: duplicateCount + 1, // includes this one
      timeline: [
        {
          status: 'Submitted',
          time: now,
          note: duplicateCount > 0
            ? `Complaint received — clustered with ${duplicateCount} similar report(s) in ${zone}`
            : 'Complaint received and registered',
        },
        {
          status: 'Classified',
          time: now,
          note: `AI Classification → ${department} | Priority: ${priority} | Zone: ${zone}`,
        },
      ],
    };

    db.complaints.push(complaint);

    // Simulate email notification (logged)
    console.log(`[NEXORA] New complaint ${id} → ${department} (${priority}) in ${zone}`);

    return res.status(201).json({
      success: true,
      complaint,
      message: `Complaint filed successfully. Tracking ID: ${id}`,
      aiClassification: { department, priority, zone, duplicateCount },
    });
  }
});

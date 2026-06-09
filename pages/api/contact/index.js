/**
 * NEXORA API — /api/contact
 * POST → submit contact form / citizen feedback
 */

import { allow, withErrorHandler } from '../../../lib/middleware';

if (!global._feedbackStore) global._feedbackStore = [];

export default withErrorHandler(async function handler(req, res) {
  if (!allow(req, res, ['GET', 'POST'])) return;

  if (req.method === 'GET') {
    return res.status(200).json({ success: true, feedback: global._feedbackStore });
  }

  if (req.method === 'POST') {
    const { name, email, subject, message, type } = req.body || {};
    if (!name || !message) {
      return res.status(400).json({ error: 'name and message are required' });
    }

    const entry = {
      id: global._feedbackStore.length + 1,
      name,
      email: email || '',
      subject: subject || 'General Inquiry',
      message,
      type: type || 'General Feedback',
      submittedAt: new Date().toISOString(),
    };
    global._feedbackStore.push(entry);

    console.log(`[NEXORA Contact] New feedback from ${name}: ${subject}`);

    return res.status(201).json({
      success: true,
      message: 'Thank you for your feedback. Our team will respond within 24 hours.',
      id: entry.id,
    });
  }
});

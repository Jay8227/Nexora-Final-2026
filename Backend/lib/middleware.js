/**
 * NEXORA — Shared Middleware Helpers
 */

/**
 * CORS + method guard middleware
 * Usage: if (!allow(req, res, ['GET','POST'])) return;
 */
function allow(req, res, methods = ['GET']) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', methods.join(', '));
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return false;
  }
  if (!methods.includes(req.method)) {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
    return false;
  }
  return true;
}

/**
 * Wrap a handler with try/catch so unhandled errors return 500.
 */
function withErrorHandler(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (err) {
      console.error('[NEXORA API Error]', err);
      res.status(500).json({ error: 'Internal server error', message: err.message });
    }
  };
}

/**
 * Determine department and priority from complaint category (AI classification sim).
 */
function classifyComplaint(category, description = '') {
  const map = {
    'Road Maintenance': { department: 'PWD', priority: 'High' },
    'Street Lighting': { department: 'Electrical Department', priority: 'Medium' },
    'Garbage Collection': { department: 'Waste Management', priority: 'Medium' },
    'Water Supply': { department: 'Water Supply Division', priority: 'High' },
    'Electricity': { department: 'Electrical Department', priority: 'High' },
    'Public Safety': { department: 'Police / NMMC Safety', priority: 'Critical' },
    'Parks & Recreation': { department: 'NMMC Parks Dept', priority: 'Low' },
    'Traffic Management': { department: 'Traffic Police', priority: 'Medium' },
    'Noise Complaint': { department: 'NMMC Enforcement', priority: 'Low' },
    'Education': { department: 'Education Department', priority: 'Medium' },
    'Healthcare': { department: 'NMMC Health Dept', priority: 'High' },
    'Other': { department: 'NMMC General', priority: 'Low' },
  };

  // Keyword boost
  const desc = (description || '').toLowerCase();
  let priority = map[category]?.priority || 'Low';
  if (desc.includes('accident') || desc.includes('emergency') || desc.includes('danger')) priority = 'Critical';
  else if (desc.includes('overflow') || desc.includes('broken') || desc.includes('urgent')) priority = 'High';

  return {
    department: map[category]?.department || 'NMMC General',
    priority,
  };
}

/**
 * Detect duplicate complaints by comparing category + zone.
 * Returns how many existing complaints match and the cluster ID if any.
 */
function detectDuplicates(complaints, newCategory, newZone) {
  const matches = complaints.filter(
    c => c.category === newCategory && c.zone === newZone && c.status !== 'Resolved'
  );
  return matches.length;
}

/**
 * Determine zone from location string.
 */
function extractZone(location = '') {
  const zones = ['Vashi', 'Nerul', 'Kharghar', 'Belapur', 'Airoli', 'Ghansoli', 'Kopar Khairane', 'Taloja', 'Ulwe'];
  for (const z of zones) {
    if (location.toLowerCase().includes(z.toLowerCase())) return z;
  }
  return 'General';
}

module.exports = { allow, withErrorHandler, classifyComplaint, detectDuplicates, extractZone };

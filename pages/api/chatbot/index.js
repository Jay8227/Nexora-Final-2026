/**
 * NEXORA API — /api/chatbot
 * POST → CityBot AI response
 *
 * Uses the Anthropic Messages API (claude-sonnet-4-20250514).
 * Injects live city data as context so the bot can answer
 * questions about traffic, floods, complaints, emergencies.
 */

import db from '../../../lib/db';
import { allow, withErrorHandler } from '../../../lib/middleware';

const SYSTEM_PROMPT = `You are Nexora Bot, the official AI assistant of NEXORA Smart City Platform for Navi Mumbai.
You help citizens with:
1. Reporting civic problems (waste, water, lights, roads, traffic, safety)
2. Checking complaint status by ID
3. Answering questions about city services, traffic, flooding, emergency response
4. Providing information about NEXORA's features

Tone: Friendly, concise, helpful. Always in plain language.
City zones: Vashi, Nerul, Kharghar, Belapur, Airoli, Ghansoli, Kopar Khairane, Taloja, Ulwe.
Emergency numbers: Police 100, Ambulance 108, Fire 101, NMMC 1800-22-6870.

When a citizen wants to file a complaint, collect: type of problem, location, brief description, contact (optional).
Then tell them their complaint will be filed via the NEXORA system.

If asked about traffic, use the live data below.
If asked about floods, use the live data below.
Keep responses under 120 words unless the citizen asks for detail.`;

export default withErrorHandler(async function handler(req, res) {
  if (!allow(req, res, ['POST'])) return;

  const { messages, complaintId } = req.body || {};

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  // ── Build live city context ─────────────────────────────────────────────────
  const redZones = Object.entries(db.traffic.zones)
    .filter(([, v]) => v.status === 'red')
    .map(([k]) => k)
    .join(', ') || 'None';

  const floodRed = Object.entries(db.flood.zones)
    .filter(([, v]) => v.riskLevel === 'red')
    .map(([k]) => k)
    .join(', ') || 'None';

  let complaintContext = '';
  if (complaintId) {
    const c = db.complaints.find(x => x.id === complaintId);
    if (c) {
      complaintContext = `\nComplaint lookup — ID: ${c.id}, Status: ${c.status}, Department: ${c.department}, Zone: ${c.zone}, Priority: ${c.priority}`;
    } else {
      complaintContext = `\nComplaint ID ${complaintId} was not found in the database.`;
    }
  }

  const liveContext = `
LIVE CITY DATA (${new Date().toLocaleTimeString('en-IN')}):
- Traffic red zones: ${redZones}
- Flood risk zones: ${floodRed}
- Active emergencies: ${db.emergency.active.length}
- Open complaints: ${db.complaints.filter(c => c.status !== 'Resolved').length}
- AQI: ${db.dashboard.aqi}
${complaintContext}
`.trim();

  // ── Anthropic API call ─────────────────────────────────────────────────────
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 400,
      system: `${SYSTEM_PROMPT}\n\n${liveContext}`,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('[NEXORA Chatbot] Anthropic API error:', errText);
    return res.status(502).json({ error: 'AI service unavailable', detail: errText });
  }

  const data = await response.json();
  const text = data.content?.map(b => b.text || '').join('') || 'Sorry, I could not respond.';

  return res.status(200).json({ success: true, reply: text, usage: data.usage });
});

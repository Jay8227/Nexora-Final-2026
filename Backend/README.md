# NEXORA Backend — Setup & API Reference

## Quick Start

```bash
# 1. Copy the backend into your Next.js project root
# All files in pages/api/ go into YOUR pages/api/ folder
# lib/ goes into YOUR project root

# 2. Install (nothing new needed — uses Next.js built-in API routes)
npm install

# 3. Set env variable
cp .env.example .env.local
# Fill in ANTHROPIC_API_KEY

# 4. Run
npm run dev
```

---

## File Structure

```
your-nextjs-project/
├── lib/
│   ├── db.js              ← In-memory data store
│   └── middleware.js      ← Shared helpers (CORS, classification, etc.)
├── pages/
│   └── api/
│       ├── complaints/
│       │   ├── index.js   ← GET list / POST new
│       │   ├── [id].js    ← GET by ID / PATCH update
│       │   └── escalate.js← POST trigger escalation
│       ├── traffic/
│       │   ├── index.js   ← GET live zones / POST sensor push
│       │   └── predictions.js
│       ├── flood/
│       │   └── index.js   ← GET zones / POST pump/barrier action
│       ├── emergency/
│       │   ├── index.js   ← GET active / POST new emergency
│       │   └── [id].js    ← PATCH resolve
│       ├── chatbot/
│       │   └── index.js   ← POST AI chat with live city context
│       ├── dashboard/
│       │   └── index.js   ← GET aggregated metrics
│       ├── digital-twin/
│       │   └── index.js   ← GET all 9 zones with coords + status
│       ├── admin/
│       │   ├── index.js   ← GET overview / POST add user
│       │   └── users/[id].js ← PATCH/DELETE user
│       └── contact/
│           └── index.js   ← POST feedback form
```

---

## API Reference

### Complaints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/complaints` | List all (supports `?status=&zone=&category=`) |
| POST | `/api/complaints` | Submit new complaint |
| GET | `/api/complaints/:id` | Get complaint status by ID |
| PATCH | `/api/complaints/:id` | Update status (officer/admin) |
| POST | `/api/complaints/escalate` | Trigger escalation check (run daily via cron) |

**POST /api/complaints body:**
```json
{
  "category": "Road Maintenance",
  "subject": "Pothole on Palm Beach Road",
  "description": "Large pothole causing accidents",
  "location": "Palm Beach Road, Vashi",
  "contact": "9876543210"
}
```

**Response:**
```json
{
  "success": true,
  "complaint": { "id": "NM2024-0004", "status": "Pending", ... },
  "aiClassification": { "department": "PWD", "priority": "High", "zone": "Vashi" }
}
```

---

### Traffic

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/traffic` | All 9 zones with live density + predictions |
| POST | `/api/traffic` | Push sensor reading for a zone |
| GET | `/api/traffic/predictions` | Active AI jam predictions |

---

### Flood / Monsoon

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/flood` | All flood zones + IMD forecast |
| POST | `/api/flood` | Trigger pump/barrier action |

**POST body:**
```json
{ "zone": "Taloja MIDC", "action": "activate-pump" }
```
Actions: `activate-pump`, `deactivate-pump`, `deploy-barrier`, `recall-barrier`

---

### Emergency

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/emergency` | Active + resolved + hospitals |
| POST | `/api/emergency` | Dispatch emergency response |
| PATCH | `/api/emergency/:id` | Resolve / update status |

**POST body:**
```json
{ "type": "accident", "location": "Sion-Panvel Hwy km 14", "zone": "Kharghar" }
```

---

### CityBot

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chatbot` | AI chat with live city data injected |

**POST body:**
```json
{
  "messages": [{ "role": "user", "content": "Is there traffic in Vashi?" }],
  "complaintId": "NM2024-0001"
}
```

---

### Dashboard / Digital Twin

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Aggregated city metrics |
| GET | `/api/digital-twin` | All 9 zones with lat/lng + all overlays |

---

## Frontend Changes Required

### 1. governance.js — Wire up complaint submission

Replace `handleSubmitComplaint` to call the API:

```js
const handleSubmitComplaint = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('/api/complaints', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(complaintForm),
    });
    const data = await res.json();
    if (data.success) {
      alert(`✅ Complaint filed! Tracking ID: ${data.complaint.id}\n\nAI routed to: ${data.aiClassification.department}`);
      setSubmittedComplaints([data.complaint, ...submittedComplaints]);
      setComplaintForm({ category: '', subject: '', description: '', location: '', contact: '' });
    }
  } catch (err) {
    alert('Failed to submit. Please try again.');
  }
};
```

Add a status-check function to look up a complaint by ID:

```js
const [trackId, setTrackId] = useState('');
const [trackedComplaint, setTrackedComplaint] = useState(null);

const handleTrackComplaint = async () => {
  const res = await fetch(`/api/complaints/${trackId}`);
  const data = await res.json();
  if (data.success) setTrackedComplaint(data.complaint);
  else alert('Complaint not found.');
};
```

---

### 2. chatbot.js & NexoraBotWidget.js — Wire up to `/api/chatbot`

Replace the local `processMessage` / `getResponse` simulation with a real API call:

```js
const getBotReply = async (userMessage, conversationHistory) => {
  const res = await fetch('/api/chatbot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [...conversationHistory, { role: 'user', content: userMessage }],
    }),
  });
  const data = await res.json();
  return data.reply || 'Sorry, I could not respond right now.';
};
```

In `handleTextInput`, replace the switch/case simulation with:
```js
const handleTextInput = async () => {
  if (!inputText.trim()) return;
  const userText = inputText;
  setInputText('');
  addUserMessage(userText);
  setIsTyping(true);
  const reply = await getBotReply(userText, conversationHistory);
  setIsTyping(false);
  addBotMessage(reply);
};
```

---

### 3. decision-engine.js — Fetch real traffic predictions

Add at the top of `DecisionEngine` component:

```js
useEffect(() => {
  const loadPredictions = async () => {
    const res = await fetch('/api/traffic/predictions');
    const data = await res.json();
    if (data.success) setDecisions(data.predictions);
  };
  loadPredictions();
  const interval = setInterval(loadPredictions, 30000);
  return () => clearInterval(interval);
}, []);
```

---

### 4. digital-twin.js — Fetch live zone data

Add in the Digital Twin component:

```js
useEffect(() => {
  const loadZones = async () => {
    const res = await fetch('/api/digital-twin');
    const data = await res.json();
    if (data.success) {
      setZones(data.zones);     // use data.zones for zone overlay colors
      setSummary(data.summary);
    }
  };
  loadZones();
  const interval = setInterval(loadZones, 15000);
  return () => clearInterval(interval);
}, []);
```

Zone status colours from API: `"red"` | `"yellow"` | `"green"` — map directly to your CSS.

---

### 5. safety.js — Fetch live emergencies

```js
useEffect(() => {
  const loadEmergencies = async () => {
    const res = await fetch('/api/emergency');
    const data = await res.json();
    if (data.success) {
      setEmergencyAlerts(data.active);
    }
  };
  loadEmergencies();
  const interval = setInterval(loadEmergencies, 10000);
  return () => clearInterval(interval);
}, []);
```

To dispatch a new emergency (e.g. from a "Report Emergency" button):
```js
const dispatchEmergency = async (type, location, zone) => {
  const res = await fetch('/api/emergency', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, location, zone }),
  });
  const data = await res.json();
  alert(data.message);
};
```

---

### 6. dashboard.js — Replace static IoT data with live metrics

```js
useEffect(() => {
  const loadMetrics = async () => {
    const res = await fetch('/api/dashboard');
    const data = await res.json();
    if (data.success) {
      setIotData(data.metrics.iot);
      // Update analyticsCards values from data.metrics
    }
  };
  loadMetrics();
  const interval = setInterval(loadMetrics, 5000);
  return () => clearInterval(interval);
}, []);
```

---

### 7. admin.js — Wire user management

```js
// Load users on mount
useEffect(() => {
  fetch('/api/admin').then(r => r.json()).then(d => {
    if (d.success) setUsers(d.users);
  });
}, []);

// Add user
const handleAddUser = async (e) => {
  e.preventDefault();
  const res = await fetch('/api/admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
  const data = await res.json();
  if (data.success) setUsers(prev => [...prev, data.user]);
};

// Toggle status
const updateUserStatus = async (userId, newStatus) => {
  await fetch(`/api/admin/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  });
  setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
};
```

---

### 8. contact.js — Submit form to API

```js
const handleSubmit = async (formData) => {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  const data = await res.json();
  if (data.success) alert(data.message);
};
```

---

## Production Notes

1. **Replace the in-memory store** (`lib/db.js`) with MongoDB or PostgreSQL for persistence.
2. **Add auth middleware** — check JWT/session before admin and PATCH endpoints.
3. **Add a daily cron job** that calls `POST /api/complaints/escalate` at midnight.
4. **IMD API** — replace the mock forecast in `lib/db.js` with a real fetch to `https://api.weather.gov` or IMD's open data endpoint.
5. **ANTHROPIC_API_KEY** must be set in `.env.local` — never commit it.

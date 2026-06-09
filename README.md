# 🧠 NEXORA – The Neural City Engine

> **A self-learning, self-optimizing Smart City Management platform that treats the city as a thinking brain, not just a monitored environment.**

![NEXORA Smart City](https://img.shields.io/badge/NEXORA-Smart%20City-purple?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge)
![IoT Ready](https://img.shields.io/badge/IoT-Ready-green?style=for-the-badge)
![Hackathon](https://img.shields.io/badge/Hackathon-Ready-orange?style=for-the-badge)

## 🎯 Core Vision

**Nexora is not a dashboard. Nexora is a thinking city brain.**

Unlike traditional smart city solutions that simply display data, NEXORA:

- **Predicts** city problems before they occur
- **Uses** IoT + citizen behavior as continuous inputs
- **Learns** continuously from outcomes
- **Visualizes** the city as a 3D Digital Twin
- **Recommends** or **triggers autonomous actions**

---

## 🚀 Key Features

### 1. 🌐 3D Digital Twin (`/digital-twin`)

Real-time 3D visualization of Nexora city with:

- **Interactive Zone Map** – 9 city zones with live IoT data
- **Heatmap Views** – Traffic, Air Quality, Power Grid overlays
- **Live Alerts** – Real-time incident notifications
- **AI Predictions Panel** – Future-state forecasts with confidence scores
- **Time Travel Slider** – Explore past data or AI-predicted future states

### 2. 🧠 AI Decision Engine (`/decision-engine`)

The brain of NEXORA that converts predictions into actions:

- **Predictive Alerts** – Traffic congestion, power surges, maintenance needs
- **Confidence Scoring** – Every prediction comes with accuracy %
- **Autonomous Actions** – Auto-executing responses for low-risk decisions
- **Approval Workflow** – Admin review for high-impact decisions
- **What-If Simulator** – Run hypothetical scenarios (events, weather, demand)
- **Transparency Log** – Full audit trail of all AI decisions

### 3. 🤖 CityBot AI Assistant (`/chatbot`)

24/7 intelligent chatbot with complete conversation flow:

| Feature              | Description                                            |
| -------------------- | ------------------------------------------------------ |
| **Report Problems**  | Waste, Water, Street Lights, Traffic, Roads, Pollution |
| **Track Complaints** | Real-time status with unique Complaint IDs             |
| **City Information** | Live AQI, Traffic, Water Supply, Parking, Power Status |
| **Emergency Mode**   | Instant alerts to city emergency services              |
| **Natural Language** | Type naturally – NLU understands context               |
| **Multi-language**   | English, Hindi, Marathi support                        |

#### Conversation Flow:

```
[Start]
   ↓
[Greeting Menu]
   ↓ ---------------------------
   ↓           ↓             ↓
Report Problem  Check Status  City Info
   ↓                ↓            ↓
Get Type       Ask for ID     Choose Info Type
   ↓                ↓            ↓
Ask Location       Return Status   Fetch IoT Data
   ↓                ↓            Display Result
Ask Description     End            End
   ↓
Generate Ticket (#12345)
   ↓
Confirm + Ask Follow-up
   ↓
End
```

### 4. 📊 Smart Dashboard (`/dashboard`)

Role-based analytics for different users:

- **Citizen View** – Public transport, water supply, air quality, events
- **Officer View** – Incidents, response time, resource allocation
- **Admin View** – System health, budget, service requests, performance

### 5. 🏠 Premium Homepage (`/`)

Modern, animated landing page featuring:

- AI-powered statistics (live counter)
- Neural network background animation
- Feature showcase cards
- Live city metrics with real-time updates

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    NEXORA ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │  IoT Layer  │───▶│  AI Engine  │───▶│  Decision   │     │
│  │  (Sensors)  │    │  (ML/DL)    │    │   Engine    │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│         │                  │                  │             │
│         ▼                  ▼                  ▼             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │               DATA FUSION LAYER                      │   │
│  │  • Traffic Sensors    • Air Quality Monitors        │   │
│  │  • Water Pressure     • Power Grid Meters           │   │
│  │  • Security Cameras   • Citizen Reports             │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│         ┌─────────────────┼─────────────────┐              │
│         ▼                 ▼                 ▼              │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐      │
│  │  3D Digital │   │   CityBot   │   │  Dashboard  │      │
│  │    Twin     │   │   Chatbot   │   │   & Admin   │      │
│  └─────────────┘   └─────────────┘   └─────────────┘      │
│                                                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎬 Demo Script (2-3 Minutes)

### Scene 1: The Problem (30 seconds)

> "Traditional city management is reactive. Problems are discovered only after they occur. NEXORA changes this paradigm."

- Show homepage with live AI stats
- Highlight: "156 AI decisions TODAY, 94.2% accuracy"

### Scene 2: The Digital Twin (45 seconds)

> "Our 3D Digital Twin visualizes the entire city in real-time."

- Navigate to `/digital-twin`
- Click on "Central Business District" → Show live stats
- Switch to "Traffic View" → Show heatmap
- Enable "AI Predictions" → Show future forecasts
- Use time slider → "We can even travel through time"

### Scene 3: AI in Action (45 seconds)

> "Watch as NEXORA predicts and prevents problems."

- Navigate to `/decision-engine`
- Show decision cards: "Traffic congestion predicted for 5:30 PM"
- Show confidence: "87% sure"
- Show auto-action: "Signal timing already adjusted"
- Open What-If Simulator → Run scenario → Show recommendations

### Scene 4: Citizen Interaction (30 seconds)

> "Citizens become soft sensors through our AI chatbot."

- Navigate to `/chatbot`
- Demo: Report garbage problem
- Show ticket generation: "#15365 created"
- Show NLU: "You can also just type naturally"

### Scene 5: Closing (15 seconds)

> "Nexora is not a dashboard. It's a thinking city brain. Built for Nexora, Maharashtra. Ready for the world."

- Return to homepage
- Show the philosophy banner

---

## 🛠️ Tech Stack

| Layer              | Technology                          |
| ------------------ | ----------------------------------- |
| **Frontend**       | Next.js 16, React 19, Framer Motion |
| **Styling**        | TailwindCSS 4, Custom CSS Variables |
| **State**          | React Hooks (useState, useEffect)   |
| **3D/Viz**         | CSS Heatmaps, SVG Road Networks     |
| **AI (Simulated)** | JavaScript-based prediction models  |
| **Deployment**     | Vercel / Node.js                    |

### Future Integrations (Production Ready):

- **IoT**: MQTT, CoAP protocols for real sensors
- **AI/ML**: TensorFlow.js, Python Flask APIs
- **3D Engine**: Three.js, Mapbox GL, Cesium
- **NLP**: Dialogflow, Rasa for chatbot
- **Database**: MongoDB, PostgreSQL, InfluxDB

---

## 📁 Project Structure

```
smart-city-management/
├── components/
│   ├── Layout.js         # Main layout with navigation
│   └── ThemeProvider.js  # Dark/Light theme support
├── pages/
│   ├── index.js          # Premium homepage
│   ├── dashboard.js      # Role-based dashboard
│   ├── digital-twin.js   # 3D city visualization
│   ├── decision-engine.js # AI predictions & actions
│   ├── chatbot.js        # CityBot AI assistant
│   ├── services.js       # City services
│   ├── safety.js         # Safety & emergency
│   ├── governance.js     # E-Governance
│   ├── citizens.js       # Citizen portal
│   └── contact.js        # Contact information
├── styles/
│   └── globals.css       # Global styles & CSS variables
├── public/
│   └── ...               # Static assets
└── package.json          # Dependencies
```

---

## 🚀 Quick Start

```bash
# 1. Navigate to project directory
cd smart-city-management

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

---

## 🎯 Hackathon Judging Points

### Innovation ✅

- AI-powered predictive city management
- Citizens as "soft sensors" through chatbot
- What-If scenario simulator for policy testing

### Technical Excellence ✅

- Modern Next.js architecture
- Real-time data simulation
- Responsive, mobile-friendly design

### User Experience ✅

- Intuitive conversation flows
- Premium glassmorphism design
- Dark theme with futuristic aesthetics

### Scalability ✅

- Modular architecture
- Zone-based design (ward → city → state)
- Ready for real IoT integration

### Real-World Impact ✅

- Predicts problems before they occur
- Reduces response time
- Empowers citizen participation

---

## 🌍 Scalability Roadmap

```
Phase 1: Single Ward Deployment
    ↓
Phase 2: Entire Nexora City
    ↓
Phase 3: Maharashtra State
    ↓
Phase 4: National Smart City Mission
```

### Security & Privacy

- End-to-end encryption for citizen data
- GDPR-compliant data handling
- Role-based access control (RBAC)
- Anomaly detection for spam prevention

---

## 👥 Team

Built with ❤️ for the **Smart City Hackathon**

**Location**: Nexora, Maharashtra, India

---

## 📄 License

MIT License - Feel free to use, modify, and distribute.

---

> _"Think like a futuristic city planner building for 2035, but execute like an engineer building for a hackathon demo today."_

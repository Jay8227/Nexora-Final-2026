/**
 * NEXORA — In-Memory Database
 * Replace individual stores with a real DB (MongoDB / PostgreSQL) in production.
 * All stores are module-level singletons so they persist across hot-reloads in dev.
 */

// ─── COMPLAINTS ───────────────────────────────────────────────────────────────
if (!global._complaintsStore) {
  global._complaintsStore = [
    {
      id: 'NM2024-0001',
      category: 'Road Maintenance',
      subject: 'Pothole on Palm Beach Road near Vashi Station',
      description: 'Large pothole causing accidents near the flyover.',
      location: 'Palm Beach Road, Vashi, Zone 1',
      zone: 'Vashi',
      contact: '9876543210',
      status: 'In Progress',
      priority: 'High',
      department: 'PWD',
      assignedTo: 'PWD Team - Zone 1',
      submittedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
      escalationLevel: 0,
      duplicateCount: 1,
      timeline: [
        { status: 'Submitted', time: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(), note: 'Complaint received' },
        { status: 'Under Review', time: new Date(Date.now() - 1.5 * 24 * 3600 * 1000).toISOString(), note: 'Assigned to PWD' },
        { status: 'In Progress', time: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(), note: 'Work order created' },
      ],
    },
    {
      id: 'NM2024-0002',
      category: 'Street Lighting',
      subject: 'Street light not working near Sector 12 bus stop',
      description: '3 consecutive street lights are off for 5 days.',
      location: 'Sector 12, Nerul, Zone 2',
      zone: 'Nerul',
      contact: '9765432100',
      status: 'Resolved',
      priority: 'Medium',
      department: 'Electrical Department',
      assignedTo: 'Electrical Dept - Zone 2',
      submittedAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
      escalationLevel: 0,
      duplicateCount: 4,
      timeline: [
        { status: 'Submitted', time: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(), note: 'Complaint received' },
        { status: 'Assigned', time: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(), note: 'Electrical Dept notified' },
        { status: 'Resolved', time: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(), note: 'All 3 lights replaced' },
      ],
    },
    {
      id: 'NM2024-0003',
      category: 'Garbage Collection',
      subject: 'Garbage not collected for 3 days in Kharghar Sector 35',
      description: 'Garbage overflowing on the corner of Sector 35.',
      location: 'Sector 35, Kharghar, Zone 4',
      zone: 'Kharghar',
      contact: '9654321000',
      status: 'Pending',
      priority: 'High',
      department: 'Waste Management',
      assignedTo: 'Waste Management - Zone 4',
      submittedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
      escalationLevel: 0,
      duplicateCount: 12,
      timeline: [
        { status: 'Submitted', time: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(), note: 'Complaint received — 12 duplicates clustered' },
      ],
    },
  ];
}
global._complaintCounter = global._complaintCounter || 4;

// ─── TRAFFIC ──────────────────────────────────────────────────────────────────
if (!global._trafficStore) {
  global._trafficStore = {
    zones: {
      Vashi: { density: 72, status: 'yellow', signalMode: 'adaptive', predictedJamAt: null },
      Nerul: { density: 45, status: 'green', signalMode: 'normal', predictedJamAt: null },
      Kharghar: { density: 88, status: 'red', signalMode: 'adaptive', predictedJamAt: '18:15' },
      Belapur: { density: 61, status: 'yellow', signalMode: 'adaptive', predictedJamAt: '18:30' },
      Airoli: { density: 38, status: 'green', signalMode: 'normal', predictedJamAt: null },
      Ghansoli: { density: 52, status: 'yellow', signalMode: 'normal', predictedJamAt: null },
      'Kopar Khairane': { density: 44, status: 'green', signalMode: 'normal', predictedJamAt: null },
      Taloja: { density: 30, status: 'green', signalMode: 'normal', predictedJamAt: null },
      Ulwe: { density: 25, status: 'green', signalMode: 'normal', predictedJamAt: null },
    },
    predictions: [
      { id: 1, road: 'Palm Beach Road', zone: 'Vashi', expectedAt: '18:15', confidence: 87, action: 'Rerouting via Belapur Bypass', status: 'pending' },
      { id: 2, road: 'Sion-Panvel Highway', zone: 'Kharghar', expectedAt: '18:30', confidence: 92, action: 'Signal timing extended on alternate route', status: 'auto-executing' },
    ],
    totalSensors: 1248,
    activeSensors: 1231,
  };
}

// ─── FLOOD / MONSOON ──────────────────────────────────────────────────────────
if (!global._floodStore) {
  global._floodStore = {
    zones: {
      'Taloja MIDC': { riskLevel: 'red', rainfallMM: 42, drainageCapacity: 78, pumpStatus: 'active', barrierStatus: 'deployed', alert: true },
      'Kharghar Valley': { riskLevel: 'red', rainfallMM: 38, drainageCapacity: 65, pumpStatus: 'active', barrierStatus: 'deployed', alert: true },
      'Nerul Sector 21': { riskLevel: 'yellow', rainfallMM: 22, drainageCapacity: 88, pumpStatus: 'standby', barrierStatus: 'ready', alert: false },
      'Vashi Sector 30': { riskLevel: 'green', rainfallMM: 10, drainageCapacity: 95, pumpStatus: 'off', barrierStatus: 'not-deployed', alert: false },
      'Belapur CBD': { riskLevel: 'yellow', rainfallMM: 28, drainageCapacity: 82, pumpStatus: 'standby', barrierStatus: 'ready', alert: false },
      'Airoli Sector 7': { riskLevel: 'green', rainfallMM: 8, drainageCapacity: 97, pumpStatus: 'off', barrierStatus: 'not-deployed', alert: false },
    },
    imdForecast: {
      today: 'Heavy Rain',
      tomorrow: 'Very Heavy Rain',
      dayAfter: 'Moderate Rain',
      source: 'IMD Public API',
      updatedAt: new Date().toISOString(),
    },
    activeAlerts: 2,
    totalDrainageSensors: 342,
  };
}

// ─── EMERGENCY ────────────────────────────────────────────────────────────────
if (!global._emergencyStore) {
  global._emergencyStore = {
    active: [
      {
        id: 'EM-001',
        type: 'accident',
        location: 'Sion-Panvel Highway, km 14',
        zone: 'Kharghar',
        reportedAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
        assignedHospital: 'MGM Hospital, Vashi',
        estimatedArrival: 9,
        routeCleared: true,
        signalsCleared: 7,
        status: 'en-route',
        lat: 19.0368, lng: 73.0631,
      },
    ],
    resolved: [
      {
        id: 'EM-000',
        type: 'fire',
        location: 'Turbhe Industrial Estate',
        zone: 'Ghansoli',
        reportedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
        resolvedAt: new Date(Date.now() - 2.5 * 3600 * 1000).toISOString(),
        responseTimeMinutes: 8,
        status: 'resolved',
      },
    ],
    hospitals: [
      { name: 'MGM Hospital', zone: 'Vashi', lat: 19.0748, lng: 73.0071, available: true, ambulances: 3 },
      { name: 'Apollo Hospitals', zone: 'Belapur', lat: 19.0221, lng: 73.0344, available: true, ambulances: 2 },
      { name: 'DY Patil Hospital', zone: 'Nerul', lat: 19.0399, lng: 73.0181, available: true, ambulances: 4 },
    ],
    stats: { avgResponseTimeBefore: 18, avgResponseTimeNow: 9, totalSignalsCleared: 847 },
  };
}

// ─── DASHBOARD METRICS ────────────────────────────────────────────────────────
if (!global._dashboardStore) {
  global._dashboardStore = {
    iot: {
      trafficSensors: 1248,
      airQualitySensors: 856,
      energyMeters: 2103,
      waterSensors: 756,
      securityCameras: 3421,
      wasteBins: 1876,
    },
    aqi: 68,
    activeAlerts: 24,
    citizenRequests: 142,
    energyEfficiency: 87,
  };
}

// ─── USERS ────────────────────────────────────────────────────────────────────
if (!global._usersStore) {
  global._usersStore = [
    { id: 1, name: 'Admin User', email: 'admin@nexora.gov', role: 'admin', status: 'active' },
    { id: 2, name: 'Officer Singh', email: 'officer@nexora.gov', role: 'officer', status: 'active' },
    { id: 3, name: 'Jane Citizen', email: 'jane@gmail.com', role: 'citizen', status: 'active' },
  ];
}

// ─── EXPORTS ──────────────────────────────────────────────────────────────────
const db = {
  get complaints() { return global._complaintsStore; },
  get complaintCounter() { return global._complaintCounter; },
  nextComplaintId() {
    const id = `NM2024-${String(global._complaintCounter).padStart(4, '0')}`;
    global._complaintCounter++;
    return id;
  },
  get traffic() { return global._trafficStore; },
  get flood() { return global._floodStore; },
  get emergency() { return global._emergencyStore; },
  get dashboard() { return global._dashboardStore; },
  get users() { return global._usersStore; },
};

module.exports = db;

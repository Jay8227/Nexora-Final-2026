import Layout from '../components/Layout';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateZoneData = () => ({
  traffic: Math.floor(Math.random() * 100),
  airQuality: Math.floor(Math.random() * 200) + 20,
  waterPressure: Math.floor(Math.random() * 30) + 70,
  powerLoad: Math.floor(Math.random() * 40) + 50,
  incidents: Math.floor(Math.random() * 5),
  temperature: Math.floor(Math.random() * 10) + 28,
  rainfall: 0,
});

// 9 real Navi Mumbai zones
const cityZones = [
  { id: 1, name: 'Vashi',           x: 45, y: 35, type: 'commercial',  floodRisk: false },
  { id: 2, name: 'Belapur',         x: 62, y: 28, type: 'commercial',  floodRisk: false },
  { id: 3, name: 'Kharghar',        x: 70, y: 45, type: 'residential', floodRisk: true  },
  { id: 4, name: 'Nerul',           x: 35, y: 48, type: 'residential', floodRisk: false },
  { id: 5, name: 'Airoli',          x: 25, y: 22, type: 'industrial',  floodRisk: false },
  { id: 6, name: 'Ghansoli',        x: 30, y: 35, type: 'residential', floodRisk: false },
  { id: 7, name: 'Kopar Khairane',  x: 38, y: 22, type: 'residential', floodRisk: false },
  { id: 8, name: 'Taloja',          x: 78, y: 62, type: 'industrial',  floodRisk: true  },
  { id: 9, name: 'Ulwe',            x: 55, y: 68, type: 'transport',   floodRisk: false },
];

const DigitalTwin = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [zoneData, setZoneData] = useState({});
  const [viewMode, setViewMode] = useState('heatmap');
  const [timeSlider, setTimeSlider] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [showPrediction, setShowPrediction] = useState(false);
  const [rainfallLevel, setRainfallLevel] = useState(0);
  const [floodScenarioActive, setFloodScenarioActive] = useState(false);
  const [floodAlertShown, setFloodAlertShown] = useState(false);
  const mapRef = useRef(null);

  // Initialize zone data
  useEffect(() => {
    const initialData = {};
    cityZones.forEach(zone => {
      initialData[zone.id] = generateZoneData();
    });
    setZoneData(initialData);
  }, []);

  // Real-time zone updates
  useEffect(() => {
    const interval = setInterval(() => {
      setZoneData(prev => {
        const updated = { ...prev };
        const randomZoneId = Math.floor(Math.random() * cityZones.length) + 1;
        updated[randomZoneId] = {
          ...generateZoneData(),
          rainfall: rainfallLevel,
        };
        return updated;
      });

      if (Math.random() > 0.7) {
        const alertTypes = [
          { type: 'traffic',   message: 'Heavy congestion on Palm Beach Road',     severity: 'warning', icon: '🚗' },
          { type: 'traffic',   message: 'Slow traffic near Sion-Panvel Highway',    severity: 'warning', icon: '🚗' },
          { type: 'airquality',message: 'AQI spike near Taloja MIDC',              severity: 'danger',  icon: '🌫️' },
          { type: 'power',     message: 'High load in Airoli industrial corridor',  severity: 'warning', icon: '⚡' },
          { type: 'water',     message: 'Pressure drop in Nerul Sector 20',         severity: 'info',    icon: '💧' },
          { type: 'incident',  message: 'Incident reported near Belapur flyover',   severity: 'danger',  icon: '🚨' },
        ];
        const newAlert = {
          ...alertTypes[Math.floor(Math.random() * alertTypes.length)],
          id: Date.now(),
          zone: cityZones[Math.floor(Math.random() * cityZones.length)].name,
          time: new Date().toLocaleTimeString(),
        };
        setActiveAlerts(prev => [newAlert, ...prev].slice(0, 6));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [rainfallLevel]);

  // MONSOON FLOOD SCENARIO — if rainfall slider > 60mm, Taloja + Kharghar go RED
  useEffect(() => {
    if (rainfallLevel > 60 && !floodScenarioActive) {
      setFloodScenarioActive(true);
      setFloodAlertShown(false);

      // Force Taloja (8) and Kharghar (3) to critical flood state
      setZoneData(prev => ({
        ...prev,
        8: { ...prev[8], traffic: 95, waterPressure: 20, incidents: 4, rainfall: rainfallLevel },
        3: { ...prev[3], traffic: 88, waterPressure: 25, incidents: 3, rainfall: rainfallLevel },
      }));

      // Trigger flood alerts
      setTimeout(() => {
        setActiveAlerts(prev => [
          {
            id: Date.now(),
            type: 'flood',
            message: '🌊 FLOOD ALERT: Taloja MIDC — drainage overflow imminent',
            severity: 'danger',
            icon: '🌊',
            zone: 'Taloja',
            time: new Date().toLocaleTimeString(),
          },
          {
            id: Date.now() + 1,
            type: 'flood',
            message: '🌊 FLOOD ALERT: Kharghar Valley — waterlogging expected in 2–3 hours',
            severity: 'danger',
            icon: '🌊',
            zone: 'Kharghar',
            time: new Date().toLocaleTimeString(),
          },
          {
            id: Date.now() + 2,
            type: 'action',
            message: '✅ NEXORA: Drainage pumps auto-activated in Taloja & Kharghar',
            severity: 'info',
            icon: '⚙️',
            zone: 'System',
            time: new Date().toLocaleTimeString(),
          },
          {
            id: Date.now() + 3,
            type: 'action',
            message: '✅ NEXORA: Citizens in affected pincodes alerted via CityBot',
            severity: 'info',
            icon: '📲',
            zone: 'System',
            time: new Date().toLocaleTimeString(),
          },
          ...prev,
        ].slice(0, 8));
        setFloodAlertShown(true);
      }, 800);
    }

    if (rainfallLevel <= 60 && floodScenarioActive) {
      setFloodScenarioActive(false);
    }
  }, [rainfallLevel]);

  // Time travel
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setTimeSlider(prev => {
          if (prev >= 100) { setIsPlaying(false); return 100; }
          return prev + 1;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const getHeatmapColor = (zone) => {
    if (!zoneData[zone.id]) return 'rgba(59, 130, 246, 0.5)';

    // Flood override
    if (floodScenarioActive && zone.floodRisk) {
      return 'rgba(239, 68, 68, 0.92)';
    }

    const data = zoneData[zone.id];
    switch (viewMode) {
      case 'traffic':
        if (data.traffic > 80) return 'rgba(239, 68, 68, 0.85)';
        if (data.traffic > 50) return 'rgba(234, 179, 8, 0.75)';
        return 'rgba(34, 197, 94, 0.65)';
      case 'airquality':
        if (data.airQuality > 150) return 'rgba(139, 92, 246, 0.85)';
        if (data.airQuality > 100) return 'rgba(239, 68, 68, 0.75)';
        if (data.airQuality > 50)  return 'rgba(234, 179, 8, 0.65)';
        return 'rgba(34, 197, 94, 0.65)';
      case 'power':
        if (data.powerLoad > 80) return 'rgba(239, 68, 68, 0.85)';
        if (data.powerLoad > 60) return 'rgba(234, 179, 8, 0.75)';
        return 'rgba(34, 197, 94, 0.65)';
      default: {
        const combined = (data.traffic + data.airQuality / 2 + data.powerLoad) / 3;
        if (combined > 70) return 'rgba(239, 68, 68, 0.75)';
        if (combined > 50) return 'rgba(234, 179, 8, 0.65)';
        return 'rgba(34, 197, 94, 0.55)';
      }
    }
  };

  const getZoneIcon = (type) => ({
    commercial:  '🏢',
    residential: '🏠',
    industrial:  '🏭',
    healthcare:  '🏥',
    education:   '🎓',
    transport:   '🚉',
    recreation:  '🌳',
    utility:     '⚡',
  }[type] || '📍');

  const getTimeLabel = () => {
    const hours   = Math.floor((timeSlider / 100) * 24);
    const minutes = Math.floor(((timeSlider / 100) * 24 - hours) * 60);
    const prefix  = timeSlider < 50 ? 'Past: ' : timeSlider > 50 ? 'Predicted: ' : 'Now: ';
    return `${prefix}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const dismissAlert = (id) => setActiveAlerts(prev => prev.filter(a => a.id !== id));

  return (
    <Layout title="Digital Twin — Navi Mumbai">
      <div className="min-h-screen bg-[var(--background-dark)]">
        <div className="container mx-auto px-4 py-6">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 text-transparent bg-clip-text">
                  🌐 Digital Twin — Navi Mumbai
                </h1>
                <p className="text-[var(--text-secondary)] mt-1">
                  Real-time visualization of all 9 zones · Palm Beach Rd · Sion-Panvel Hwy · Taloja MIDC
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400">Live</span>
                </span>
                <span className="text-xs text-gray-500">|</span>
                <span className="text-xs text-gray-400">Updated: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Map Area */}
            <div className="lg:col-span-3">
              {/* Controls Row */}
              <div className="glass-card rounded-xl border border-gray-700/50 p-4 mb-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { id: 'heatmap',    label: 'Combined',   icon: '🗺️' },
                      { id: 'traffic',    label: 'Traffic',    icon: '🚗' },
                      { id: 'airquality', label: 'Air Quality',icon: '🌿' },
                      { id: 'power',      label: 'Power Grid', icon: '⚡' },
                    ].map(mode => (
                      <button
                        key={mode.id}
                        onClick={() => setViewMode(mode.id)}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-all ${
                          viewMode === mode.id
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        <span>{mode.icon}</span>
                        <span>{mode.label}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowPrediction(!showPrediction)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-all ${
                      showPrediction ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <span>🔮</span>
                    <span>AI Predictions</span>
                  </button>
                </div>
              </div>

              {/* Monsoon Flood Scenario Slider */}
              <div className={`glass-card rounded-xl border p-4 mb-4 transition-all ${
                floodScenarioActive ? 'border-red-500/60 bg-red-900/10' : 'border-cyan-700/40'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🌧️</span>
                    <span className="text-sm font-semibold text-cyan-300">Monsoon Flood Simulator (IMD Data)</span>
                    {floodScenarioActive && (
                      <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                        FLOOD ALERT ACTIVE
                      </span>
                    )}
                  </div>
                  <span className={`text-sm font-bold ${rainfallLevel > 60 ? 'text-red-400' : rainfallLevel > 30 ? 'text-yellow-400' : 'text-cyan-400'}`}>
                    {rainfallLevel} mm
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  value={rainfallLevel}
                  onChange={(e) => setRainfallLevel(parseInt(e.target.value))}
                  className="w-full accent-cyan-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>No rain</span>
                  <span className="text-yellow-400">⚠️ Moderate (30mm)</span>
                  <span className="text-red-400">🌊 Critical &gt;60mm → Taloja + Kharghar RED</span>
                </div>
                {floodScenarioActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-3 bg-red-900/30 border border-red-500/40 rounded-lg text-sm"
                  >
                    <p className="text-red-300 font-semibold">🌊 NEXORA Flood Response Activated:</p>
                    <p className="text-gray-300 mt-1">• Drainage pumps auto-activated in Taloja MIDC &amp; Kharghar Valley</p>
                    <p className="text-gray-300">• Traffic rerouted away from flooded Sion-Panvel stretch</p>
                    <p className="text-gray-300">• Citizens in affected pincodes alerted via CityBot</p>
                    <p className="text-gray-300">• NMMC flood barriers deployment notification sent</p>
                  </motion.div>
                )}
              </div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl border border-gray-700/50 overflow-hidden"
              >
                <div
                  ref={mapRef}
                  className="relative h-[500px] bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                  }}
                >
                  {/* Road network — Navi Mumbai */}
                  <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
                    {/* Palm Beach Road — horizontal */}
                    <line x1="10%" y1="42%" x2="90%" y2="42%" stroke="#3b82f6" strokeWidth="3" strokeDasharray="0" />
                    <text x="12%" y="40%" fill="#60a5fa" fontSize="8" fontFamily="sans-serif">Palm Beach Road</text>
                    {/* Sion-Panvel Highway — diagonal */}
                    <line x1="20%" y1="20%" x2="80%" y2="75%" stroke="#f59e0b" strokeWidth="2" />
                    <text x="55%" y="35%" fill="#fbbf24" fontSize="8" fontFamily="sans-serif">Sion-Panvel Hwy</text>
                    {/* Internal roads */}
                    <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="25%" y1="10%" x2="25%" y2="90%" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="75%" y1="10%" x2="75%" y2="90%" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="10%" y1="25%" x2="90%" y2="25%" stroke="#3b82f6" strokeWidth="1" />
                    <line x1="10%" y1="65%" x2="90%" y2="65%" stroke="#3b82f6" strokeWidth="1" />
                  </svg>

                  {/* Zone nodes */}
                  {cityZones.map(zone => (
                    <motion.div
                      key={zone.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: zone.id * 0.08 }}
                      className={`absolute cursor-pointer transition-all duration-300 ${
                        selectedZone?.id === zone.id ? 'z-20' : 'z-10'
                      }`}
                      style={{ left: `${zone.x}%`, top: `${zone.y}%`, transform: 'translate(-50%, -50%)' }}
                      onClick={() => setSelectedZone(selectedZone?.id === zone.id ? null : zone)}
                    >
                      <motion.div
                        animate={{
                          scale: selectedZone?.id === zone.id ? 1.3 : 1,
                          boxShadow: floodScenarioActive && zone.floodRisk
                            ? '0 0 40px rgba(239, 68, 68, 0.8)'
                            : selectedZone?.id === zone.id
                              ? '0 0 30px rgba(139, 92, 246, 0.5)'
                              : '0 0 20px rgba(0,0,0,0.3)',
                        }}
                        className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all"
                        style={{ backgroundColor: getHeatmapColor(zone) }}
                      >
                        <span className="text-2xl">{getZoneIcon(zone.type)}</span>
                        {/* Pulse for incidents or flood */}
                        {(zoneData[zone.id]?.incidents > 0 || (floodScenarioActive && zone.floodRisk)) && (
                          <div className={`absolute inset-0 rounded-full animate-ping ${
                            floodScenarioActive && zone.floodRisk ? 'bg-red-500/60' : 'bg-red-500/40'
                          }`} />
                        )}
                      </motion.div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 whitespace-nowrap">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          floodScenarioActive && zone.floodRisk
                            ? 'bg-red-900/90 text-red-200'
                            : 'bg-gray-900/80 text-gray-300'
                        }`}>
                          {zone.name}
                          {floodScenarioActive && zone.floodRisk && ' 🌊'}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Zone detail panel */}
                  <AnimatePresence>
                    {selectedZone && zoneData[selectedZone.id] && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute top-4 right-4 w-72 bg-gray-900/95 backdrop-blur-lg rounded-xl border border-gray-700 overflow-hidden z-30"
                      >
                        <div className={`p-4 border-b border-gray-700 ${
                          floodScenarioActive && selectedZone.floodRisk
                            ? 'bg-gradient-to-r from-red-900/60 to-orange-900/60'
                            : 'bg-gradient-to-r from-blue-900/50 to-purple-900/50'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{getZoneIcon(selectedZone.type)}</span>
                              <div>
                                <h3 className="font-semibold text-sm">{selectedZone.name}</h3>
                                <span className="text-xs text-gray-400 capitalize">{selectedZone.type}</span>
                                {floodScenarioActive && selectedZone.floodRisk && (
                                  <span className="ml-2 text-xs text-red-400 font-semibold">⚠️ FLOOD RISK</span>
                                )}
                              </div>
                            </div>
                            <button onClick={() => setSelectedZone(null)} className="text-gray-400 hover:text-white">✕</button>
                          </div>
                        </div>
                        <div className="p-4 space-y-3">
                          {[
                            { label: '🚗 Traffic',       value: `${zoneData[selectedZone.id].traffic}%`,      color: zoneData[selectedZone.id].traffic > 80 ? 'text-red-400' : zoneData[selectedZone.id].traffic > 50 ? 'text-yellow-400' : 'text-green-400' },
                            { label: '🌿 AQI',            value: zoneData[selectedZone.id].airQuality,          color: zoneData[selectedZone.id].airQuality > 150 ? 'text-purple-400' : zoneData[selectedZone.id].airQuality > 100 ? 'text-red-400' : 'text-green-400' },
                            { label: '💧 Water Pressure', value: `${zoneData[selectedZone.id].waterPressure}%`, color: 'text-cyan-400' },
                            { label: '⚡ Power Load',     value: `${zoneData[selectedZone.id].powerLoad}%`,     color: 'text-yellow-400' },
                            { label: '🌡️ Temperature',   value: `${zoneData[selectedZone.id].temperature}°C`,  color: 'text-white' },
                            { label: '🚨 Incidents',      value: zoneData[selectedZone.id].incidents,           color: zoneData[selectedZone.id].incidents > 0 ? 'text-red-400' : 'text-green-400' },
                          ].map(row => (
                            <div key={row.label} className="flex justify-between items-center">
                              <span className="text-sm text-gray-400">{row.label}</span>
                              <span className={`text-sm font-medium ${row.color}`}>{row.value}</span>
                            </div>
                          ))}
                          {floodScenarioActive && selectedZone.floodRisk && (
                            <div className="mt-2 p-2 bg-red-900/40 rounded-lg border border-red-500/40">
                              <p className="text-xs text-red-300">🌊 Rainfall: {rainfallLevel}mm — Flood risk CRITICAL</p>
                              <p className="text-xs text-green-300 mt-1">✅ Pumps activated by NEXORA</p>
                            </div>
                          )}
                        </div>
                        <div className="p-4 border-t border-gray-700">
                          <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                            View Detailed Analytics
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                    <h4 className="text-xs font-semibold mb-2 text-gray-400">Legend</h4>
                    <div className="space-y-1">
                      {[
                        { color: 'bg-green-500', label: 'Good' },
                        { color: 'bg-yellow-500', label: 'Moderate' },
                        { color: 'bg-red-500', label: 'High / Flood' },
                        { color: 'bg-purple-500', label: 'Critical' },
                      ].map(item => (
                        <div key={item.label} className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                          <span className="text-xs">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Time Slider */}
                <div className="p-4 bg-gray-900/80 border-t border-gray-700">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-10 h-10 rounded-full bg-purple-600 hover:bg-purple-500 flex items-center justify-center transition-colors"
                    >
                      {isPlaying ? '⏸️' : '▶️'}
                    </button>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Past (6h ago)</span>
                        <span className="font-medium text-purple-400">{getTimeLabel()}</span>
                        <span>Future (6h)</span>
                      </div>
                      <input
                        type="range" min="0" max="100" value={timeSlider}
                        onChange={(e) => setTimeSlider(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-2">
                    🔮 Time slider shows historical data or AI-predicted future states
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Live Alerts */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="glass-card rounded-xl border border-gray-700/50 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-red-900/30 to-orange-900/30">
                  <h3 className="font-semibold flex items-center gap-2">
                    <span>🚨</span>
                    <span>Live Alerts</span>
                    {activeAlerts.length > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {activeAlerts.length}
                      </span>
                    )}
                  </h3>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  <AnimatePresence>
                    {activeAlerts.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 text-sm">✅ No active alerts</div>
                    ) : (
                      activeAlerts.map(alert => (
                        <motion.div
                          key={alert.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          className={`p-3 border-b border-gray-700/50 ${
                            alert.severity === 'danger'  ? 'bg-red-900/20' :
                            alert.severity === 'warning' ? 'bg-yellow-900/20' : 'bg-blue-900/20'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2">
                              <span className="text-lg">{alert.icon}</span>
                              <div>
                                <p className="text-sm font-medium">{alert.message}</p>
                                <p className="text-xs text-gray-400">{alert.zone} · {alert.time}</p>
                              </div>
                            </div>
                            <button onClick={() => dismissAlert(alert.id)} className="text-gray-500 hover:text-white text-xs flex-shrink-0">✕</button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* AI Predictions Panel */}
              {showPrediction && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="glass-card rounded-xl border border-purple-700/50 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
                    <h3 className="font-semibold flex items-center gap-2"><span>🔮</span><span>AI Predictions</span></h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { icon: '🚗', title: 'Traffic Spike — Palm Beach Rd', desc: 'Critical congestion expected at 6:15 PM near Vashi flyover', conf: 87, color: 'yellow' },
                      { icon: '⚡', title: 'Power Demand Peak — Airoli', desc: 'Industrial corridor will hit 95% capacity at 7:00 PM', conf: 92, color: 'red' },
                      { icon: '💧', title: 'Pump Maintenance — Nerul', desc: 'Water pump at Sector 20 needs attention within 48h', conf: 78, color: 'blue' },
                    ].map(pred => (
                      <div key={pred.title} className={`bg-${pred.color}-900/20 border border-${pred.color}-700/50 rounded-lg p-3`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span>{pred.icon}</span>
                          <span className="text-sm font-medium">{pred.title}</span>
                        </div>
                        <p className="text-xs text-gray-400">{pred.desc}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <span className={`text-xs text-${pred.color}-400`}>Confidence:</span>
                          <div className="flex-1 h-1 bg-gray-700 rounded-full">
                            <div className={`h-full bg-${pred.color}-500 rounded-full`} style={{ width: `${pred.conf}%` }}></div>
                          </div>
                          <span className={`text-xs text-${pred.color}-400`}>{pred.conf}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Quick Stats */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                className="glass-card rounded-xl border border-gray-700/50 p-4"
              >
                <h3 className="font-semibold mb-4 flex items-center gap-2"><span>📊</span><span>City Overview</span></h3>
                <div className="space-y-3">
                  {[
                    { label: 'Active Zones',       value: `${cityZones.length}/9`, color: 'text-green-400' },
                    { label: 'IoT Sensors Online', value: '14,284',               color: 'text-blue-400'  },
                    { label: 'Data Points/sec',    value: '2.4M',                 color: 'text-purple-400'},
                    { label: 'System Health',      value: '98.7%',                color: 'text-emerald-400'},
                    { label: 'Flood Risk Zones',   value: floodScenarioActive ? '2 ACTIVE' : '0', color: floodScenarioActive ? 'text-red-400' : 'text-green-400' },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">{row.label}</span>
                      <span className={`font-semibold text-sm ${row.color}`}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DigitalTwin;
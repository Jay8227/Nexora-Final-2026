import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Safety = () => {
  const [emergencyAlerts, setEmergencyAlerts] = useState([
    { id: 1, type: 'fire', location: 'Downtown District', severity: 'high', time: '2 mins ago', status: 'active' },
    { id: 2, type: 'crime', location: 'Central Park', severity: 'medium', time: '15 mins ago', status: 'investigating' },
    { id: 3, type: 'accident', location: 'Main Street Bridge', severity: 'high', time: '25 mins ago', status: 'resolved' }
  ]);

  const [cctvStatus, setCctvStatus] = useState({
    totalCameras: 3421,
    active: 3398,
    maintenance: 23,
    offline: 0
  });

  const [crimeStats, setCrimeStats] = useState({
    today: 12,
    week: 87,
    month: 342,
    trend: 'decreasing'
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCctvStatus(prev => ({
        ...prev,
        active: Math.max(0, Math.min(prev.totalCameras, prev.active + (Math.random() > 0.7 ? -1 : 1))),
        maintenance: Math.max(0, Math.min(100, prev.maintenance + (Math.random() > 0.8 ? 1 : -1)))
      }));

      setCrimeStats(prev => ({
        ...prev,
        today: Math.max(0, prev.today + Math.floor(Math.random() * 3) - 1),
        week: prev.week + Math.floor(Math.random() * 2)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const emergencyTypes = [
    { name: 'Fire', icon: '🔥', color: 'text-red-400', count: 3 },
    { name: 'Crime', icon: '🚨', color: 'text-yellow-400', count: 8 },
    { name: 'Accident', icon: '🚗', color: 'text-orange-400', count: 5 },
    { name: 'Medical', icon: '🏥', color: 'text-blue-400', count: 7 }
  ];

  const disasterManagement = [
    { name: 'Flood', icon: '🌊', readiness: 92, response: 'excellent' },
    { name: 'Fire', icon: '🔥', readiness: 95, response: 'excellent' },
    { name: 'Earthquake', icon: '🌍', readiness: 88, response: 'good' },
    { name: 'Storm', icon: '⛈️', readiness: 90, response: 'good' }
  ];

  return (
    <Layout title="Public Safety & Security">
      <div className="min-h-screen bg-[var(--background-dark)]">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Public Safety & Security</h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Advanced surveillance, emergency response, and disaster management systems for a secure city
            </p>
          </motion.div>

          {/* Safety Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card p-6 rounded-xl border border-gray-700 text-center"
            >
              <div className="text-3xl mb-2">🚨</div>
              <div className="text-2xl font-bold text-red-400 mb-1">{crimeStats.today}</div>
              <div className="text-sm text-[var(--text-secondary)]">Incidents Today</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-6 rounded-xl border border-gray-700 text-center"
            >
              <div className="text-3xl mb-2">📹</div>
              <div className="text-2xl font-bold text-emerald-400 mb-1">{cctvStatus.active}</div>
              <div className="text-sm text-[var(--text-secondary)]">Active Cameras</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card p-6 rounded-xl border border-gray-700 text-center"
            >
              <div className="text-3xl mb-2">/respond</div>
              <div className="text-2xl font-bold text-blue-400 mb-1">8.2 min</div>
              <div className="text-sm text-[var(--text-secondary)]">Avg Response Time</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card p-6 rounded-xl border border-gray-700 text-center"
            >
              <div className="text-3xl mb-2">🛡️</div>
              <div className="text-2xl font-bold text-purple-400 mb-1">96%</div>
              <div className="text-sm text-[var(--text-secondary)]">Safety Index</div>
            </motion.div>
          </div>

          {/* Emergency Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* CCTV Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2 glass-card p-6 rounded-xl border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span>📹</span>
                <span>CCTV Surveillance Dashboard</span>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-[var(--background-dark)]/50 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-emerald-400">{cctvStatus.active}</div>
                  <div className="text-xs text-[var(--text-secondary)]">Active</div>
                </div>
                <div className="bg-[var(--background-dark)]/50 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-yellow-400">{cctvStatus.maintenance}</div>
                  <div className="text-xs text-[var(--text-secondary)]">Maintenance</div>
                </div>
                <div className="bg-[var(--background-dark)]/50 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-red-400">{cctvStatus.offline}</div>
                  <div className="text-xs text-[var(--text-secondary)]">Offline</div>
                </div>
                <div className="bg-[var(--background-dark)]/50 p-3 rounded-lg text-center">
                  <div className="text-lg font-bold text-blue-400">{cctvStatus.totalCameras}</div>
                  <div className="text-xs text-[var(--text-secondary)]">Total</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg h-64 flex items-center justify-center border border-gray-700">
                <div className="text-center">
                  <div className="text-4xl mb-4">📹</div>
                  <p className="text-[var(--text-secondary)]">Live CCTV Feed Preview</p>
                  <p className="text-xs text-gray-500 mt-2">Multiple camera feeds displayed in real-time</p>
                </div>
              </div>
            </motion.div>

            {/* Emergency Types */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 rounded-xl border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span>🚨</span>
                <span>Emergency Types</span>
              </h3>
              
              <div className="space-y-4">
                {emergencyTypes.map((type, index) => (
                  <div key={type.name} className="flex items-center justify-between p-3 bg-[var(--background-dark)]/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className={`text-xl ${type.color}`}>{type.icon}</span>
                      <span className="font-medium">{type.name}</span>
                    </div>
                    <span className="bg-gray-700 px-2 py-1 rounded-full text-sm">{type.count}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Emergency Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 rounded-xl border border-gray-700 mb-12"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span>📢</span>
              <span>Emergency Alerts & Notifications</span>
            </h3>
            
            <div className="space-y-4">
              {emergencyAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.severity === 'high' ? 'border-red-500 bg-red-500/10' :
                    alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-500/10' :
                    'border-green-500 bg-green-500/10'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`${
                          alert.type === 'fire' ? 'text-red-400' :
                          alert.type === 'crime' ? 'text-yellow-400' :
                          alert.type === 'accident' ? 'text-orange-400' : 'text-blue-400'
                        }`}>
                          {alert.type === 'fire' ? '🔥' : 
                           alert.type === 'crime' ? '🚨' : 
                           alert.type === 'accident' ? '🚗' : '🏥'}
                        </span>
                        <span className="font-semibold capitalize">{alert.type}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          alert.status === 'active' ? 'bg-red-500/20 text-red-400' :
                          alert.status === 'investigating' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {alert.status}
                        </span>
                      </div>
                      <p className="text-[var(--text-secondary)] text-sm">{alert.location}</p>
                    </div>
                    <span className="text-sm text-gray-500">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Crime Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-6 rounded-xl border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-6">Crime Analytics & Trends</h3>
              
              <div className="h-64 flex items-end justify-between">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="flex flex-col items-center flex-1 mx-1">
                    <div className="flex items-end justify-center h-40 w-full">
                      <div 
                        className="w-3/4 bg-gradient-to-t from-red-500 to-red-700 rounded-t mx-1"
                        style={{ height: `${Math.max(20, 80 - crimeStats.week/5 + index * 8)}%` }}
                      />
                    </div>
                    <span className="text-xs text-[var(--text-secondary)] mt-2">{day}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-[var(--text-primary)]">{crimeStats.today}</div>
                  <div className="text-xs text-[var(--text-secondary)]">Today</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[var(--text-primary)]">{crimeStats.week}</div>
                  <div className="text-xs text-[var(--text-secondary)]">This Week</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-[var(--text-primary)]">{crimeStats.month}</div>
                  <div className="text-xs text-[var(--text-secondary)]">This Month</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card p-6 rounded-xl border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-6">Disaster Management Readiness</h3>
              
              <div className="space-y-4">
                {disasterManagement.map((disaster, index) => (
                  <div key={disaster.name}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{disaster.icon}</span>
                        <span className="font-medium">{disaster.name}</span>
                      </div>
                      <span className="text-sm">{disaster.readiness}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          disaster.readiness >= 90 ? 'bg-emerald-500' :
                          disaster.readiness >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} 
                        style={{ width: `${disaster.readiness}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-[var(--text-secondary)] mt-1">
                      Response: {disaster.response}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* SOS System */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8 rounded-xl border border-gray-700 mb-12 text-center"
          >
            <h3 className="text-2xl font-semibold mb-4">Emergency SOS System</h3>
            <p className="text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
              Instant emergency assistance with GPS tracking and automatic alerts to nearest response units
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-xl border border-gray-700">
                <div className="text-4xl mb-4">📱</div>
                <h4 className="font-semibold mb-2">Mobile App SOS</h4>
                <p className="text-sm text-[var(--text-secondary)]">One-touch emergency button in citizen mobile app</p>
              </div>
              
              <div className="glass-card p-6 rounded-xl border border-gray-700">
                <div className="text-4xl mb-4">📍</div>
                <h4 className="font-semibold mb-2">GPS Tracking</h4>
                <p className="text-sm text-[var(--text-secondary)]">Precise location tracking for emergency response</p>
              </div>
              
              <div className="glass-card p-6 rounded-xl border border-gray-700">
                <div className="text-4xl mb-4">🚨</div>
                <h4 className="font-semibold mb-2">Automated Response</h4>
                <p className="text-sm text-[var(--text-secondary)]">Automatic dispatch of nearest emergency units</p>
              </div>
            </div>
            
            <button className="mt-8 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity">
              Test SOS System
            </button>
          </motion.div>

          {/* Security Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <h3 className="text-2xl font-semibold mb-4">Security Resources</h3>
            <p className="text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
              Access to security protocols, training materials, and emergency procedures
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-[var(--card-bg)] border border-gray-700 rounded-xl font-medium text-white hover:bg-gray-800/50 transition-colors">
                Security Protocols
              </button>
              <button className="px-6 py-3 bg-[var(--card-bg)] border border-gray-700 rounded-xl font-medium text-white hover:bg-gray-800/50 transition-colors">
                Training Materials
              </button>
              <button className="px-6 py-3 bg-[var(--card-bg)] border border-gray-700 rounded-xl font-medium text-white hover:bg-gray-800/50 transition-colors">
                Emergency Procedures
              </button>
              <button className="px-6 py-3 bg-[var(--card-bg)] border border-gray-700 rounded-xl font-medium text-white hover:bg-gray-800/50 transition-colors">
                Incident Reports
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Safety;
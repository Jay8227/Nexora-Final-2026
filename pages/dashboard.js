import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [role, setRole] = useState('citizen'); // citizen, officer, admin
  const [iotData, setIotData] = useState({
    trafficSensors: 1248,
    airQualitySensors: 856,
    energyMeters: 2103,
    waterSensors: 756,
    securityCameras: 3421,
    wasteBins: 1876
  });

  // Simulate live IoT data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIotData(prev => ({
        trafficSensors: prev.trafficSensors + Math.floor(Math.random() * 5),
        airQualitySensors: prev.airQualitySensors + Math.floor(Math.random() * 3),
        energyMeters: prev.energyMeters + Math.floor(Math.random() * 8),
        waterSensors: prev.waterSensors + Math.floor(Math.random() * 4),
        securityCameras: prev.securityCameras + Math.floor(Math.random() * 2),
        wasteBins: prev.wasteBins + Math.floor(Math.random() * 6)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const analyticsCards = [
    {
      title: "Total Connected Devices",
      value: Object.values(iotData).reduce((a, b) => a + b, 0).toLocaleString(),
      change: "+12%",
      icon: "📶",
      color: "text-blue-400"
    },
    {
      title: "Active Alerts",
      value: "24",
      change: "-3%",
      icon: "🚨",
      color: "text-red-400"
    },
    {
      title: "Citizen Requests",
      value: "142",
      change: "+8%",
      icon: "👤",
      color: "text-emerald-400"
    },
    {
      title: "Energy Efficiency",
      value: "87%",
      change: "+5%",
      icon: "⚡",
      color: "text-yellow-400"
    }
  ];

  const roleBasedContent = {
    citizen: {
      title: "Citizen Dashboard",
      description: "View public city data and services relevant to you",
      widgets: [
        { title: "Public Transport Status", value: "Normal", status: "good" },
        { title: "Water Supply", value: "Stable", status: "good" },
        { title: "Air Quality", value: "Moderate", status: "warning" },
        { title: "Events & Announcements", value: "3 new", status: "info" }
      ]
    },
    officer: {
      title: "Officer Dashboard",
      description: "Monitor and manage city operations in your jurisdiction",
      widgets: [
        { title: "Incidents Today", value: "12", status: "warning" },
        { title: "Response Time", value: "8.2 min", status: "good" },
        { title: "Resource Allocation", value: "78%", status: "good" },
        { title: "Pending Reports", value: "34", status: "info" }
      ]
    },
    admin: {
      title: "Administrator Dashboard",
      description: "Full city management and oversight capabilities",
      widgets: [
        { title: "System Health", value: "98%", status: "good" },
        { title: "Budget Utilization", value: "67%", status: "good" },
        { title: "Service Requests", value: "1.2K", status: "info" },
        { title: "Performance Index", value: "92%", status: "good" }
      ]
    }
  };

  const chartData = [
    { hour: '00:00', traffic: 30, energy: 40 },
    { hour: '04:00', traffic: 15, energy: 30 },
    { hour: '08:00', traffic: 80, energy: 70 },
    { hour: '12:00', traffic: 70, energy: 85 },
    { hour: '16:00', traffic: 85, energy: 90 },
    { hour: '20:00', traffic: 60, energy: 75 },
    { hour: '24:00', traffic: 35, energy: 50 },
  ];

  return (
    <Layout title="City Dashboard">
      <div className="min-h-screen bg-[var(--background-dark)]">
        <div className="container mx-auto px-4 py-8">
          {/* Role Selector */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4">
              {['citizen', 'officer', 'admin'].map((roleOption) => (
                <button
                  key={roleOption}
                  onClick={() => setRole(roleOption)}
                  className={`px-6 py-3 rounded-lg capitalize ${
                    role === roleOption
                      ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                      : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
                  }`}
                >
                  {roleOption} view
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">{roleBasedContent[role].title}</h1>
            <p className="text-[var(--text-secondary)]">{roleBasedContent[role].description}</p>
          </motion.div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {analyticsCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl border border-gray-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-3xl">{card.icon}</div>
                  <span className={`text-sm ${card.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {card.change}
                  </span>
                </div>
                <div className={`${card.color} text-3xl font-bold mb-2`}>{card.value}</div>
                <div className="text-[var(--text-secondary)] text-sm">{card.title}</div>
              </motion.div>
            ))}
          </div>

          {/* Role-based Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {roleBasedContent[role].widgets.map((widget, index) => (
              <motion.div
                key={widget.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl border border-gray-700"
              >
                <div className="text-[var(--text-secondary)] text-sm mb-2">{widget.title}</div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold">{widget.value}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    widget.status === 'good' ? 'bg-green-500/20 text-green-400' :
                    widget.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {widget.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts and Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Traffic vs Energy Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card p-6 rounded-xl border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-4">Traffic vs Energy Consumption</h3>
              <div className="h-64 flex items-end justify-between">
                {chartData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1 mx-1">
                    <div className="flex items-end justify-center h-40 w-full">
                      <div 
                        className="w-3/4 bg-gradient-to-t from-blue-500 to-blue-700 rounded-t mx-1"
                        style={{ height: `${data.traffic}%` }}
                      />
                      <div 
                        className="w-3/4 bg-gradient-to-t from-amber-500 to-amber-700 rounded-t mx-1"
                        style={{ height: `${data.energy}%` }}
                      />
                    </div>
                    <span className="text-xs text-[var(--text-secondary)] mt-2">{data.hour}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span className="text-xs">Traffic</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-amber-500 rounded mr-2"></div>
                  <span className="text-xs">Energy</span>
                </div>
              </div>
            </motion.div>

            {/* IoT Device Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="glass-card p-6 rounded-xl border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-4">IoT Device Status</h3>
              <div className="space-y-4">
                {Object.entries(iotData).map(([device, count], index) => (
                  <div key={device} className="flex justify-between items-center">
                    <span className="capitalize">{device.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-semibold">{count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Predictive Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="glass-card p-6 rounded-xl border border-gray-700 mb-8"
          >
            <h3 className="text-xl font-semibold mb-4">AI Predictive Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[var(--background-dark)]/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Traffic Prediction</h4>
                <p className="text-sm text-[var(--text-secondary)]">Peak congestion expected at 17:30</p>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="bg-[var(--background-dark)]/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Energy Demand</h4>
                <p className="text-sm text-[var(--text-secondary)]">Highest consumption predicted for 19:00</p>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              <div className="bg-[var(--background-dark)]/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Maintenance Alert</h4>
                <p className="text-sm text-[var(--text-secondary)]">Water pump maintenance needed</p>
                <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* GIS Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="glass-card p-6 rounded-xl border border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-4">GIS City Map</h3>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg h-96 flex items-center justify-center border border-gray-700">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h4 className="text-lg font-medium mb-2">Interactive City Map</h4>
                <p className="text-[var(--text-secondary)] max-w-md mx-auto">
                  Real-time visualization of traffic, incidents, and city services
                  <br />
                  <span className="text-xs mt-2 block">(Map integration pending)</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
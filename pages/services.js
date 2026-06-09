import Layout from '../components/Layout';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const [activeService, setActiveService] = useState('transportation');

  const services = {
    transportation: {
      title: "Smart Transportation",
      description: "Advanced traffic management and public transport systems",
      features: [
        { name: "Traffic Monitoring", value: "Real-time traffic analysis", status: "active", icon: "🚦" },
        { name: "Smart Signals", value: "Adaptive traffic lights", status: "active", icon: "🚦" },
        { name: "Parking Availability", value: "Find parking spots instantly", status: "active", icon: "🅿️" },
        { name: "Public Transport Tracking", value: "Track buses and trains", status: "active", icon: "🚌" }
      ],
      stats: [
        { label: "Avg. Commute Time Reduced", value: "23%" },
        { label: "Traffic Incidents", value: "12 today" },
        { label: "On-time Performance", value: "87%" },
        { label: "Routes Optimized", value: "42" }
      ]
    },
    energy: {
      title: "Smart Energy",
      description: "Efficient power distribution and renewable energy management",
      features: [
        { name: "Smart Grid Monitoring", value: "Real-time energy grid status", status: "active", icon: "🔌" },
        { name: "Solar Usage", value: "Renewable energy tracking", status: "active", icon: "☀️" },
        { name: "Power Outage Alerts", value: "Instant outage notifications", status: "active", icon: "⚡" },
        { name: "Energy Efficiency", value: "Optimize consumption patterns", status: "active", icon: "📊" }
      ],
      stats: [
        { label: "Energy Savings", value: "18%" },
        { label: "Renewable Usage", value: "64%" },
        { label: "Grid Stability", value: "99.2%" },
        { label: "Outages Prevented", value: "34" }
      ]
    },
    water: {
      title: "Smart Water",
      description: "Water level monitoring and leakage detection systems",
      features: [
        { name: "Water Level Monitoring", value: "Reservoir and tank levels", status: "active", icon: "💧" },
        { name: "Leakage Detection", value: "AI-powered leak identification", status: "active", icon: "🪵" },
        { name: "Consumption Analytics", value: "Usage pattern analysis", status: "active", icon: "📈" },
        { name: "Quality Monitoring", value: "Water purity tracking", status: "pending", icon: "🧪" }
      ],
      stats: [
        { label: "Water Savings", value: "15%" },
        { label: "Leak Detection Rate", value: "94%" },
        { label: "Supply Coverage", value: "98%" },
        { label: "Quality Compliance", value: "99.7%" }
      ]
    },
    waste: {
      title: "Smart Waste",
      description: "Intelligent waste management and recycling systems",
      features: [
        { name: "Smart Bins Status", value: "Fill level monitoring", status: "active", icon: "🗑️" },
        { name: "Collection Routes", value: "Optimized pickup schedules", status: "active", icon: "🚚" },
        { name: "Recycling Insights", value: "Material recovery data", status: "active", icon: "♻️" },
        { name: "Waste Reduction", value: "Community impact tracking", status: "pending", icon: "🌱" }
      ],
      stats: [
        { label: "Waste Diversion", value: "42%" },
        { label: "Collection Efficiency", value: "28%" },
        { label: "Bin Capacity", value: "76% avg." },
        { label: "Route Optimization", value: "21%" }
      ]
    }
  };

  const serviceTabs = [
    { id: 'transportation', name: 'Transportation', icon: '🚌' },
    { id: 'energy', name: 'Energy', icon: '⚡' },
    { id: 'water', name: 'Water', icon: '💧' },
    { id: 'waste', name: 'Waste', icon: '🗑️' }
  ];

  return (
    <Layout title="Smart Services">
      <div className="min-h-screen bg-[var(--background-dark)]">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Smart Services</h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Comprehensive urban management solutions powered by IoT and AI technologies
            </p>
          </motion.div>

          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {serviceTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveService(tab.id)}
                className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${
                  activeService === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                    : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Service Content */}
          <motion.div
            key={activeService}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl border border-gray-700 p-8 mb-12"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">{services[activeService].title}</h2>
              <p className="text-[var(--text-secondary)] text-lg">{services[activeService].description}</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {services[activeService].stats.map((stat, index) => (
                <div key={index} className="bg-[var(--background-dark)]/50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
                  <div className="text-sm text-[var(--text-secondary)]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services[activeService].features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-xl border border-gray-700 flex items-start gap-4"
                >
                  <div className="text-2xl">{feature.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{feature.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        feature.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {feature.status}
                      </span>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm">{feature.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Service-Specific Visualizations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Traffic Heatmap for Transportation */}
            {activeService === 'transportation' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-4">Traffic Density Heatmap</h3>
                <div className="bg-gradient-to-br from-green-900/20 via-yellow-900/20 to-red-900/20 rounded-lg h-64 flex items-center justify-center border border-gray-700">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🚗</div>
                    <p className="text-[var(--text-secondary)]">Real-time traffic visualization</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Energy Grid for Energy */}
            {activeService === 'energy' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-4">Smart Grid Status</h3>
                <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-lg h-64 flex items-center justify-center border border-gray-700">
                  <div className="text-center">
                    <div className="text-4xl mb-2">⚡</div>
                    <p className="text-[var(--text-secondary)]">Power distribution network</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Water Network for Water */}
            {activeService === 'water' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-4">Water Distribution Network</h3>
                <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-lg h-64 flex items-center justify-center border border-gray-700">
                  <div className="text-center">
                    <div className="text-4xl mb-2">💧</div>
                    <p className="text-[var(--text-secondary)]">Pipeline and reservoir monitoring</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Waste Collection for Waste */}
            {activeService === 'waste' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-4">Waste Collection Routes</h3>
                <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 rounded-lg h-64 flex items-center justify-center border border-gray-700">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗑️</div>
                    <p className="text-[var(--text-secondary)]">Optimized collection paths</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* General Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card p-6 rounded-xl border border-gray-700"
            >
              <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">System Efficiency</span>
                    <span className="text-sm">87%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Service Availability</span>
                    <span className="text-sm">99.2%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full" style={{ width: '99.2%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Response Time</span>
                    <span className="text-sm">2.4s avg</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">User Satisfaction</span>
                    <span className="text-sm">4.7/5</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <h3 className="text-2xl font-semibold mb-4">Need More Information?</h3>
            <p className="text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
              Contact our smart city services team for detailed insights and integration possibilities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity">
                Request Demo
              </button>
              <button className="px-8 py-3 bg-[var(--card-bg)] border border-gray-700 rounded-xl font-semibold text-white hover:bg-gray-800/50 transition-colors">
                Contact Support
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
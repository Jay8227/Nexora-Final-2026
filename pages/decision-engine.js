import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// AI Decision Engine simulation
const generatePrediction = () => {
  const predictions = [
    {
      id: Date.now(),
      type: 'traffic',
      icon: '🚗',
      title: 'Traffic Congestion Predicted',
      location: 'MG Road Junction',
      prediction: 'Heavy congestion expected in 45 minutes',
      confidence: Math.floor(Math.random() * 20) + 80,
      impact: 'High',
      recommendation: 'Divert traffic via Ring Road bypass',
      action: 'Auto-adjusting traffic signal timing',
      status: 'auto-executing',
    },
    {
      id: Date.now() + 1,
      type: 'power',
      icon: '⚡',
      title: 'Power Demand Surge Alert',
      location: 'Industrial Zone',
      prediction: 'Power demand will exceed 90% capacity at 7:00 PM',
      confidence: Math.floor(Math.random() * 15) + 85,
      impact: 'Critical',
      recommendation: 'Pre-load solar storage and activate backup grid',
      action: 'Sending demand reduction notification to large consumers',
      status: 'pending-approval',
    },
    {
      id: Date.now() + 2,
      type: 'water',
      icon: '💧',
      title: 'Water Pressure Drop Detected',
      location: 'Sector 15 Pipeline',
      prediction: 'Potential leak or pump failure within 24 hours',
      confidence: Math.floor(Math.random() * 25) + 70,
      impact: 'Medium',
      recommendation: 'Dispatch maintenance team for inspection',
      action: 'Work order generated for Water Department',
      status: 'recommended',
    },
    {
      id: Date.now() + 3,
      type: 'air',
      icon: '🌫️',
      title: 'AQI Deterioration Warning',
      location: 'Industrial Area',
      prediction: 'AQI expected to exceed 150 by evening',
      confidence: Math.floor(Math.random() * 12) + 88,
      impact: 'High',
      recommendation: 'Issue health advisory for sensitive groups',
      action: 'Push notification to vulnerable population areas',
      status: 'auto-executing',
    },
    {
      id: Date.now() + 4,
      type: 'waste',
      icon: '🗑️',
      title: 'Waste Collection Optimization',
      location: 'Central District',
      prediction: 'Bins at 80% capacity, overflow expected by tomorrow',
      confidence: Math.floor(Math.random() * 10) + 90,
      impact: 'Low',
      recommendation: 'Schedule early morning collection route',
      action: 'Route optimization sent to fleet management',
      status: 'completed',
    },
  ];
  return predictions[Math.floor(Math.random() * predictions.length)];
};

const DecisionEngine = () => {
  const [decisions, setDecisions] = useState([]);
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [filter, setFilter] = useState('all');
  const [scenarioMode, setScenarioMode] = useState(false);
  const [scenarioParams, setScenarioParams] = useState({
    trafficIncrease: 20,
    powerDemand: 85,
    rainfall: 0,
    event: 'none',
  });
  const [scenarioResult, setScenarioResult] = useState(null);
  const [decisionStats, setDecisionStats] = useState({
    totalToday: 156,
    autoExecuted: 89,
    pendingApproval: 12,
    completed: 45,
    accuracy: 94.2,
  });

  // Generate initial decisions
  useEffect(() => {
    const initial = [];
    for (let i = 0; i < 5; i++) {
      initial.push(generatePrediction());
    }
    setDecisions(initial);
  }, []);

  // Simulate new predictions
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const newPrediction = generatePrediction();
        setDecisions(prev => [newPrediction, ...prev].slice(0, 10));
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const runScenario = () => {
    // Simulate AI scenario analysis
    const results = {
      trafficImpact: scenarioParams.trafficIncrease > 30 ? 'Severe congestion expected across 5 major routes' : 'Moderate impact, manageable with signal optimization',
      powerRisk: scenarioParams.powerDemand > 90 ? 'Grid overload risk - activate backup systems' : 'Sustainable with current capacity',
      floodRisk: scenarioParams.rainfall > 50 ? 'Flash flood warning for low-lying areas' : 'No flooding expected',
      eventImpact: scenarioParams.event !== 'none' ? `${scenarioParams.event} will require additional traffic management` : 'No special event considerations',
      recommendations: [
        scenarioParams.trafficIncrease > 25 && 'Deploy traffic officers at key junctions',
        scenarioParams.powerDemand > 85 && 'Pre-notify large consumers about load shedding',
        scenarioParams.rainfall > 30 && 'Alert drainage department for pump readiness',
        scenarioParams.event !== 'none' && 'Coordinate with event management for crowd control',
      ].filter(Boolean),
      confidenceScore: Math.floor(Math.random() * 10) + 85,
    };
    setScenarioResult(results);
  };

  const approveDecision = (id) => {
    setDecisions(prev => prev.map(d => 
      d.id === id ? { ...d, status: 'auto-executing' } : d
    ));
    setDecisionStats(prev => ({
      ...prev,
      pendingApproval: prev.pendingApproval - 1,
      autoExecuted: prev.autoExecuted + 1,
    }));
  };

  const rejectDecision = (id) => {
    setDecisions(prev => prev.filter(d => d.id !== id));
    setDecisionStats(prev => ({
      ...prev,
      pendingApproval: Math.max(0, prev.pendingApproval - 1),
    }));
  };

  const getStatusBadge = (status) => {
    const styles = {
      'auto-executing': 'bg-green-500/20 text-green-400 border-green-500/50',
      'pending-approval': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      'recommended': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      'completed': 'bg-gray-500/20 text-gray-400 border-gray-500/50',
    };
    const labels = {
      'auto-executing': '⚡ Auto-Executing',
      'pending-approval': '⏳ Pending Approval',
      'recommended': '💡 Recommended',
      'completed': '✅ Completed',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs border ${styles[status] || ''}`}>
        {labels[status] || status}
      </span>
    );
  };

  const filteredDecisions = decisions.filter(d => 
    filter === 'all' || d.status === filter
  );

  return (
    <Layout title="AI Decision Engine - NEXORA">
      <div className="min-h-screen bg-[var(--background-dark)]">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-transparent bg-clip-text">
              🧠 City Decision Engine
            </h1>
            <p className="text-[var(--text-secondary)] mt-1">
              AI-powered predictions, recommendations, and autonomous city actions
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {[
              { label: 'Decisions Today', value: decisionStats.totalToday, icon: '📊', color: 'text-blue-400' },
              { label: 'Auto-Executed', value: decisionStats.autoExecuted, icon: '⚡', color: 'text-green-400' },
              { label: 'Pending Approval', value: decisionStats.pendingApproval, icon: '⏳', color: 'text-yellow-400' },
              { label: 'Completed', value: decisionStats.completed, icon: '✅', color: 'text-emerald-400' },
              { label: 'AI Accuracy', value: `${decisionStats.accuracy}%`, icon: '🎯', color: 'text-purple-400' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl border border-gray-700/50 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Decision Feed */}
            <div className="lg:col-span-2">
              {/* Filter Tabs */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {[
                  { id: 'all', label: 'All Decisions' },
                  { id: 'auto-executing', label: 'Auto-Executing' },
                  { id: 'pending-approval', label: 'Pending' },
                  { id: 'recommended', label: 'Recommended' },
                  { id: 'completed', label: 'Completed' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      filter === tab.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Decision Cards */}
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredDecisions.map((decision, index) => (
                    <motion.div
                      key={decision.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className={`glass-card rounded-xl border overflow-hidden cursor-pointer transition-all ${
                        selectedDecision?.id === decision.id 
                          ? 'border-purple-500 ring-2 ring-purple-500/30' 
                          : 'border-gray-700/50 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedDecision(decision)}
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 flex items-center justify-center text-2xl">
                              {decision.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{decision.title}</h3>
                                {getStatusBadge(decision.status)}
                              </div>
                              <p className="text-sm text-gray-400">📍 {decision.location}</p>
                              <p className="text-sm mt-2">{decision.prediction}</p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="flex items-center gap-1 justify-end">
                              <span className="text-xs text-gray-400">Confidence</span>
                              <span className={`text-sm font-semibold ${
                                decision.confidence > 85 ? 'text-green-400' : 
                                decision.confidence > 70 ? 'text-yellow-400' : 'text-orange-400'
                              }`}>
                                {decision.confidence}%
                              </span>
                            </div>
                            <span className={`text-xs ${
                              decision.impact === 'Critical' ? 'text-red-400' :
                              decision.impact === 'High' ? 'text-orange-400' :
                              decision.impact === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                            }`}>
                              {decision.impact} Impact
                            </span>
                          </div>
                        </div>

                        {/* Expanded Details */}
                        <AnimatePresence>
                          {selectedDecision?.id === decision.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-4 border-t border-gray-700"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-3">
                                  <h4 className="text-xs text-blue-400 font-semibold mb-1">💡 Recommendation</h4>
                                  <p className="text-sm">{decision.recommendation}</p>
                                </div>
                                <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-3">
                                  <h4 className="text-xs text-purple-400 font-semibold mb-1">🤖 AI Action</h4>
                                  <p className="text-sm">{decision.action}</p>
                                </div>
                              </div>

                              {decision.status === 'pending-approval' && (
                                <div className="flex gap-3 mt-4">
                                  <button
                                    onClick={(e) => { e.stopPropagation(); approveDecision(decision.id); }}
                                    className="flex-1 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-medium transition-colors"
                                  >
                                    ✅ Approve & Execute
                                  </button>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); rejectDecision(decision.id); }}
                                    className="flex-1 py-2 bg-red-600/50 hover:bg-red-600 rounded-lg text-sm font-medium transition-colors"
                                  >
                                    ❌ Reject
                                  </button>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-4">
              {/* What-If Scenario Simulator */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card rounded-xl border border-gray-700/50 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-indigo-900/30 to-purple-900/30">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold flex items-center gap-2">
                      <span>🔮</span>
                      <span>What-If Simulator</span>
                    </h3>
                    <button
                      onClick={() => setScenarioMode(!scenarioMode)}
                      className={`px-3 py-1 rounded-lg text-xs transition-all ${
                        scenarioMode ? 'bg-purple-600' : 'bg-gray-700'
                      }`}
                    >
                      {scenarioMode ? 'Active' : 'Enable'}
                    </button>
                  </div>
                </div>

                {scenarioMode ? (
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Traffic Increase (%)</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={scenarioParams.trafficIncrease}
                        onChange={(e) => setScenarioParams(p => ({ ...p, trafficIncrease: parseInt(e.target.value) }))}
                        className="w-full accent-purple-500"
                      />
                      <span className="text-sm font-medium text-purple-400">{scenarioParams.trafficIncrease}%</span>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Power Demand (%)</label>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={scenarioParams.powerDemand}
                        onChange={(e) => setScenarioParams(p => ({ ...p, powerDemand: parseInt(e.target.value) }))}
                        className="w-full accent-yellow-500"
                      />
                      <span className="text-sm font-medium text-yellow-400">{scenarioParams.powerDemand}%</span>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Expected Rainfall (mm)</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={scenarioParams.rainfall}
                        onChange={(e) => setScenarioParams(p => ({ ...p, rainfall: parseInt(e.target.value) }))}
                        className="w-full accent-cyan-500"
                      />
                      <span className="text-sm font-medium text-cyan-400">{scenarioParams.rainfall}mm</span>
                    </div>

                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Special Event</label>
                      <select
                        value={scenarioParams.event}
                        onChange={(e) => setScenarioParams(p => ({ ...p, event: e.target.value }))}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm"
                      >
                        <option value="none">No Event</option>
                        <option value="Festival">Festival/Rally</option>
                        <option value="Sports Match">Sports Match</option>
                        <option value="VIP Visit">VIP Visit</option>
                        <option value="Emergency Drill">Emergency Drill</option>
                      </select>
                    </div>

                    <button
                      onClick={runScenario}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                      🚀 Run Scenario Analysis
                    </button>

                    {scenarioResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-gray-900/80 rounded-lg border border-purple-500/30"
                      >
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <span>📊</span>
                          <span>Simulation Results</span>
                          <span className="ml-auto text-xs text-purple-400">
                            {scenarioResult.confidenceScore}% confidence
                          </span>
                        </h4>
                        
                        <div className="space-y-2 text-sm">
                          <p><span className="text-gray-400">🚗 Traffic:</span> {scenarioResult.trafficImpact}</p>
                          <p><span className="text-gray-400">⚡ Power:</span> {scenarioResult.powerRisk}</p>
                          <p><span className="text-gray-400">🌧️ Flood:</span> {scenarioResult.floodRisk}</p>
                          <p><span className="text-gray-400">📅 Event:</span> {scenarioResult.eventImpact}</p>
                        </div>

                        {scenarioResult.recommendations.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-700">
                            <h5 className="text-xs text-gray-400 mb-2">AI Recommendations:</h5>
                            <ul className="space-y-1">
                              {scenarioResult.recommendations.map((rec, i) => (
                                <li key={i} className="text-xs flex items-start gap-1">
                                  <span className="text-green-400">✓</span>
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <p className="text-sm">Enable simulator to run "what-if" scenarios and see AI predictions</p>
                  </div>
                )}
              </motion.div>

              {/* Decision Transparency Log */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-xl border border-gray-700/50 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-700">
                  <h3 className="font-semibold flex items-center gap-2">
                    <span>📜</span>
                    <span>Decision Log (Transparency)</span>
                  </h3>
                </div>
                
                <div className="max-h-64 overflow-y-auto">
                  {[
                    { time: '10:32 AM', action: 'Traffic signal optimized at MG Road', by: 'AI Auto' },
                    { time: '10:28 AM', action: 'Health advisory pushed to citizens', by: 'AI Auto' },
                    { time: '10:15 AM', action: 'Power load balancing initiated', by: 'Admin Approved' },
                    { time: '10:02 AM', action: 'Waste collection route updated', by: 'AI Auto' },
                    { time: '09:45 AM', action: 'Water pressure alert dispatched', by: 'AI Auto' },
                  ].map((log, i) => (
                    <div key={i} className="px-4 py-3 border-b border-gray-700/50 hover:bg-gray-800/30">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{log.time}</span>
                        <span className={`text-xs ${log.by === 'AI Auto' ? 'text-green-400' : 'text-blue-400'}`}>
                          {log.by}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{log.action}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* AI Learning Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-xl border border-gray-700/50 p-4"
              >
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <span>🧠</span>
                  <span>AI Learning Progress</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Traffic Prediction</span>
                      <span className="text-green-400">96.2%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 w-[96.2%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Power Demand</span>
                      <span className="text-blue-400">91.8%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-[91.8%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Anomaly Detection</span>
                      <span className="text-purple-400">88.5%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[88.5%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Citizen Sentiment</span>
                      <span className="text-yellow-400">82.3%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 w-[82.3%]"></div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Model trained on 2.4M data points from Nexora sensors
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DecisionEngine;

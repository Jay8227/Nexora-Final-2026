import Layout from '../components/Layout';
import { useState } from 'react';
import { motion } from 'framer-motion';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john@smartcity.gov', role: 'admin', status: 'active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@smartcity.gov', role: 'officer', status: 'active', lastLogin: '5 hours ago' },
    { id: 3, name: 'Mike Davis', email: 'mike@smartcity.gov', role: 'citizen', status: 'inactive', lastLogin: '1 week ago' },
    { id: 4, name: 'Emily Brown', email: 'emily@smartcity.gov', role: 'admin', status: 'active', lastLogin: '30 minutes ago' },
    { id: 5, name: 'David Wilson', email: 'david@smartcity.gov', role: 'officer', status: 'active', lastLogin: '1 hour ago' }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'citizen'
  });

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'security', message: 'Unusual login activity detected', time: '10 mins ago', priority: 'high' },
    { id: 2, type: 'system', message: 'Database backup completed successfully', time: '2 hours ago', priority: 'low' },
    { id: 3, type: 'maintenance', message: 'Scheduled maintenance for next week', time: '1 day ago', priority: 'medium' }
  ]);

  const adminStats = [
    { label: 'Total Users', value: '12,487', change: '+5.2%' },
    { label: 'Active Sessions', value: '1,234', change: '+12%' },
    { label: 'System Uptime', value: '99.9%', change: '+0.1%' },
    { label: 'Avg. Response Time', value: '0.8s', change: '-0.2s' }
  ];

  const handleAddUser = (e) => {
    e.preventDefault();
    const user = {
      id: users.length + 1,
      ...newUser,
      status: 'active',
      lastLogin: 'Just now'
    };
    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'citizen' });
  };

  const updateUserStatus = (userId, newStatus) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <Layout title="Admin Panel">
      <div className="min-h-screen bg-[var(--background-dark)]">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4">
              <span className="text-3xl">⚙️</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Administrator Panel</h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Premium back-office tools for managing city operations, data, and user access
            </p>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {adminStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl border border-gray-700"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-2xl font-bold text-emerald-400 mb-1">{stat.value}</div>
                    <div className="text-sm text-[var(--text-secondary)]">{stat.label}</div>
                  </div>
                  <span className="text-green-400 text-sm">{stat.change}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'users'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'data'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
              }`}
            >
              Data Control
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'insights'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
              }`}
            >
              AI Insights
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'reports'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
              }`}
            >
              Reports
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'alerts'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
              }`}
            >
              Alerts & Config
            </button>
          </div>

          {/* Tab Content */}
          <div className="glass-card rounded-2xl border border-gray-700 p-8 mb-12">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6">System Overview</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* System Health */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">System Health</h3>
                    <div className="space-y-4">
                      {[
                        { service: 'Web Server', status: 'Operational', cpu: 45, memory: 62 },
                        { service: 'Database', status: 'Operational', cpu: 23, memory: 78 },
                        { service: 'API Gateway', status: 'Operational', cpu: 12, memory: 34 },
                        { service: 'Analytics Engine', status: 'Warning', cpu: 87, memory: 91 }
                      ].map((service, index) => (
                        <div key={index} className="p-4 bg-[var(--background-dark)]/50 rounded-lg border border-gray-700">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{service.service}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              service.status === 'Operational' ? 'bg-emerald-500/20 text-emerald-400' :
                              service.status === 'Warning' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {service.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span>CPU</span>
                                <span>{service.cpu}%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    service.cpu > 80 ? 'bg-red-500' : 
                                    service.cpu > 60 ? 'bg-yellow-500' : 'bg-emerald-500'
                                  }`} 
                                  style={{ width: `${service.cpu}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between mb-1">
                                <span>Memory</span>
                                <span>{service.memory}%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    service.memory > 80 ? 'bg-red-500' : 
                                    service.memory > 60 ? 'bg-yellow-500' : 'bg-emerald-500'
                                  }`} 
                                  style={{ width: `${service.memory}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {[
                        { action: 'User logged in', user: 'John Smith', time: '2 mins ago', icon: '👤' },
                        { action: 'Report generated', user: 'System', time: '15 mins ago', icon: '📊' },
                        { action: 'Configuration updated', user: 'Sarah Johnson', time: '30 mins ago', icon: '⚙️' },
                        { action: 'Security scan completed', user: 'System', time: '1 hour ago', icon: '🔒' },
                        { action: 'Data export requested', user: 'Mike Davis', time: '2 hours ago', icon: '📥' }
                      ].map((activity, index) => (
                        <div key={index} className="p-4 bg-[var(--background-dark)]/50 rounded-lg border border-gray-700 flex items-center gap-3">
                          <span className="text-xl">{activity.icon}</span>
                          <div className="flex-1">
                            <div className="font-medium">{activity.action}</div>
                            <div className="text-sm text-[var(--text-secondary)]">{activity.user} • {activity.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6">User Management</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Add User Form */}
                  <div className="lg:col-span-1">
                    <h3 className="text-lg font-semibold mb-4">Add New User</h3>
                    <form onSubmit={handleAddUser} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                          type="text"
                          value={newUser.name}
                          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                          className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                          className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Role</label>
                        <select
                          value={newUser.role}
                          onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                          className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="citizen">Citizen</option>
                          <option value="officer">Officer</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                      >
                        Add User
                      </button>
                    </form>
                  </div>

                  {/* User List */}
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">User Directory</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-3 px-4">Name</th>
                            <th className="text-left py-3 px-4">Email</th>
                            <th className="text-left py-3 px-4">Role</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Last Login</th>
                            <th className="text-left py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.id} className="border-b border-gray-700">
                              <td className="py-3 px-4">{user.name}</td>
                              <td className="py-3 px-4 text-[var(--text-secondary)]">{user.email}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                                  user.role === 'officer' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
                                }`}>
                                  {user.role}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  user.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                                }`}>
                                  {user.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm text-[var(--text-secondary)]">{user.lastLogin}</td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <select
                                    value={user.status}
                                    onChange={(e) => updateUserStatus(user.id, e.target.value)}
                                    className="text-xs bg-[var(--background-dark)] border border-gray-700 rounded px-2 py-1 text-white"
                                  >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                  </select>
                                  <button
                                    onClick={() => deleteUser(user.id)}
                                    className="text-red-400 hover:text-red-300 text-xs"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'data' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-6">💾</div>
                <h2 className="text-2xl font-bold mb-4">Data Control Panel</h2>
                <p className="text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                  Manage city data, configure data retention policies, and oversee data processing systems
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="glass-card p-6 rounded-xl border border-gray-700">
                    <div className="text-4xl mb-4">📊</div>
                    <h3 className="font-semibold mb-2">Data Analytics</h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-4">Configure data processing and analytics pipelines</p>
                    <button className="w-full py-2 bg-[var(--card-bg)] border border-gray-700 rounded-lg text-white hover:bg-gray-800/50 transition-colors">
                      Configure
                    </button>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl border border-gray-700">
                    <div className="text-4xl mb-4">🔒</div>
                    <h3 className="font-semibold mb-2">Privacy Controls</h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-4">Manage data privacy settings and compliance</p>
                    <button className="w-full py-2 bg-[var(--card-bg)] border border-gray-700 rounded-lg text-white hover:bg-gray-800/50 transition-colors">
                      Configure
                    </button>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl border border-gray-700">
                    <div className="text-4xl mb-4">🔄</div>
                    <h3 className="font-semibold mb-2">Backup & Sync</h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-4">Configure data backup and synchronization</p>
                    <button className="w-full py-2 bg-[var(--card-bg)] border border-gray-700 rounded-lg text-white hover:bg-gray-800/50 transition-colors">
                      Configure
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'insights' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6">AI Insights & Analytics</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Predictive Analytics */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Predictive Analytics</h3>
                    <div className="space-y-4">
                      {[
                        { metric: 'Traffic Congestion', prediction: 'High congestion expected at 17:30', confidence: 92 },
                        { metric: 'Energy Demand', prediction: 'Peak usage expected at 19:00', confidence: 88 },
                        { metric: 'Maintenance Needs', prediction: 'Water pump maintenance needed', confidence: 76 },
                        { metric: 'Resource Allocation', prediction: 'Increased police presence needed in downtown', confidence: 84 }
                      ].map((item, index) => (
                        <div key={index} className="p-4 bg-[var(--background-dark)]/50 rounded-lg border border-gray-700">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{item.metric}</h4>
                            <span className="text-sm">{item.confidence}% confidence</span>
                          </div>
                          <p className="text-sm text-[var(--text-secondary)]">{item.prediction}</p>
                          <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full" 
                              style={{ width: `${item.confidence}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
                    <div className="h-64 flex items-end justify-between">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
                        <div key={month} className="flex flex-col items-center flex-1 mx-1">
                          <div className="flex items-end justify-center h-40 w-full">
                            <div 
                              className="w-3/4 bg-gradient-to-t from-purple-500 to-purple-700 rounded-t mx-1"
                              style={{ height: `${Math.max(20, 60 + index * 15)}%` }}
                            />
                          </div>
                          <span className="text-xs text-[var(--text-secondary)] mt-2">{month}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-[var(--background-dark)]/50 rounded-lg">
                        <div className="text-2xl font-bold text-emerald-400">94%</div>
                        <div className="text-sm text-[var(--text-secondary)]">Accuracy Rate</div>
                      </div>
                      <div className="text-center p-4 bg-[var(--background-dark)]/50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">0.8s</div>
                        <div className="text-sm text-[var(--text-secondary)]">Avg. Response Time</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reports' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-6">📋</div>
                <h2 className="text-2xl font-bold mb-4">Report Generation</h2>
                <p className="text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                  Generate comprehensive reports in PDF/Excel formats for analysis and documentation
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  {[
                    { title: 'Daily Operations', icon: '📅', format: 'PDF/Excel' },
                    { title: 'Monthly Analytics', icon: '📊', format: 'PDF/Excel' },
                    { title: 'User Activity', icon: '👥', format: 'PDF/Excel' },
                    { title: 'System Performance', icon: '⚙️', format: 'PDF/Excel' },
                    { title: 'Financial Summary', icon: '💰', format: 'PDF/Excel' },
                    { title: 'Security Audit', icon: '🔒', format: 'PDF/Excel' },
                    { title: 'Compliance Report', icon: '📋', format: 'PDF/Excel' },
                    { title: 'Custom Report', icon: '🎨', format: 'PDF/Excel' }
                  ].map((report, index) => (
                    <div key={index} className="glass-card p-6 rounded-xl border border-gray-700">
                      <div className="text-4xl mb-4">{report.icon}</div>
                      <h3 className="font-semibold mb-2">{report.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-4">{report.format}</p>
                      <button className="w-full py-2 bg-[var(--card-bg)] border border-gray-700 rounded-lg text-white hover:bg-gray-800/50 transition-colors">
                        Generate
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'alerts' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6">Alert Configuration</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* System Alerts */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">System Alerts</h3>
                    <div className="space-y-4">
                      {alerts.map((alert) => (
                        <div key={alert.id} className="p-4 bg-[var(--background-dark)]/50 rounded-lg border border-gray-700">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`${
                                alert.type === 'security' ? 'text-red-400' :
                                alert.type === 'system' ? 'text-blue-400' : 'text-yellow-400'
                              }`}>
                                {alert.type === 'security' ? '🔒' : 
                                 alert.type === 'system' ? '⚙️' : '⚠️'}
                              </span>
                              <span className="font-medium">{alert.message}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              alert.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                              alert.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {alert.priority}
                            </span>
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">{alert.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Alert Settings */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Alert Configuration</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'Critical System Failures', enabled: true, channel: 'Email, SMS, Push' },
                        { name: 'Security Breaches', enabled: true, channel: 'Email, SMS, Push' },
                        { name: 'Performance Degradation', enabled: true, channel: 'Email' },
                        { name: 'User Account Changes', enabled: false, channel: 'Email' },
                        { name: 'Data Backup Status', enabled: true, channel: 'Email' },
                        { name: 'Resource Utilization', enabled: true, channel: 'Push Notification' }
                      ].map((setting, index) => (
                        <div key={index} className="p-4 bg-[var(--background-dark)]/50 rounded-lg border border-gray-700">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{setting.name}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={setting.enabled}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                          </div>
                          <div className="text-sm text-[var(--text-secondary)]">Channels: {setting.channel}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Admin Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="glass-card p-6 rounded-xl border border-gray-700 text-center">
              <div className="text-4xl mb-4">🔐</div>
              <h3 className="text-lg font-semibold mb-2">Role-Based Access</h3>
              <p className="text-sm text-[var(--text-secondary)]">Granular permission controls for different user roles</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-gray-700 text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-lg font-semibold mb-2">Security Management</h3>
              <p className="text-sm text-[var(--text-secondary)]">Advanced security features and audit trails</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-gray-700 text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-sm text-[var(--text-secondary)]">Machine learning for predictive analytics</p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;
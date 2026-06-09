import Layout from '../components/Layout';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Citizens = () => {
  const [activeTab, setActiveTab] = useState('services');
  const [billPayment, setBillPayment] = useState({
    service: '',
    amount: '',
    account: ''
  });
  const [issueReport, setIssueReport] = useState({
    category: '',
    location: '',
    description: '',
    photo: null
  });

  const [trackingRequests, setTrackingRequests] = useState([
    {
      id: '#REQ-2024-001',
      service: 'Water Bill Payment',
      status: 'Completed',
      date: '2024-01-15',
      progress: 100
    },
    {
      id: '#REQ-2024-002',
      service: 'Road Repair Request',
      status: 'In Progress',
      date: '2024-01-14',
      progress: 65
    },
    {
      id: '#REQ-2024-003',
      service: 'Garbage Collection Issue',
      status: 'Pending',
      date: '2024-01-13',
      progress: 20
    }
  ]);

  const handleBillPaymentChange = (e) => {
    setBillPayment({
      ...billPayment,
      [e.target.name]: e.target.value
    });
  };

  const handleIssueReportChange = (e) => {
    setIssueReport({
      ...issueReport,
      [e.target.name]: e.target.value
    });
  };

  const citizenServices = [
    {
      title: 'Pay Utility Bills',
      description: 'Pay electricity, water, gas, and other utility bills online',
      icon: '💳',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Report Issues',
      description: 'Report problems with roads, lights, garbage, and more',
      icon: '📝',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Track Requests',
      description: 'Monitor the status of your submitted requests',
      icon: '🔍',
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Notifications',
      description: 'Receive alerts and updates about city services',
      icon: '🔔',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const billTypes = [
    { name: 'Electricity', icon: '⚡', provider: 'City Power Co.' },
    { name: 'Water', icon: '💧', provider: 'Municipal Water Board' },
    { name: 'Gas', icon: '⛽', provider: 'City Gas Services' },
    { name: 'Internet', icon: '📡', provider: 'Municipal Broadband' }
  ];

  const issueCategories = [
    'Road Damage', 'Street Light', 'Garbage Collection', 
    'Water Leak', 'Drainage', 'Traffic Signal', 'Park Maintenance', 'Other'
  ];

  return (
    <Layout title="Citizen Services">
      <div className="min-h-screen bg-[var(--background-dark)]">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Citizen Services</h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Convenient access to city services, bill payments, and issue reporting for residents
            </p>
          </motion.div>

          {/* Citizen Services Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {citizenServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl border border-gray-700 text-center group hover:scale-105 transition-transform"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'services'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
              }`}
            >
              City Services
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'payments'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
              }`}
            >
              Bill Payments
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'reports'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
              }`}
            >
              Report Issues
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'tracking'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
              }`}
            >
              Request Tracking
            </button>
          </div>

          {/* Tab Content */}
          <div className="glass-card rounded-2xl border border-gray-700 p-8 mb-12">
            {activeTab === 'services' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-6">🏙️</div>
                <h2 className="text-2xl font-bold mb-4">City Services Hub</h2>
                <p className="text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                  Access all city services in one place. From utility payments to issue reporting, everything you need as a resident.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {billTypes.map((bill, index) => (
                    <div key={bill.name} className="glass-card p-6 rounded-xl border border-gray-700">
                      <div className="flex items-center justify-center mb-4">
                        <div className="text-4xl mr-3">{bill.icon}</div>
                        <div>
                          <h3 className="text-lg font-semibold">{bill.name}</h3>
                          <p className="text-sm text-[var(--text-secondary)]">{bill.provider}</p>
                        </div>
                      </div>
                      <button className="w-full py-2 bg-[var(--card-bg)] border border-gray-700 rounded-lg text-white hover:bg-gray-800/50 transition-colors">
                        Manage Account
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'payments' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6">Pay Utility Bills</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Service Type</label>
                      <select
                        name="service"
                        value={billPayment.service}
                        onChange={handleBillPaymentChange}
                        className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a service</option>
                        {billTypes.map(bill => (
                          <option key={bill.name} value={bill.name}>{bill.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Account Number</label>
                      <input
                        type="text"
                        name="account"
                        value={billPayment.account}
                        onChange={handleBillPaymentChange}
                        placeholder="Enter your account number"
                        className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Amount</label>
                      <input
                        type="number"
                        name="amount"
                        value={billPayment.amount}
                        onChange={handleBillPaymentChange}
                        placeholder="Enter amount"
                        className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity">
                      Proceed to Payment
                    </button>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-[var(--background-dark)]/50 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-semibold">Electricity Bill</h3>
                          <p className="text-sm text-[var(--text-secondary)]">Jan 15, 2024 • #TXN-001</p>
                        </div>
                        <span className="text-emerald-400 font-semibold">$85.00</span>
                      </div>
                      <div className="text-xs text-green-400">Paid Successfully</div>
                    </div>
                    
                    <div className="p-4 bg-[var(--background-dark)]/50 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-semibold">Water Bill</h3>
                          <p className="text-sm text-[var(--text-secondary)]">Jan 10, 2024 • #TXN-002</p>
                        </div>
                        <span className="text-emerald-400 font-semibold">$42.50</span>
                      </div>
                      <div className="text-xs text-green-400">Paid Successfully</div>
                    </div>
                    
                    <div className="p-4 bg-[var(--background-dark)]/50 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-semibold">Gas Bill</h3>
                          <p className="text-sm text-[var(--text-secondary)]">Jan 5, 2024 • #TXN-003</p>
                        </div>
                        <span className="text-emerald-400 font-semibold">$67.20</span>
                      </div>
                      <div className="text-xs text-green-400">Paid Successfully</div>
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
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6">Report an Issue</h2>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Issue Category</label>
                      <select
                        name="category"
                        value={issueReport.category}
                        onChange={handleIssueReportChange}
                        className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a category</option>
                        {issueCategories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={issueReport.location}
                        onChange={handleIssueReportChange}
                        placeholder="Where is the issue located?"
                        className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        name="description"
                        value={issueReport.description}
                        onChange={handleIssueReportChange}
                        placeholder="Describe the issue in detail"
                        rows="4"
                        className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Upload Photo (Optional)</label>
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <button
                      type="button"
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                    >
                      Submit Report
                    </button>
                  </form>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6">Reporting Guidelines</h2>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-[var(--background-dark)]/50 rounded-lg border border-gray-700">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <span>📍</span>
                        <span>Accurate Location</span>
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">Provide precise location details to help our teams locate the issue quickly.</p>
                    </div>
                    
                    <div className="p-4 bg-[var(--background-dark)]/50 rounded-lg border border-gray-700">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <span>📸</span>
                        <span>Photo Evidence</span>
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">Upload clear photos to better illustrate the problem for assessment.</p>
                    </div>
                    
                    <div className="p-4 bg-[var(--background-dark)]/50 rounded-lg border border-gray-700">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <span>📝</span>
                        <span>Detailed Description</span>
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">Include specific details about the issue and when it occurs.</p>
                    </div>
                    
                    <div className="p-4 bg-[var(--background-dark)]/50 rounded-lg border border-gray-700">
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <span>⏰</span>
                        <span>Response Time</span>
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)]">Most issues are addressed within 24-48 hours depending on severity.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'tracking' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6">Track Your Requests</h2>
                
                <div className="space-y-6">
                  {trackingRequests.map((request) => (
                    <div key={request.id} className="p-6 bg-[var(--background-dark)]/50 rounded-xl border border-gray-700">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{request.service}</h3>
                          <p className="text-sm text-[var(--text-secondary)]">{request.id} • {request.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          request.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' :
                          request.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                      
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{request.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              request.progress === 100 ? 'bg-emerald-500' :
                              request.progress > 50 ? 'bg-yellow-500' : 'bg-blue-500'
                            }`} 
                            style={{ width: `${request.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <button className="px-4 py-2 bg-[var(--card-bg)] border border-gray-700 rounded-lg text-white hover:bg-gray-800/50 transition-colors">
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-[var(--card-bg)] border border-gray-700 rounded-lg text-white hover:bg-gray-800/50 transition-colors">
                          Contact Support
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-12"
          >
            <h2 className="text-3xl font-bold mb-8">Benefits for Citizens</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="glass-card p-6 rounded-xl border border-gray-700">
                <div className="text-4xl mb-4">⏱️</div>
                <h3 className="text-xl font-semibold mb-2">Time Saving</h3>
                <p className="text-[var(--text-secondary)]">Complete tasks online without visiting offices, saving valuable time.</p>
              </div>
              
              <div className="glass-card p-6 rounded-xl border border-gray-700">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-semibold mb-2">Convenience</h3>
                <p className="text-[var(--text-secondary)]">Access services anytime, anywhere from your smartphone or computer.</p>
              </div>
              
              <div className="glass-card p-6 rounded-xl border border-gray-700">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                <p className="text-[var(--text-secondary)]">Track your requests and see real-time updates on service delivery.</p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
          >
            <h3 className="text-2xl font-semibold mb-4">Need More Assistance?</h3>
            <p className="text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
              Connect with our citizen support team for personalized help with city services
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity">
                Contact Support
              </button>
              <button className="px-8 py-3 bg-[var(--card-bg)] border border-gray-700 rounded-xl font-semibold text-white hover:bg-gray-800/50 transition-colors">
                Download Mobile App
              </button>
              <button className="px-8 py-3 bg-[var(--card-bg)] border border-gray-700 rounded-xl font-semibold text-white hover:bg-gray-800/50 transition-colors">
                Video Tutorial
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Citizens;
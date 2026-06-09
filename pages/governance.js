import Layout from '../components/Layout';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Governance = () => {
  const [activeTab, setActiveTab] = useState('complaints');
  const [complaintForm, setComplaintForm] = useState({
    category: '',
    subject: '',
    description: '',
    location: '',
    contact: ''
  });

  const [submittedComplaints, setSubmittedComplaints] = useState([
    {
      id: 1,
      category: 'Road Maintenance',
      subject: 'Pothole Repair Needed',
      status: 'In Progress',
      priority: 'High',
      submitted: '2 days ago',
      location: 'Main St & 5th Ave'
    },
    {
      id: 2,
      category: 'Street Lighting',
      subject: 'Street Light Malfunction',
      status: 'Resolved',
      priority: 'Medium',
      submitted: '5 days ago',
      location: 'Oak Avenue'
    },
    {
      id: 3,
      category: 'Garbage Collection',
      subject: 'Waste Pickup Delay',
      status: 'Pending',
      priority: 'Low',
      submitted: '1 day ago',
      location: 'Pine Street'
    }
  ]);

  const handleInputChange = (e) => {
    setComplaintForm({
      ...complaintForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    const newComplaint = {
      id: submittedComplaints.length + 1,
      ...complaintForm,
      status: 'Pending',
      priority: 'Medium',
      submitted: 'Just now'
    };
    setSubmittedComplaints([newComplaint, ...submittedComplaints]);
    setComplaintForm({ category: '', subject: '', description: '', location: '', contact: '' });
  };

  const governanceServices = [
    {
      title: 'Online Complaints',
      description: 'Submit and track complaints about city services',
      icon: '📝',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Digital Certificates',
      description: 'Request birth, death, and residence certificates online',
      icon: '📋',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Citizen Feedback',
      description: 'Share your thoughts and suggestions for city improvement',
      icon: '💬',
      color: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Budget Transparency',
      description: 'View how city funds are allocated and spent',
      icon: '💰',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const complaintCategories = [
    'Road Maintenance', 'Street Lighting', 'Garbage Collection', 
    'Water Supply', 'Electricity', 'Public Safety', 'Parks & Recreation',
    'Traffic Management', 'Noise Complaint', 'Other'
  ];

  const complaintStats = [
    { label: 'Total Submitted', value: '1,248' },
    { label: 'Resolved', value: '987' },
    { label: 'In Progress', value: '234' },
    { label: 'Average Resolution Time', value: '3.2 days' }
  ];

  return (
    <Layout title="E-Governance Portal">
      <div className="min-h-screen bg-[var(--background-dark)]">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl font-bold mb-4">E-Governance Portal</h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Transparent, efficient, and citizen-centric governance services powered by digital technology
            </p>
          </motion.div>

          {/* Governance Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {governanceServices.map((service, index) => (
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

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {complaintStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl border border-gray-700 text-center"
              >
                <div className="text-2xl font-bold text-emerald-400 mb-1">{stat.value}</div>
                <div className="text-sm text-[var(--text-secondary)]">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab('complaints')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'complaints'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
              }`}
            >
              Online Complaints
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'certificates'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
              }`}
            >
              Digital Certificates
            </button>
            <button
              onClick={() => setActiveTab('feedback')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'feedback'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
              }`}
            >
              Citizen Feedback
            </button>
            <button
              onClick={() => setActiveTab('transparency')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'transparency'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
              }`}
            >
              Budget Transparency
            </button>
          </div>

          {/* Tab Content */}
          <div className="glass-card rounded-2xl border border-gray-700 p-8 mb-12">
            {activeTab === 'complaints' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Complaint Form */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Submit a Complaint</h2>
                  <form onSubmit={handleSubmitComplaint}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                          name="category"
                          value={complaintForm.category}
                          onChange={handleInputChange}
                          className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select a category</option>
                          {complaintCategories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={complaintForm.subject}
                          onChange={handleInputChange}
                          placeholder="Briefly describe your complaint"
                          className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={complaintForm.location}
                          onChange={handleInputChange}
                          placeholder="Where is the issue located?"
                          className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                          name="description"
                          value={complaintForm.description}
                          onChange={handleInputChange}
                          placeholder="Provide detailed information about your complaint"
                          rows="4"
                          className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Contact Information</label>
                        <input
                          type="text"
                          name="contact"
                          value={complaintForm.contact}
                          onChange={handleInputChange}
                          placeholder="Email or phone for updates"
                          className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                      >
                        Submit Complaint
                      </button>
                    </div>
                  </form>
                </motion.div>

                {/* Complaint Tracking */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Track Your Complaints</h2>
                  
                  <div className="space-y-4">
                    {submittedComplaints.map((complaint) => (
                      <div key={complaint.id} className="p-4 bg-[var(--background-dark)]/50 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{complaint.subject}</h3>
                            <p className="text-sm text-[var(--text-secondary)]">{complaint.category} • {complaint.location}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            complaint.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' :
                            complaint.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {complaint.status}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-4">
                            <span className={`${
                              complaint.priority === 'High' ? 'text-red-400' :
                              complaint.priority === 'Medium' ? 'text-yellow-400' : 'text-blue-400'
                            }`}>
                              {complaint.priority} Priority
                            </span>
                            <span className="text-gray-500">{complaint.submitted}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === 'certificates' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-6">📋</div>
                <h2 className="text-2xl font-bold mb-4">Digital Certificate Services</h2>
                <p className="text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                  Apply for various certificates online including birth, death, residence, and business permits.
                  Process your applications digitally and receive certificates with blockchain-verified authenticity.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="glass-card p-6 rounded-xl border border-gray-700">
                    <div className="text-4xl mb-4">👶</div>
                    <h3 className="font-semibold mb-2">Birth Certificate</h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-4">Apply for birth certificates for newborns</p>
                    <button className="w-full py-2 bg-[var(--card-bg)] border border-gray-700 rounded-lg text-white hover:bg-gray-800/50 transition-colors">
                      Apply Now
                    </button>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl border border-gray-700">
                    <div className="text-4xl mb-4">⚰️</div>
                    <h3 className="font-semibold mb-2">Death Certificate</h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-4">Official death certificate documentation</p>
                    <button className="w-full py-2 bg-[var(--card-bg)] border border-gray-700 rounded-lg text-white hover:bg-gray-800/50 transition-colors">
                      Apply Now
                    </button>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl border border-gray-700">
                    <div className="text-4xl mb-4">🏠</div>
                    <h3 className="font-semibold mb-2">Residence Certificate</h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-4">Proof of residency for official purposes</p>
                    <button className="w-full py-2 bg-[var(--card-bg)] border border-gray-700 rounded-lg text-white hover:bg-gray-800/50 transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'feedback' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-6">💬</div>
                <h2 className="text-2xl font-bold mb-4">Citizen Feedback System</h2>
                <p className="text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                  Share your ideas, suggestions, and feedback to help us improve city services and governance.
                  Your voice matters in shaping the future of our community.
                </p>
                
                <div className="max-w-2xl mx-auto bg-[var(--background-dark)]/50 p-6 rounded-xl border border-gray-700">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-left">Feedback Type</label>
                      <select className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white">
                        <option>Suggestion</option>
                        <option>Complaint</option>
                        <option>Appreciation</option>
                        <option>General Feedback</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-left">Subject</label>
                      <input
                        type="text"
                        placeholder="What is your feedback about?"
                        className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-left">Message</label>
                      <textarea
                        placeholder="Share your detailed feedback here..."
                        rows="5"
                        className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white"
                      ></textarea>
                    </div>
                    
                    <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity">
                      Submit Feedback
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'transparency' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-6">🔍</div>
                <h2 className="text-2xl font-bold mb-4">Budget Transparency Dashboard</h2>
                <p className="text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                  View how city funds are allocated and spent across different departments and projects.
                  Promoting transparency and accountability in municipal governance.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="glass-card p-6 rounded-xl border border-gray-700">
                    <h3 className="font-semibold mb-4">Annual Budget</h3>
                    <div className="text-2xl font-bold text-emerald-400">$2.4B</div>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">Total city budget 2024</p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl border border-gray-700">
                    <h3 className="font-semibold mb-4">Spent This Year</h3>
                    <div className="text-2xl font-bold text-blue-400">$1.8B</div>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">Amount utilized</p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl border border-gray-700">
                    <h3 className="font-semibold mb-4">Remaining</h3>
                    <div className="text-2xl font-bold text-yellow-400">$600M</div>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">Balance for projects</p>
                  </div>
                </div>
                
                <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-blue-900/20 to-emerald-900/20 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold mb-4">Budget Allocation by Department</h3>
                    <div className="space-y-4">
                      {[
                        { dept: 'Infrastructure', percentage: 35, amount: '$840M', color: 'bg-blue-500' },
                        { dept: 'Public Safety', percentage: 25, amount: '$600M', color: 'bg-red-500' },
                        { dept: 'Education', percentage: 15, amount: '$360M', color: 'bg-purple-500' },
                        { dept: 'Healthcare', percentage: 12, amount: '$288M', color: 'bg-emerald-500' },
                        { dept: 'Administration', percentage: 8, amount: '$192M', color: 'bg-yellow-500' },
                        { dept: 'Others', percentage: 5, amount: '$120M', color: 'bg-gray-500' }
                      ].map((item, index) => (
                        <div key={item.dept}>
                          <div className="flex justify-between mb-1">
                            <span>{item.dept}</span>
                            <span>{item.percentage}% ({item.amount})</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-3">
                            <div 
                              className={`${item.color} h-3 rounded-full`} 
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <h3 className="text-2xl font-semibold mb-4">Need Government Assistance?</h3>
            <p className="text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
              Access all government services and support channels through our integrated portal
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity">
                Online Services
              </button>
              <button className="px-8 py-3 bg-[var(--card-bg)] border border-gray-700 rounded-xl font-semibold text-white hover:bg-gray-800/50 transition-colors">
                Document Center
              </button>
              <button className="px-8 py-3 bg-[var(--card-bg)] border border-gray-700 rounded-xl font-semibold text-white hover:bg-gray-800/50 transition-colors">
                Support Chat
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Governance;
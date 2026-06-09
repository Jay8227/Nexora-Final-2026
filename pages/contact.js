import Layout from '../components/Layout';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [activeTab, setActiveTab] = useState('support');

  const emergencyContacts = [
    { service: 'Police', number: '100', icon: '🚨', color: 'red' },
    { service: 'Ambulance', number: '102', icon: '🚑', color: 'blue' },
    { service: 'Fire Department', number: '101', icon: '🔥', color: 'orange' },
    { service: 'Municipal Helpline', number: '1800-123-4567', icon: '🏘️', color: 'green' },
    { service: 'Women\'s Helpline', number: '181', icon: '👩', color: 'purple' },
    { service: 'Senior Citizen', number: '145', icon: '👵', color: 'cyan' }
  ];

  const officeLocations = [
    {
      name: 'City Hall',
      address: '123 Government Plaza, Downtown',
      hours: 'Monday-Friday: 9:00 AM - 5:00 PM',
      phone: '(555) 123-4567',
      email: 'info@smartcity.gov'
    },
    {
      name: 'Municipal Building',
      address: '456 Civic Center, Central District',
      hours: 'Monday-Friday: 8:00 AM - 6:00 PM',
      phone: '(555) 234-5678',
      email: 'services@smartcity.gov'
    },
    {
      name: 'Regional Office',
      address: '789 Administrative Square, North Side',
      hours: 'Monday-Friday: 9:00 AM - 4:00 PM',
      phone: '(555) 345-6789',
      email: 'regional@smartcity.gov'
    }
  ];

  const supportOptions = [
    { name: 'Technical Support', icon: '💻', description: 'Issues with website or app functionality' },
    { name: 'Service Inquiry', icon: '📋', description: 'Questions about city services and processes' },
    { name: 'Complaint Resolution', icon: '📝', description: 'Address concerns about city services' },
    { name: 'Account Help', icon: '👤', description: 'Assistance with account registration and login' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data to a backend
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Layout title="Contact & Support">
      <div className="min-h-screen bg-[var(--background-dark)]">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full mb-4">
              <span className="text-3xl">📞</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Contact & Support</h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Get in touch with us for assistance, emergency contacts, or office locations
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveTab('support')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'support'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
              }`}
            >
              Support
            </button>
            <button
              onClick={() => setActiveTab('emergency')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'emergency'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
              }`}
            >
              Emergency Contacts
            </button>
            <button
              onClick={() => setActiveTab('locations')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'locations'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
              }`}
            >
              Office Locations
            </button>
            <button
              onClick={() => setActiveTab('feedback')}
              className={`px-6 py-3 rounded-xl transition-all ${
                activeTab === 'feedback'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
              }`}
            >
              Feedback
            </button>
          </div>

          {/* Tab Content */}
          <div className="glass-card rounded-2xl border border-gray-700 p-8 mb-12">
            {activeTab === 'support' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6">Get Support</h2>
                  
                  <div className="space-y-4 mb-8">
                    {supportOptions.map((option, index) => (
                      <div key={index} className="p-4 bg-[var(--background-dark)]/50 rounded-lg border border-gray-700 flex items-start gap-4">
                        <div className="text-2xl">{option.icon}</div>
                        <div>
                          <h3 className="font-semibold">{option.name}</h3>
                          <p className="text-sm text-[var(--text-secondary)]">{option.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📧</span>
                      <div>
                        <div className="font-medium">Email Support</div>
                        <div className="text-sm text-[var(--text-secondary)]">support@smartcity.gov</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💬</span>
                      <div>
                        <div className="font-medium">Live Chat</div>
                        <div className="text-sm text-[var(--text-secondary)]">Available 9 AM - 6 PM</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📞</span>
                      <div>
                        <div className="font-medium">Phone Support</div>
                        <div className="text-sm text-[var(--text-secondary)]">1800-123-4567</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="5"
                        className="w-full p-3 bg-[var(--background-dark)] border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {activeTab === 'emergency' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-8 text-center">Emergency Contacts</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {emergencyContacts.map((contact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glass-card p-6 rounded-xl border border-gray-700 text-center hover:scale-105 transition-transform"
                    >
                      <div className="text-4xl mb-4">{contact.icon}</div>
                      <h3 className="text-lg font-semibold mb-2">{contact.service}</h3>
                      <div className="text-2xl font-bold text-emerald-400 mb-4">{contact.number}</div>
                      <button className={`w-full py-2 rounded-lg font-medium ${
                        contact.color === 'red' ? 'bg-red-600 hover:bg-red-700' :
                        contact.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                        contact.color === 'orange' ? 'bg-orange-600 hover:bg-orange-700' :
                        contact.color === 'green' ? 'bg-emerald-600 hover:bg-emerald-700' :
                        contact.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                        'bg-cyan-600 hover:bg-cyan-700'
                      } text-white transition-colors`}>
                        Call Now
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-[var(--background-dark)]/50 rounded-xl border border-gray-700">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span>🚨</span>
                    <span>Emergency Procedures</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">During Emergency:</h4>
                      <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                        <li>• Stay calm and assess the situation</li>
                        <li>• Ensure your safety and others around you</li>
                        <li>• Call the appropriate emergency number</li>
                        <li>• Provide clear location and situation details</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">After Emergency:</h4>
                      <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                        <li>• Report the incident to authorities</li>
                        <li>• Document the event with photos if safe</li>
                        <li>• Seek medical attention if needed</li>
                        <li>• Follow up with city services if required</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'locations' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-8 text-center">Office Locations</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {officeLocations.map((location, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glass-card p-6 rounded-xl border border-gray-700"
                    >
                      <h3 className="text-lg font-semibold mb-3">{location.name}</h3>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-start gap-3">
                          <span>📍</span>
                          <span className="text-sm text-[var(--text-secondary)]">{location.address}</span>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <span>🕒</span>
                          <span className="text-sm text-[var(--text-secondary)]">{location.hours}</span>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <span>📞</span>
                          <span className="text-sm text-[var(--text-secondary)]">{location.phone}</span>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <span>✉️</span>
                          <span className="text-sm text-[var(--text-secondary)]">{location.email}</span>
                        </div>
                      </div>
                      
                      <button className="w-full py-2 bg-[var(--card-bg)] border border-gray-700 rounded-lg text-white hover:bg-gray-800/50 transition-colors">
                        Get Directions
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl h-96 flex items-center justify-center border border-gray-700">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🗺️</div>
                    <h3 className="text-lg font-medium mb-2">Interactive City Map</h3>
                    <p className="text-[var(--text-secondary)]">Find directions to our offices with real-time traffic updates</p>
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
                <h2 className="text-2xl font-bold mb-4">We Value Your Feedback</h2>
                <p className="text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                  Help us improve our services by sharing your experiences and suggestions
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  {[
                    { title: 'Service Rating', icon: '⭐', color: 'yellow' },
                    { title: 'Satisfaction Survey', icon: '📋', color: 'blue' },
                    { title: 'Complaint Form', icon: '📝', color: 'red' },
                    { title: 'Suggestion Box', icon: '💡', color: 'green' }
                  ].map((item, index) => (
                    <div key={index} className="glass-card p-6 rounded-xl border border-gray-700">
                      <div className={`text-4xl mb-4 ${
                        item.color === 'yellow' ? 'text-yellow-400' :
                        item.color === 'blue' ? 'text-blue-400' :
                        item.color === 'red' ? 'text-red-400' : 'text-emerald-400'
                      }`}>
                        {item.icon}
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <button className="w-full py-2 bg-[var(--card-bg)] border border-gray-700 rounded-lg text-white hover:bg-gray-800/50 transition-colors">
                        Start
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Support Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="glass-card p-6 rounded-xl border border-gray-700 text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg font-semibold mb-2">Help Center</h3>
              <p className="text-sm text-[var(--text-secondary)]">Browse our comprehensive guides and tutorials</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-gray-700 text-center">
              <div className="text-4xl mb-4">📹</div>
              <h3 className="text-lg font-semibold mb-2">Video Tutorials</h3>
              <p className="text-sm text-[var(--text-secondary)]">Watch step-by-step instructions for common tasks</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-gray-700 text-center">
              <div className="text-4xl mb-4">❓</div>
              <h3 className="text-lg font-semibold mb-2">FAQs</h3>
              <p className="text-sm text-[var(--text-secondary)]">Find answers to commonly asked questions</p>
            </div>
          </motion.div>

          {/* Social Media Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <h3 className="text-2xl font-semibold mb-6">Connect With Us</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'Twitter', icon: '🐦', url: '#' },
                { name: 'Facebook', icon: '📘', url: '#' },
                { name: 'Instagram', icon: '📷', url: '#' },
                { name: 'LinkedIn', icon: '👔', url: '#' },
                { name: 'YouTube', icon: '📺', url: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-16 h-16 bg-[var(--card-bg)] border border-gray-700 rounded-xl flex items-center justify-center text-2xl hover:bg-gray-800/50 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
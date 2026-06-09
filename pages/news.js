import Layout from '../components/Layout';
import { useState } from 'react';
import { motion } from 'framer-motion';

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const newsItems = [
    {
      id: 1,
      title: 'New Smart Traffic System Reduces Commute Times by 23%',
      excerpt: 'The newly implemented AI-powered traffic management system has shown remarkable results in reducing congestion...',
      category: 'infrastructure',
      date: '2024-01-15',
      readTime: '3 min read',
      image: 'traffic',
      featured: true
    },
    {
      id: 2,
      title: 'City Achieves 60% Renewable Energy Target Ahead of Schedule',
      excerpt: 'Our commitment to sustainability pays off as we reach our renewable energy goals two years early...',
      category: 'environment',
      date: '2024-01-12',
      readTime: '4 min read',
      image: 'solar',
      featured: true
    },
    {
      id: 3,
      title: 'Digital Certificate Portal Now Available to All Residents',
      excerpt: 'Streamline your document processing with our new digital certificate system...',
      category: 'governance',
      date: '2024-01-10',
      readTime: '2 min read',
      image: 'certificate',
      featured: false
    },
    {
      id: 4,
      title: 'Smart Waste Management Pilot Program Expands Citywide',
      excerpt: 'Following successful pilot results, our smart waste collection system is now available in all districts...',
      category: 'services',
      date: '2024-01-08',
      readTime: '3 min read',
      image: 'waste',
      featured: false
    },
    {
      id: 5,
      title: 'Upcoming Infrastructure Projects for 2024',
      excerpt: 'Learn about the major infrastructure improvements planned for the coming year...',
      category: 'announcements',
      date: '2024-01-05',
      readTime: '5 min read',
      image: 'construction',
      featured: false
    },
    {
      id: 6,
      title: 'Cybersecurity Awareness Month Initiatives',
      excerpt: 'Join our cybersecurity awareness programs and learn how to protect your digital identity...',
      category: 'security',
      date: '2024-01-03',
      readTime: '4 min read',
      image: 'cybersecurity',
      featured: false
    },
    {
      id: 7,
      title: 'New Public Transportation Routes Launch Next Month',
      excerpt: 'Experience improved connectivity with our expanded public transit network...',
      category: 'transportation',
      date: '2024-01-01',
      readTime: '3 min read',
      image: 'bus',
      featured: false
    },
    {
      id: 8,
      title: 'Smart City App Downloads Surpass 100,000 Mark',
      excerpt: 'Celebrating a major milestone in citizen engagement and digital accessibility...',
      category: 'technology',
      date: '2023-12-28',
      readTime: '2 min read',
      image: 'app',
      featured: false
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Smart City Innovation Summit',
      date: '2024-02-15',
      time: '09:00 AM - 05:00 PM',
      location: 'City Convention Center',
      description: 'Join industry leaders and innovators discussing the future of smart cities...'
    },
    {
      id: 2,
      title: 'Citizen Town Hall Meeting',
      date: '2024-02-20',
      time: '06:00 PM - 08:00 PM',
      location: 'City Hall',
      description: 'Participate in discussions about upcoming city initiatives and share your feedback...'
    },
    {
      id: 3,
      title: 'Sustainability Fair',
      date: '2024-03-05',
      time: '10:00 AM - 04:00 PM',
      location: 'Central Park',
      description: 'Discover eco-friendly practices and green technologies for urban living...'
    }
  ];

  const categories = [
    { id: 'all', name: 'All News', count: newsItems.length },
    { id: 'announcements', name: 'Announcements', count: newsItems.filter(item => item.category === 'announcements').length },
    { id: 'infrastructure', name: 'Infrastructure', count: newsItems.filter(item => item.category === 'infrastructure').length },
    { id: 'environment', name: 'Environment', count: newsItems.filter(item => item.category === 'environment').length },
    { id: 'governance', name: 'Governance', count: newsItems.filter(item => item.category === 'governance').length },
    { id: 'services', name: 'Services', count: newsItems.filter(item => item.category === 'services').length },
    { id: 'technology', name: 'Technology', count: newsItems.filter(item => item.category === 'technology').length }
  ];

  const filteredNews = newsItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews = newsItems.filter(item => item.featured);
  const recentNews = newsItems.slice(0, 4);

  return (
    <Layout title="News & Updates">
      <div className="min-h-screen bg-[var(--background-dark)]">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
              <span className="text-3xl">📰</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">News & Updates</h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Stay informed about the latest developments, announcements, and events in our smart city
            </p>
          </motion.div>

          {/* Featured News */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card rounded-2xl border border-gray-700 overflow-hidden hover:scale-105 transition-transform"
                >
                  <div className="h-48 bg-gradient-to-r from-blue-900/20 to-emerald-900/20 flex items-center justify-center">
                    <div className="text-6xl">
                      {news.image === 'traffic' ? '🚗' : 
                       news.image === 'solar' ? '☀️' : 
                       news.image === 'certificate' ? '📋' : 
                       news.image === 'waste' ? '🗑️' : 
                       news.image === 'construction' ? '🏗️' : 
                       news.image === 'cybersecurity' ? '🔒' : 
                       news.image === 'bus' ? '🚌' : '📱'}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-[var(--text-secondary)] uppercase tracking-wide">
                        {news.category}
                      </span>
                      <span className="text-sm text-gray-500">{news.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{news.title}</h3>
                    <p className="text-[var(--text-secondary)] mb-4">{news.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{news.date}</span>
                      <button className="px-4 py-2 bg-[var(--card-bg)] border border-gray-700 rounded-lg text-white hover:bg-gray-800/50 transition-colors">
                        Read More
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Search news and updates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 p-3 bg-[var(--background-dark)] border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="p-3 bg-[var(--background-dark)] border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white'
                      : 'bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-gray-800/50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* News Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {filteredNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl border border-gray-700 hover:scale-105 transition-transform"
              >
                <div className="flex justify-center mb-4">
                  <div className="text-4xl">
                    {news.image === 'traffic' ? '🚗' : 
                     news.image === 'solar' ? '☀️' : 
                     news.image === 'certificate' ? '📋' : 
                     news.image === 'waste' ? '🗑️' : 
                     news.image === 'construction' ? '🏗️' : 
                     news.image === 'cybersecurity' ? '🔒' : 
                     news.image === 'bus' ? '🚌' : '📱'}
                  </div>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-[var(--text-secondary)] uppercase tracking-wide">
                    {news.category}
                  </span>
                  <span className="text-sm text-gray-500">{news.readTime}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{news.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">{news.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{news.date}</span>
                  <button className="px-3 py-1 bg-[var(--card-bg)] border border-gray-700 rounded-lg text-xs text-white hover:bg-gray-800/50 transition-colors">
                    Read More
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-xl border border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">📅</div>
                    <div>
                      <h3 className="font-bold">{event.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">{event.date}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2">
                      <span>🕐</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-sm mt-4">{event.description}</p>
                  <button className="mt-4 w-full py-2 bg-[var(--card-bg)] border border-gray-700 rounded-lg text-white hover:bg-gray-800/50 transition-colors">
                    Register Now
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-card p-8 rounded-2xl border border-gray-700 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Subscribe to our newsletter to receive the latest news, updates, and event notifications
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 p-3 bg-[var(--background-dark)] border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default News;
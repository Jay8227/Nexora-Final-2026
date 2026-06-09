import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const About = () => {
  const achievements = [
    { year: '2024', title: 'Smart City Excellence Award', description: 'Recognized for innovative urban solutions' },
    { year: '2023', title: 'Green Energy Initiative', description: 'Achieved 60% renewable energy usage' },
    { year: '2022', title: 'Digital Inclusion Program', description: 'Connected 95% of residents to high-speed internet' },
    { year: '2021', title: 'Smart Traffic Management', description: 'Reduced average commute time by 23%' }
  ];

  const goals = [
    { title: 'Sustainable Development', description: 'Achieve carbon neutrality by 2030 through green initiatives', icon: '🌱' },
    { title: 'Digital Inclusion', description: 'Ensure equal access to digital services for all residents', icon: '🌐' },
    { title: 'Economic Growth', description: 'Foster innovation and attract businesses to our city', icon: '💼' },
    { title: 'Quality of Life', description: 'Improve healthcare, education, and public spaces', icon: '🏙️' }
  ];

  const initiatives = [
    { title: 'SDG Alignment', description: 'Aligned with United Nations Sustainable Development Goals', icon: '🎯' },
    { title: 'Citizen Engagement', description: 'Active participation in city planning and governance', icon: '👥' },
    { title: 'Innovation Labs', description: 'Partnerships with universities and tech companies', icon: '🔬' },
    { title: 'Smart Infrastructure', description: 'Next-generation infrastructure for future growth', icon: '🏗️' }
  ];

  return (
    <Layout title="About Smart City">
      <div className="min-h-screen bg-[var(--background-dark)]">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-full mb-6">
              <span className="text-4xl">🏙️</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">About Our Smart City</h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Building a sustainable, connected, and citizen-centric urban environment for the future
            </p>
          </motion.div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 rounded-2xl border border-gray-700"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                To create a thriving, sustainable, and technologically advanced urban environment where citizens enjoy 
                improved quality of life, businesses flourish, and environmental stewardship is paramount. We envision 
                a city where technology seamlessly integrates with daily life to enhance efficiency, sustainability, 
                and citizen engagement.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 rounded-2xl border border-gray-700"
            >
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                To leverage cutting-edge technology, data analytics, and citizen collaboration to transform urban 
                living. We are committed to creating an inclusive, efficient, and environmentally responsible 
                city that serves as a model for sustainable urban development worldwide.
              </p>
            </motion.div>
          </div>

          {/* Government Initiatives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Government Initiatives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {initiatives.map((initiative, index) => (
                <motion.div
                  key={initiative.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-xl border border-gray-700 text-center"
                >
                  <div className="text-3xl mb-4">{initiative.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{initiative.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{initiative.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Smart City Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Smart City Goals (SDG Aligned)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {goals.map((goal, index) => (
                <motion.div
                  key={goal.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-xl border border-gray-700 flex items-start gap-4"
                >
                  <div className="text-3xl">{goal.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{goal.title}</h3>
                    <p className="text-[var(--text-secondary)]">{goal.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements & Awards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Achievements & Awards</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-emerald-500"></div>
              <div className="space-y-8">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative glass-card p-6 rounded-xl border border-gray-700 ${
                      index % 2 === 0 ? 'ml-0 mr-1/2 md:ml-1/2 md:mr-0' : 'ml-1/2 mr-0 md:ml-0 md:mr-1/2'
                    }`}
                  >
                    <div className="absolute -left-4 md:left-auto md:-right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full flex items-center justify-center text-white text-sm">
                      {achievement.year}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                    <p className="text-[var(--text-secondary)]">{achievement.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Our Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 rounded-2xl border border-gray-700 mb-16"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Dr. Sarah Johnson', role: 'Mayor', expertise: 'Urban Planning' },
                { name: 'Michael Chen', role: 'CTO', expertise: 'Technology Innovation' },
                { name: 'Emma Rodriguez', role: 'Director of Sustainability', expertise: 'Environmental Policy' },
                { name: 'James Wilson', role: 'Chief Data Officer', expertise: 'Data Analytics' }
              ].map((member, index) => (
                <div key={member.name} className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                    👨‍💼
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{member.role}</p>
                  <p className="text-xs text-gray-500">{member.expertise}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <h3 className="text-2xl font-semibold mb-4">Join Our Smart City Journey</h3>
            <p className="text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
              Be part of building the future of urban living. Participate in city initiatives and contribute to our vision
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity">
                Become a Volunteer
              </button>
              <button className="px-8 py-3 bg-[var(--card-bg)] border border-gray-700 rounded-xl font-semibold text-white hover:bg-gray-800/50 transition-colors">
                Partner with Us
              </button>
              <button className="px-8 py-3 bg-[var(--card-bg)] border border-gray-700 rounded-xl font-semibold text-white hover:bg-gray-800/50 transition-colors">
                Attend Meetings
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
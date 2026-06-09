import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Home = () => {
  return (
    <Layout title="Home">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-block mb-4">
              <span className="text-2xl font-semibold text-[var(--primary-color)]">+</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[var(--text-primary)] tracking-tight">
              Where Cities Grow
            </h1>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              A programmable, AI-driven smart city platform built for Navi Mumbai — predicting problems, automating decisions, and keeping every citizen in the loop.
            </p>
            <Link href="/dashboard">
              <button className="px-8 py-4 bg-[#1a1a1a] text-white rounded-full font-medium hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Try it now
              </button>
            </Link>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-16 w-full max-w-6xl mx-auto rounded-[40px] overflow-hidden shadow-2xl relative h-[400px] md:h-[600px] bg-gradient-to-r from-[#d9d4f0] to-[#e4e0f6]"
          >
            <img
              src="/hero_background.png"
              alt="Nexora 3D Landscape"
              className="w-full h-full object-cover float-gentle"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop";
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* What is Nexora Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-[var(--text-primary)]">
                What is Nexora?
              </h2>
              <Link href="/about">
                <button className="px-8 py-3.5 bg-[#3b2a5a] text-white rounded-full font-medium hover:bg-opacity-90 transition-all glow-button">
                  Explore now
                </button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed font-light">
                NEXORA is the intelligence layer Navi Mumbai's infrastructure was always missing. It doesn't just show data — it predicts problems 30–45 minutes before they form, takes autonomous action, and keeps every citizen informed in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Features Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[500px]">
            {/* Large Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-[#e9e6fa] rounded-[32px] p-10 flex flex-col justify-between relative overflow-hidden h-full"
            >
              <div className="z-10 w-2/3">
                <h3 className="text-3xl font-bold text-[#3b2a5a] mb-4">Cities that grow</h3>
                <p className="text-[#5a4b7a] leading-relaxed">
                  Enhance urban living as Navi Mumbai's infrastructure is deployed into high-performing autonomous protocols — directly benefiting 1.2 million citizens.
                </p>
              </div>
              <img
                src="/card_feature.png"
                alt="Feature 3D"
                className="absolute bottom-[-10%] right-[-10%] w-[60%] object-contain"
                onError={(e) => e.target.style.display = 'none'}
              />
            </motion.div>

            {/* Small Cards Column */}
            <div className="grid grid-rows-2 gap-6 h-full">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-[#2a2542] rounded-[32px] p-10 flex flex-col justify-center"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Always connected,<br/>always stable</h3>
                <p className="text-gray-300 font-light">
                  Live IoT data from Vashi to Ulwe — every zone visible, every alert instant, zero delays.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-[#2a2542] rounded-[32px] p-10 flex flex-col justify-center"
              >
                <h3 className="text-2xl font-bold text-white mb-4">100%<br/>autonomous</h3>
                <p className="text-gray-300 font-light">
                  From signal timing to flood pump activation — NEXORA acts before humans even see the problem.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Partners Section — replaces fake logos */}
      <section className="py-20 border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-widest mb-2">
              Designed for Integration With
            </p>
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
              Navi Mumbai's Core Infrastructure
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col items-center p-8 rounded-[24px] bg-[#f5f3ff] border border-[#e0d9f7]"
            >
              <div className="text-4xl mb-4">🏛️</div>
              <h4 className="text-lg font-bold text-[#3b2a5a] mb-2">NMMC</h4>
              <p className="text-sm text-center text-[#5a4b7a]">
                Navi Mumbai Municipal Corporation — grievance routing, ward-level alerts, infrastructure monitoring
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col items-center p-8 rounded-[24px] bg-[#f5f3ff] border border-[#e0d9f7]"
            >
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="text-lg font-bold text-[#3b2a5a] mb-2">MSEDCL</h4>
              <p className="text-sm text-center text-[#5a4b7a]">
                Maharashtra State Electricity Distribution — power grid load monitoring, demand prediction, outage alerts
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col items-center p-8 rounded-[24px] bg-[#f5f3ff] border border-[#e0d9f7]"
            >
              <div className="text-4xl mb-4">🌧️</div>
              <h4 className="text-lg font-bold text-[#3b2a5a] mb-2">IMD</h4>
              <p className="text-sm text-center text-[#5a4b7a]">
                India Meteorological Department — live rainfall API feeds for 6–12 hour monsoon flood prediction
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Numbers Section */}
      <section className="py-24 bg-[#f9f9fb]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <div className="text-sm font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wider">
              NEXORA in Numbers
            </div>
            <h2 className="text-4xl font-bold mb-4 text-[var(--text-primary)]">
              Real impact. Real Navi Mumbai.
            </h2>
            <p className="text-[var(--text-secondary)] font-light max-w-2xl mx-auto">
              Every number below is grounded in a real problem that happens in this city, every day.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { stat: '30–45 min', label: 'Traffic jam predicted before it forms', icon: '🚦', color: 'from-blue-500 to-cyan-500' },
              { stat: '6–12 hrs', label: 'Advance flood warning for Taloja & Kharghar', icon: '🌊', color: 'from-cyan-500 to-blue-600' },
              { stat: '18 → 9 min', label: 'Ambulance response time via signal clearing', icon: '🚑', color: 'from-red-500 to-orange-500' },
              { stat: '500 → 1', label: 'Duplicate complaint reports clustered by AI', icon: '🗣️', color: 'from-purple-500 to-violet-500' },
              { stat: 'Day 7', label: 'Auto-escalation if complaint goes unresolved', icon: '⚖️', color: 'from-emerald-500 to-teal-500' },
              { stat: '100%', label: 'Every decision logged, timestamped, public', icon: '🔍', color: 'from-amber-500 to-orange-500' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-50"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl mb-4`}>
                  {item.icon}
                </div>
                <div className="text-3xl font-bold text-[var(--text-primary)] mb-2">{item.stat}</div>
                <p className="text-sm text-[var(--text-secondary)] font-light">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Four Problems section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-14">
            <div className="text-sm font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wider">
              One Platform · Four Problems
            </div>
            <h2 className="text-4xl font-bold text-[var(--text-primary)]">
              What NEXORA solves in Navi Mumbai
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: '🚦',
                title: 'Traffic Congestion',
                route: '/decision-engine',
                desc: 'Palm Beach Road and Sion-Panvel Highway jam every evening. NEXORA predicts it 30–45 min early and auto-adjusts signals across Vashi, Nerul, and Belapur.',
                cta: 'See AI Engine →',
              },
              {
                icon: '🌊',
                title: 'Monsoon Flooding',
                route: '/digital-twin',
                desc: 'Every June–September, Taloja MIDC and Kharghar Valley flood. NEXORA pulls IMD rainfall data and flags zones 6–12 hours before water rises.',
                cta: 'See Digital Twin →',
              },
              {
                icon: '🚑',
                title: 'Emergency Response',
                route: '/safety',
                desc: 'Ambulance from MGM Hospital to Sion-Panvel accident: 18 min stuck in traffic. NEXORA clears every signal on the route. Now under 10 min.',
                cta: 'See Safety →',
              },
              {
                icon: '🗣️',
                title: 'Citizen Complaints',
                route: '/governance',
                desc: '"Broken benches in Kharghar school." NEXORA classifies it, assigns it (Education + PWD), tags Zone 4, and escalates automatically if ignored.',
                cta: 'File Grievance →',
              },
            ].map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-[#f9f8ff] rounded-[28px] p-8 border border-[#ede9fa]"
              >
                <div className="text-4xl mb-4">{problem.icon}</div>
                <h3 className="text-2xl font-bold text-[#3b2a5a] mb-3">{problem.title}</h3>
                <p className="text-[#5a4b7a] font-light leading-relaxed mb-6">{problem.desc}</p>
                <Link href={problem.route} className="text-[var(--primary-color)] font-semibold hover:underline">
                  {problem.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* One-liner CTA */}
      <section className="py-20 bg-[#2a2542] text-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-2xl md:text-3xl font-light leading-relaxed italic text-gray-200">
            "We built the intelligence layer that Navi Mumbai's infrastructure was always missing — so the city stops reacting to problems and starts preventing them."
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/digital-twin">
              <button className="px-8 py-4 bg-white text-[#2a2542] rounded-full font-semibold hover:bg-gray-100 transition-all">
                See Digital Twin
              </button>
            </Link>
            <Link href="/governance">
              <button className="px-8 py-4 border border-white/40 text-white rounded-full font-semibold hover:bg-white/10 transition-all">
                File a Grievance
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
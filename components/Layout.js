import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import NexoraBotWidget from './NexoraBotWidget';

const Layout = ({ children, title = "NEXORA - Navi Mumbai" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Home',        href: '/' },
    { name: 'Dashboard',   href: '/dashboard' },
    { name: 'Digital Twin',href: '/digital-twin' },
    { name: 'AI Engine',   href: '/decision-engine' },
    { name: 'Grievance',   href: '/governance' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background-light)] text-[var(--text-primary)] font-sans">
      <Head>
        <title>{`${title} | NEXORA Smart City`}</title>
        <meta name="description" content="NEXORA — AI-powered Smart City Platform for Navi Mumbai" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 transition-all">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="text-2xl font-bold text-[var(--primary-color)]">
                + Nexora
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center text-sm font-medium text-gray-600">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className="hover:text-[var(--primary-color)] transition-colors cursor-pointer">
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>

            {/* CTA and Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <button className="hidden md:block px-6 py-2.5 bg-[var(--primary-color)] text-white rounded-full text-sm font-medium hover:bg-opacity-90 transition-all glow-button">
                  Open Dashboard
                </button>
              </Link>
              <button
                className="md:hidden text-gray-800 focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="md:hidden mt-4 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col p-4 space-y-2">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <span
                      className="block px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium transition-all cursor-pointer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
                <Link href="/dashboard">
                  <span className="block mt-4 px-4 py-3 bg-[var(--primary-color)] text-white text-center rounded-lg font-medium">
                    Open Dashboard
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="text-2xl font-bold text-[var(--primary-color)] mb-4">
                + Nexora
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                The intelligence layer Navi Mumbai's infrastructure was always missing.
              </p>
              <div className="mt-4 text-xs text-gray-400">
                Built for NMMC · MSEDCL · IMD
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-[var(--primary-color)]">Home</Link></li>
                <li><Link href="/dashboard" className="hover:text-[var(--primary-color)]">Dashboard</Link></li>
                <li><Link href="/digital-twin" className="hover:text-[var(--primary-color)]">Digital Twin</Link></li>
                <li><Link href="/decision-engine" className="hover:text-[var(--primary-color)]">AI Engine</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">City Services</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><Link href="/governance" className="hover:text-[var(--primary-color)]">Grievance Portal</Link></li>
                <li><Link href="/safety" className="hover:text-[var(--primary-color)]">Emergency Response</Link></li>
                <li><Link href="/chatbot" className="hover:text-[var(--primary-color)]">CityBot</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Emergency</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex items-center gap-2">🚨 <span>Police: <strong>100</strong></span></li>
                <li className="flex items-center gap-2">🚑 <span>Ambulance: <strong>108</strong></span></li>
                <li className="flex items-center gap-2">🔥 <span>Fire: <strong>101</strong></span></li>
                <li className="flex items-center gap-2">🏘️ <span>NMMC: <strong>1800-22-6870</strong></span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} NEXORA Smart City Platform · Navi Mumbai, Maharashtra · Built for Smart City Hackathon</p>
          </div>
        </div>
      </footer>

      {/* Floating CityBot Widget */}
      <NexoraBotWidget />
    </div>
  );
};

export default Layout;
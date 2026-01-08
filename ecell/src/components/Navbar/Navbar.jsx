import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/team', label: 'Team' },
    { path: '/startups', label: 'Startups' },
    { path: '/events', label: 'Events' },
    { path: '/contact', label: 'Contact' },
    { path: '/recruitments', label: 'Join Now' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
        ? 'bg-black/70 backdrop-blur-xl border-b border-green-500/30 py-4 shadow-[0_4px_30px_rgba(34,197,94,0.1)]'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold text-white font-display tracking-tight group-hover:-translate-y-0.5 transition-transform duration-300">
            e-cell
          </span>
          <span className="text-sm font-medium text-green-500 font-display tracking-widest uppercase group-hover:-translate-y-0.5 transition-transform duration-300">
            SRMIST
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm font-medium transition-colors duration-300 font-sans tracking-wide uppercase ${location.pathname === link.path ? 'text-green-500' : 'text-neutral-400 hover:text-white'
                }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 w-full h-[1px] bg-green-500"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 z-50 relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }}
            className="w-6 h-0.5 bg-white origin-center"
          />
          <motion.span
            animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
            className="w-6 h-0.5 bg-white"
          />
          <motion.span
            animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -8 : 0 }}
            className="w-6 h-0.5 bg-white origin-center"
          />
        </button>

        {/* Mobile Menu Overlay - Portaled to body */}
        {typeof document !== 'undefined' && createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 h-[100dvh] bg-black/95 backdrop-blur-xl z-[45] flex flex-col items-center justify-center gap-8 md:hidden"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-2xl font-display font-bold tracking-tight ${location.pathname === link.path ? 'text-green-500' : 'text-white'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
    </nav>
  );
};

export default Navbar;

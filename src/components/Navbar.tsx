'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active section based on scroll position
      const sections = ['home', 'services', 'mission', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#mission' },
    { name: 'Contact', href: '#contact', isButton: true }
  ];

  const handleInPageNav = (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      event.preventDefault();
      const targetId = href.slice(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-dark/90 backdrop-blur-md py-3 shadow-lg shadow-black/20' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto pr-4 md:pr-8 pl-0 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="relative w-40 h-10 md:w-52 md:h-14">
            <Image 
              src="/images/nav_logo.png"
              alt="Qwantifai Logo"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            item.isButton ? (
              <Link 
                key={item.name}
                href={item.href}
                onClick={handleInPageNav(item.href)}
                className="btn btn-primary"
              >
                {item.name}
              </Link>
            ) : (
              <Link 
                key={item.name}
                href={item.href}
                onClick={handleInPageNav(item.href)}
                className={`relative animated-border px-2 py-1 ${
                  activeSection === item.href.replace('#', '') 
                    ? 'text-primary' 
                    : 'text-light hover:text-primary'
                } transition-colors`}
              >
                {item.name}
                {activeSection === item.href.replace('#', '') && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            )
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-light focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.svg
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.3 }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </motion.svg>
              )}
            </AnimatePresence>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark/95 backdrop-blur-md border-t border-gray-800"
          >
            <div className="container mx-auto pr-4 md:pr-8 pl-0 py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href}
                  onClick={handleInPageNav(item.href)}
                  className={item.isButton 
                    ? "btn btn-primary text-center" 
                    : `text-light hover:text-primary transition-colors py-2 ${
                        activeSection === item.href.replace('#', '') ? 'text-primary font-semibold' : ''
                      }`
                  }
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar; 
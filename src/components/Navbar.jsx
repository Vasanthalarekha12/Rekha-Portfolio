import { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Code2, Moon, Sun, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '#home' },
  { name: 'About', path: '#about' },
  { name: 'Projects', path: '#projects' },
  { name: 'Skills', path: '#skills' },
  { name: 'Certifications', path: '#certifications' },
  { name: 'Contact', path: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { hash, pathname } = useLocation();
  const navigate = useNavigate();
  
  // Theme state
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    const sections = ['home', 'about', 'projects', 'skills', 'certifications', 'contact'];
    // Delay slightly to ensure DOM is ready
    setTimeout(() => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
    }, 100);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e, path) => {
    e.preventDefault();
    const id = path.replace('#', '');
    setActiveSection(id);
    if (pathname !== '/') {
      navigate(`/${path}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      navigate(path, { replace: true });
    }
    setIsOpen(false);
  };


  return (
    <nav 
      className={`fixed top-0 md:top-4 left-0 md:left-1/2 md:-translate-x-1/2 w-full md:w-[95%] max-w-5xl z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'md:w-[90%] max-w-4xl' : ''
      }`}
    >
      <div 
        className={`bg-[var(--surface)]/70 backdrop-blur-xl border border-[var(--border-color-light)] shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out overflow-hidden ${
          scrolled ? 'md:rounded-[1.25rem]' : 'md:rounded-2xl'
        }`}
      >
        <div 
          className={`flex justify-between items-center px-4 md:px-5 transition-all duration-300 ${
            scrolled ? 'h-[var(--header-height-scrolled)] md:h-[58px]' : 'h-[var(--header-height-mobile)] md:h-[var(--header-height)]'
          }`}
        >
          
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <NavLink to="/" className="flex items-center gap-1.5 group" onClick={(e) => handleNavClick(e, '#home')}>
              <BrainCircuit className="w-5 h-5 text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300" />
              <span className="font-serif italic font-bold text-[15px] md:text-[16px] tracking-tight text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors" style={{ fontFamily: '"Playfair Display", serif' }}>
                Rekha Rani
              </span>
            </NavLink>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-0.5 ml-auto mr-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.path.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`relative px-3.5 py-1.5 rounded-full text-[14px] font-medium transition-colors duration-300 ${
                    isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[var(--color-accent)]/10 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button onClick={toggleTheme} className="p-1.5 rounded-full border border-[var(--border-color-light)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/5 transition-all">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <NavLink 
              to="/contact" 
              className="px-5 py-1.5 rounded-full bg-[var(--color-accent)] text-white font-semibold text-[13px] hover:bg-[var(--color-accent)] hover:shadow-[0_0_15px_rgba(255,122,0,0.3)] transition-all duration-300"
            >
              Hire Me
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={toggleTheme} className="p-1.5 rounded-full border border-[var(--border-color-light)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--color-surface)]/95 backdrop-blur-xl border-t border-[var(--border-color-light)]"
          >
            <div className="px-5 pt-3 pb-6 space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.path.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className={`block px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-colors ${
                      isActive
                        ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                        : 'text-[var(--color-text-muted)] hover:bg-[var(--border-color-light)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="pt-4 mt-2 border-t border-[var(--border-color-light)]">
                <NavLink 
                  to="/contact" 
                  className="block w-full py-3 text-center rounded-xl bg-[var(--color-accent)] text-white font-semibold text-[15px] hover:bg-[var(--color-accent)] transition-colors shadow-md"
                >
                  Hire Me
                </NavLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

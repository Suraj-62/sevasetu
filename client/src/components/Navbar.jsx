import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Marketplace', path: '/store' },
    { name: 'Become a Partner', path: '/register' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group z-50">
            <div className="w-10 h-10 bg-[#0F766E] rounded-xl flex items-center justify-center shadow-lg shadow-[#0F766E]/20 group-hover:scale-105 transition-transform">
              <Shield className="text-white" size={22} />
            </div>
            <span className="font-black text-2xl tracking-tight text-slate-900">Seva<span className="text-[#0F766E]">Setu</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-[15px] font-bold transition-colors ${
                  isActive(link.path) ? 'text-[#0F766E]' : 'text-slate-600 hover:text-[#0F766E]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/login"
              className="text-[15px] font-bold text-slate-700 hover:text-[#0F766E] transition-colors px-4 py-2"
            >
              Login
            </Link>
            <Link 
              to="/register"
              className="bg-[#0F766E] hover:bg-[#115E59] text-white text-[15px] font-bold px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50 p-2 text-slate-600 hover:text-[#0F766E] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl md:hidden overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-bold ${
                    isActive(link.path) ? 'text-[#0F766E]' : 'text-slate-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px w-full bg-slate-100 my-2"></div>
              <div className="flex flex-col gap-4">
                <Link 
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center text-lg font-bold text-slate-700 hover:text-[#0F766E] transition-colors py-3 bg-slate-50 rounded-xl"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center bg-[#0F766E] hover:bg-[#115E59] text-white text-lg font-bold py-3 rounded-xl shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

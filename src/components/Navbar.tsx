import { motion } from 'motion/react';
import { Menu, X, Terminal, User, LogOut, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { useTheme } from '../lib/ThemeContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldBeSolid = isScrolled || !isHomePage;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/#about' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('/#') && location.pathname === '/') {
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 border-b ${
        shouldBeSolid 
          ? 'bg-white/80 dark:bg-black/60 backdrop-blur-2xl border-black/10 dark:border-white/10 py-4' 
          : 'bg-transparent border-transparent py-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        <Link to="/" className="text-2xl font-black tracking-[0.2em] flex items-center gap-3 group shrink-0">
          <div className="relative w-10 h-10 flex items-center justify-center">
             <div className="absolute inset-0 bg-orange-600 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-500" />
             <Terminal className="relative z-10 w-5 h-5 text-white" />
          </div>
          <span className="text-neutral-900 dark:text-white hidden sm:block uppercase font-black">LUMINA</span>
        </Link>

        {/* Desktop Nav - Centered */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              onClick={() => handleLinkClick(link.href)}
              className="text-neutral-500 dark:text-white/40 hover:text-orange-500 transition-all text-[10px] font-bold uppercase tracking-[0.3em] relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-orange-500 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6">
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-6">
                <Link 
                  to={user.role === 'ADMIN' ? '/admin' : '/dashboard'}
                  className="text-white dark:text-black text-[10px] font-black uppercase tracking-[0.3em] bg-black dark:bg-white px-4 py-2 rounded-xl hover:opacity-90 transition-all flex items-center gap-2"
                >
                  <User className="w-3 h-3" />
                  Dashboard
                </Link>
                <button 
                  onClick={logout}
                  className="text-neutral-500 hover:text-red-500 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/auth/login"
                  className="text-neutral-400 dark:text-white/40 hover:text-orange-500 transition-all text-[10px] font-bold uppercase tracking-[0.3em]"
                >
                  Sign In
                </Link>
                <Link 
                  to="/auth/signup"
                  className="px-6 py-2 rounded-xl bg-orange-600 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle & Theme Toggle (Mobile) */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/10 text-neutral-900 dark:text-white"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button 
              className="text-neutral-900 dark:text-white w-10 h-10 flex items-center justify-center p-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed inset-0 bg-white dark:bg-[#050505] z-50 p-12 flex flex-col gap-8 md:hidden"
        >
          <div className="flex justify-between items-center mb-12">
             <span className="text-sm font-black tracking-widest text-orange-500">NAVIGATION</span>
             <button onClick={() => setIsMobileMenuOpen(false)} className="text-neutral-900 dark:text-white"><X /></button>
          </div>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              className="text-4xl font-black text-neutral-400 dark:text-white/40 hover:text-orange-500 dark:hover:text-white transition-all uppercase tracking-tighter"
              onClick={() => handleLinkClick(link.href)}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="mt-auto space-y-4">
            {user ? (
              <Link 
                to={user.role === 'ADMIN' ? '/admin' : '/dashboard'}
                className="w-full py-6 bg-black dark:bg-white text-white dark:text-black rounded-3xl text-center font-black uppercase tracking-widest text-sm block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Access Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  to="/auth/login"
                  className="w-full py-6 bg-black/5 dark:bg-white/5 text-neutral-900 dark:text-white rounded-3xl text-center font-black uppercase tracking-widest text-sm block border border-black/10 dark:border-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/auth/signup"
                  className="w-full py-6 bg-orange-600 text-white rounded-3xl text-center font-black uppercase tracking-widest text-sm block shadow-2xl shadow-orange-600/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}

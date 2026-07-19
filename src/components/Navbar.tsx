import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useScroll, useMotionValueEvent, motion } from 'framer-motion';
import { Code, Menu, X, Moon, Sun } from 'lucide-react';
import clsx from 'clsx';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/projects' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={clsx(
      "fixed top-0 w-full z-50 transition-all duration-300 px-4 py-3 md:py-4",
      isScrolled 
        ? "bg-bg-glass dark:bg-bg-darkGlass backdrop-blur-md border-b border-border-glass dark:border-border-darkGlass shadow-sm" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto max-w-6xl flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-extrabold flex items-center gap-2 text-text-main dark:text-text-darkMain">
          <Code className="text-primary" />
          <span className="text-gradient tracking-tight">FARAJ.DEV</span>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            {links.map(link => (
              <NavLink 
                key={link.path} 
                to={link.path}
                className={({ isActive }) => clsx(
                  "font-medium px-4 py-2 rounded-lg transition-colors duration-300",
                  isActive 
                    ? "text-primary bg-blue-600/10 dark:bg-blue-400/10" 
                    : "text-text-muted dark:text-text-darkMuted hover:text-primary hover:bg-blue-600/5 dark:hover:bg-blue-400/5"
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-bg-glass dark:bg-bg-darkGlass border border-border-glass dark:border-border-darkGlass text-text-main dark:text-text-darkMain hover:scale-110 hover:shadow-[0_0_15px_var(--primary-color)] transition-all duration-300"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-bg-glass dark:bg-bg-darkGlass border border-border-glass dark:border-border-darkGlass text-text-main dark:text-text-darkMain"
          >
            {theme === 'dark' ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-text-main dark:text-text-darkMain">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 w-full p-4"
        >
          <div className="glass-panel p-4 flex flex-col gap-2">
            {links.map(link => (
              <NavLink 
                key={link.path} 
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => clsx(
                  "font-medium p-3 rounded-lg text-center transition-colors duration-300 block",
                  isActive 
                    ? "bg-primary text-white" 
                    : "text-text-main dark:text-text-darkMain hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}

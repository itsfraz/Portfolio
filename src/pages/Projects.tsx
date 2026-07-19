import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Hotel, CheckCircle, BookOpen, Box, Dice5, Shield, Gamepad2 } from 'lucide-react';
import { FaHorse as Horse } from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';
import ProjectCard from '../components/ProjectCard';
import clsx from 'clsx';
import { PROJECTS as rawProjects } from '../data/portfolioData';

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users size={48} className="text-white/80" />,
  Hotel: <Hotel size={48} className="text-white" />,
  CheckCircle: <CheckCircle size={48} className="text-white" />,
  BookOpen: <BookOpen size={48} className="text-white" />,
  Box: <Box size={48} className="text-white" />,
  Dice5: <Dice5 size={48} className="text-white" />,
  Shield: <Shield size={48} className="text-white" />,
  Horse: <Horse size={48} className="text-white" />,
  Gamepad2: <Gamepad2 size={48} className="text-gray-900" />,
};

const PROJECTS = rawProjects.map(p => ({
  ...p,
  icon: iconMap[p.iconName] || <Box size={48} className="text-white" />
}));

const FILTERS = ['All', 'React', 'JavaScript', 'FullStack', 'Animation'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = PROJECTS.filter(project => 
    activeFilter === 'All' ? true : project.tags.includes(activeFilter)
  );

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <AnimatedSection className="text-center mb-12">
        <h2 className="text-4xl font-extrabold relative inline-block mb-4 after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary after:rounded-full">
          Selected Works
        </h2>
        <p className="text-lg text-text-muted dark:text-text-darkMuted mt-4">A collection of applications, experiments, and tools.</p>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="flex justify-center flex-wrap gap-3 mb-12">
        {FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={clsx(
              "px-6 py-2 rounded-full font-semibold transition-all duration-300",
              activeFilter === filter 
                ? "bg-primary text-white shadow-lg shadow-primary/30" 
                : "bg-bg-glass dark:bg-bg-darkGlass border border-border-glass text-text-muted dark:text-text-darkMuted hover:border-primary hover:text-primary"
            )}
          >
            {filter}
          </button>
        ))}
      </AnimatedSection>

      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

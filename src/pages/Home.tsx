import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Layers, Zap, Layout } from 'lucide-react';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import TechMarquee from '../components/TechMarquee';
import GlassCard from '../components/ui/GlassCard';
import SkillBar from '../components/ui/SkillBar';

import Hero3D from '../components/Hero3D';

export default function Home() {
  return (
    <div>
      <section className="min-h-[90vh] flex flex-col justify-center items-center pt-20 relative overflow-hidden text-center">
        {/* 3D background */}
        <Hero3D />
        
        <div className="z-10 max-w-4xl px-4 relative mt-10">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-48 h-48 mx-auto mb-8 rounded-full p-1.5 relative"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary blur-xl opacity-50 animate-pulse-glow -z-10"></div>
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary p-1">
               <img src="/Resource/profile.jpg" alt="Mohd Faraj Ansari" className="w-full h-full object-cover rounded-full border-4 border-bg-body dark:border-bg-dark" />
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Hi, I'm <span className="text-gradient">Mohd Faraj Ansari</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl font-bold text-primary mb-6 h-12"
          >
            <TypeAnimation
              sequence={[
                'Full Stack Developer', 2000,
                'UI/UX Designer', 2000,
                'Problem Solver', 2000,
                'Tech Enthusiast', 2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-text-muted dark:text-text-darkMuted mb-10 max-w-2xl mx-auto"
          >
            Building digital products, brands, and experiences. Dedicated to crafting <strong>accessible</strong>, <strong>pixel-perfect</strong> web applications.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/projects" className="btn btn-primary flex items-center gap-2">
              <i className="fas fa-rocket"></i> View My Work
            </Link>
            <Link to="/contact" className="btn btn-glass flex items-center gap-2">
              <i className="fas fa-paper-plane"></i> Let's Talk
            </Link>
          </motion.div>
        </div>
      </section>

      <TechMarquee />

      <section className="container mx-auto max-w-6xl px-4 py-20" id="about">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-extrabold relative inline-block mb-4 after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary after:rounded-full">
            What I Bring to the Table
          </h2>
          <p className="text-lg text-text-muted dark:text-text-darkMuted mt-4">More than just code. I provide solutions.</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          <AnimatedSection delay={0.1}>
            <GlassCard interactive className="text-center h-full">
              <Layers size={48} className="mx-auto text-primary mb-6" />
              <h4 className="text-xl font-bold mb-4">Full Stack Architecture</h4>
              <p className="text-text-muted dark:text-text-darkMuted">From database design to frontend responsiveness, I handle the entire development lifecycle with precision.</p>
            </GlassCard>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <GlassCard interactive className="text-center h-full">
              <Layout size={48} className="mx-auto text-secondary mb-6" />
              <h4 className="text-xl font-bold mb-4">UI/UX Centric</h4>
              <p className="text-text-muted dark:text-text-darkMuted">I don't just build features; I craft experiences. Creating intuitive and beautiful interfaces is my passion.</p>
            </GlassCard>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <GlassCard interactive className="text-center h-full">
              <Zap size={48} className="mx-auto text-accent mb-6" />
              <h4 className="text-xl font-bold mb-4">Performance First</h4>
              <p className="text-text-muted dark:text-text-darkMuted">Fast load times and smooth interactions are non-negotiable. I optimize every line of code for speed.</p>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-20" id="skills">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <AnimatedSection direction="right" className="lg:col-span-5">
            <h2 className="text-4xl font-extrabold mb-6">Programming<br/> & Toolset</h2>
            <p className="text-lg text-text-muted dark:text-text-darkMuted mb-8">
              I specialize in building scalable, real-time applications using the <span className="text-gradient">MERN Stack</span>. My code is clean, modular, and optimized for performance.
            </p>
            <Link to="/resume" className="btn btn-glass inline-flex items-center gap-2">
              Download CV <i className="fas fa-arrow-right"></i>
            </Link>
          </AnimatedSection>
          
          <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
            <AnimatedSection delay={0.1}>
              <GlassCard className="h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/10 text-primary border border-primary/20 text-3xl">
                    <FaReact />
                  </div>
                  <h4 className="text-xl font-bold">Frontend</h4>
                </div>
                <div>
                  <SkillBar name="React / Redux" percentage={65} />
                  <SkillBar name="HTML5 / CSS3" percentage={90} />
                  <SkillBar name="Tailwind / Bootstrap" percentage={85} />
                </div>
              </GlassCard>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <GlassCard className="h-full">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/10 text-primary border border-primary/20 text-3xl">
                    <FaNodeJs />
                  </div>
                  <h4 className="text-xl font-bold">Backend</h4>
                </div>
                <div>
                  <SkillBar name="Node.js / Express" percentage={50} />
                  <SkillBar name="MongoDB / SQL" percentage={60} />
                  <SkillBar name="REST APIs" percentage={95} />
                </div>
              </GlassCard>
            </AnimatedSection>
          </div>
        </div>

        <AnimatedSection delay={0.3} className="mt-12 text-center">
          <div className="glass-panel py-6 px-4">
            <span className="text-text-muted dark:text-text-darkMuted font-bold uppercase tracking-wider mr-4">Also Proficient In:</span>
            <div className="inline-flex flex-wrap justify-center items-center gap-4 mt-4 md:mt-0">
              {['Git & GitHub', 'AWS (Basic)', 'Docker', 'Figma', 'VS Code', 'Postman'].map(tool => (
                <span key={tool} className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-border-glass text-sm font-medium">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      <AnimatedSection className="py-20 text-center">
        <h2 className="text-4xl font-extrabold relative inline-block mb-4 after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary after:rounded-full">
          Recent Work
        </h2>
        <p className="text-lg text-text-muted dark:text-text-darkMuted mt-8 mb-8 max-w-xl mx-auto">Explore my detailed case studies and live demos.</p>
        <Link to="/projects" className="btn btn-primary">Check Out Portfolio</Link>
      </AnimatedSection>
    </div>
  );
}

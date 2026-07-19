import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Download, Cpu, Star, Calendar, MapPin, User, Mail, Phone, Globe } from 'lucide-react';
import { FaLinkedin as Linkedin, FaGithub as Github } from 'react-icons/fa';
import { PDFDownloadLink } from '@react-pdf/renderer';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/ui/GlassCard';
import SkillBar from '../components/ui/SkillBar';
import ResumePDF from '../components/ResumePDF';
import { PROFILE, EXPERIENCE, EDUCATION, SKILLS } from '../data/portfolioData';

interface TimelineItemProps {
  title: string;
  subtitle: string;
  duration: string;
  location: string;
  description?: string[];
  skills?: string[];
}

function TimelineItem({ title, subtitle, duration, location, description, skills }: TimelineItemProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Connector Line */}
      <div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent" />
      
      {/* Timeline Dot */}
      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-bg-body dark:bg-bg-dark border-4 border-primary flex items-center justify-center shadow-[0_0_10px_var(--primary-color)] transition-all duration-300 hover:scale-125" />

      {/* Content */}
      <GlassCard className="p-6 relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
        <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
          <div>
            <h4 className="text-xl font-bold text-text-main dark:text-text-darkMain group-hover:text-primary transition-colors">{title}</h4>
            <span className="text-md font-semibold text-primary/80 dark:text-secondary">{subtitle}</span>
          </div>
          <div className="flex flex-col items-end text-xs text-text-muted dark:text-text-darkMuted font-medium">
            <span className="flex items-center gap-1"><Calendar size={13} /> {duration}</span>
            <span className="flex items-center gap-1 mt-1"><MapPin size={13} /> {location}</span>
          </div>
        </div>

        {description && (
          <ul className="list-disc list-inside space-y-1.5 text-sm text-text-muted dark:text-text-darkMuted mb-4">
            {description.map((item, idx) => (
              <li key={idx} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        )}

        {skills && (
          <div className="flex flex-wrap gap-1.5">
            {skills.map(skill => (
              <span key={skill} className="text-xs px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 border border-border-glass text-text-muted dark:text-text-darkMuted">
                {skill}
              </span>
            ))}
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}

export default function Resume() {
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills'>('personal');

  const experienceData: TimelineItemProps[] = EXPERIENCE.map(exp => ({
    title: exp.title,
    subtitle: exp.company,
    duration: exp.duration,
    location: exp.location,
    description: exp.description,
    skills: exp.skills
  }));

  const educationData: TimelineItemProps[] = EDUCATION.map(edu => ({
    title: edu.degree,
    subtitle: edu.institution,
    duration: edu.duration,
    location: edu.location,
    description: edu.description,
    skills: edu.skills
  }));

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 print:py-0 print:max-w-full">
      {/* Header Info */}
      <AnimatedSection className="text-center mb-12 print:text-left print:mb-6">
        <h2 className="text-4xl font-extrabold relative inline-block mb-4 after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary after:rounded-full print:after:hidden print:text-3xl print:mb-1">
          {PROFILE.name}
        </h2>
        <p className="text-lg text-primary dark:text-secondary font-semibold print:text-sm print:text-black">
          {PROFILE.title}
        </p>
        <div className="hidden print:flex flex-wrap justify-center gap-4 text-xs mt-3 border-b pb-4 text-gray-700">
          <span>{PROFILE.email}</span>
          <span>|</span>
          <span>{PROFILE.phone}</span>
          <span>|</span>
          <span>{PROFILE.location}</span>
          <span>|</span>
          <span>{PROFILE.github}</span>
          <span>|</span>
          <span>{PROFILE.linkedin}</span>
        </div>
      </AnimatedSection>

      {/* Action CTA Panel */}
      <AnimatedSection delay={0.1} className="flex justify-center gap-4 mb-12 print:hidden">
        <PDFDownloadLink
          document={<ResumePDF />}
          fileName={`${PROFILE.name.replace(/\s+/g, '_')}_Resume.pdf`}
          className="btn btn-primary flex items-center gap-2"
        >
          {({ loading }) => (
            <>
              <Download size={18} />
              {loading ? 'Preparing PDF...' : 'Download Resume'}
            </>
          )}
        </PDFDownloadLink>
      </AnimatedSection>

      {/* CV Grid Layout */}
      <div className="grid lg:grid-cols-12 gap-8 items-start print:grid-cols-1 print:gap-4">
        
        {/* Navigation Sidebar */}
        <AnimatedSection direction="right" className="lg:col-span-3 flex flex-col gap-2 print:hidden">
          {[
            { id: 'personal', label: 'Personal Info', icon: User },
            { id: 'experience', label: 'Experience', icon: Briefcase },
            { id: 'education', label: 'Education', icon: GraduationCap },
            { id: 'skills', label: 'Skills & Tools', icon: Cpu },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 px-5 py-4 rounded-xl font-bold transition-all duration-300 text-left border ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.02]' 
                    : 'bg-bg-glass dark:bg-bg-darkGlass border-border-glass text-text-muted dark:text-text-darkMuted hover:border-primary/50 hover:text-primary'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </AnimatedSection>

        {/* Content Panel (Screen Display) */}
        <div className="lg:col-span-9 print:block hidden print:block-important">
          {/* Always display all sections when printing */}
          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold border-b pb-2 mb-4 text-primary flex items-center gap-2"><Briefcase size={22} /> Professional Experience</h3>
              {experienceData.map((item, idx) => <TimelineItem key={idx} {...item} />)}
            </section>
            <section className="page-break-before">
              <h3 className="text-xl font-bold border-b pb-2 mb-4 text-primary flex items-center gap-2"><GraduationCap size={22} /> Education</h3>
              {educationData.map((item, idx) => <TimelineItem key={idx} {...item} />)}
            </section>
          </div>
        </div>

        {/* Interactive Viewer (Regular View) */}
        <div className="lg:col-span-9 print:hidden w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
                    <User /> Personal Information
                  </h3>
                  
                  <GlassCard className="p-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Left: Summary */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-bold text-primary border-b pb-2">Profile Summary</h4>
                        <p className="text-sm leading-relaxed text-text-muted dark:text-text-darkMuted">
                          {PROFILE.summary}
                        </p>
                      </div>

                      {/* Right: Contact details */}
                      <div className="space-y-6">
                        <h4 className="text-lg font-bold text-secondary border-b pb-2">Details</h4>
                        
                        <div className="space-y-4 text-sm">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary/10 text-primary">
                              <User size={18} />
                            </div>
                            <div>
                              <span className="block text-xs text-text-muted dark:text-text-darkMuted">Full Name</span>
                              <span className="font-semibold">{PROFILE.name}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-secondary/10 text-secondary">
                              <Globe size={18} />
                            </div>
                            <div>
                              <span className="block text-xs text-text-muted dark:text-text-darkMuted">Location</span>
                              <span className="font-semibold">{PROFILE.location}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-accent/10 text-accent">
                              <Mail size={18} />
                            </div>
                            <div>
                              <span className="block text-xs text-text-muted dark:text-text-darkMuted">Email</span>
                              <a href={`mailto:${PROFILE.email}`} className="font-semibold hover:text-primary transition-colors">{PROFILE.email}</a>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-green-500/10 text-green-500">
                              <Phone size={18} />
                            </div>
                            <div>
                              <span className="block text-xs text-text-muted dark:text-text-darkMuted">Mobile</span>
                              <a href={`tel:${PROFILE.phone}`} className="font-semibold hover:text-green-500 transition-colors">{PROFILE.phone}</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Social links row */}
                    <div className="mt-8 pt-6 border-t border-border-glass flex flex-wrap gap-4 justify-center md:justify-start">
                      <a href={`https://${PROFILE.linkedin}`} target="_blank" rel="noreferrer" 
                         className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-border-glass font-semibold text-sm hover:border-primary hover:text-primary transition-all duration-300">
                        <Linkedin size={18} className="text-[#0a66c2]" /> LinkedIn
                      </a>
                      <a href={`https://${PROFILE.github}`} target="_blank" rel="noreferrer" 
                         className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-border-glass font-semibold text-sm hover:border-primary hover:text-primary transition-all duration-300">
                        <Github size={18} /> GitHub
                      </a>
                    </div>
                  </GlassCard>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2"><Briefcase /> Professional Experience</h3>
                  {experienceData.map((item, idx) => (
                    <TimelineItem key={idx} {...item} />
                  ))}
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6 text-secondary flex items-center gap-2"><GraduationCap /> Academic Pathway</h3>
                  {educationData.map((item, idx) => (
                    <TimelineItem key={idx} {...item} />
                  ))}
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold mb-6 text-accent flex items-center gap-2"><Cpu /> Skills Inventory</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <GlassCard>
                      <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-primary"><Star size={18} /> Frontend Technologies</h4>
                      {SKILLS.frontend.map((s, idx) => (
                        <SkillBar key={idx} name={s.name} percentage={s.percentage} />
                      ))}
                    </GlassCard>

                    <GlassCard>
                      <h4 className="text-lg font-bold mb-6 flex items-center gap-2 text-secondary"><Star size={18} /> Backend & Architecture</h4>
                      {SKILLS.backend.map((s, idx) => (
                        <SkillBar key={idx} name={s.name} percentage={s.percentage} />
                      ))}
                    </GlassCard>
                  </div>

                  <GlassCard>
                    <h4 className="text-lg font-bold mb-4">Methodologies & Productivity Tools</h4>
                    <div className="flex flex-wrap gap-3">
                      {SKILLS.tools.map(tool => (
                        <span key={tool} className="px-4 py-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-border-glass text-sm font-semibold hover:border-primary hover:text-primary transition-colors cursor-default">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

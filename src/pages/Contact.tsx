import { Code, Mail, Phone } from 'lucide-react';
import { FaLinkedin as Linkedin, FaGithub as Github } from 'react-icons/fa';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/ui/GlassCard';
import { PROFILE } from '../data/portfolioData';

export default function Contact() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <AnimatedSection className="text-center mb-16">
        <h2 className="text-4xl font-extrabold relative inline-block mb-4 after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary after:rounded-full">
          Get In Touch
        </h2>
        <p className="text-lg text-text-muted dark:text-text-darkMuted mt-4">Let's build something amazing together.</p>
      </AnimatedSection>

      <div className="max-w-3xl mx-auto">
        <AnimatedSection delay={0.2}>
          <GlassCard className="text-center h-full">
            <h3 className="text-2xl font-bold mb-8">Connect With Me</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/faraj-ansari/' },
                { name: 'GitHub', icon: Github, url: 'https://github.com/itsfraz' },
                { name: 'LeetCode', icon: Code, url: 'https://leetcode.com/' },
                { name: 'Email', icon: Mail, url: `mailto:${PROFILE.email}` },
                { name: 'Phone', icon: Phone, url: `tel:${PROFILE.phone}` }
              ].map(social => {
                const Icon = social.icon;
                return (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" 
                     className="flex flex-col items-center justify-center w-28 h-28 rounded-2xl bg-bg-panel dark:bg-bg-darkPanel border border-border-glass dark:border-border-darkGlass text-text-main dark:text-text-darkMain hover:-translate-y-2 hover:rotate-[-3deg] hover:border-primary hover:shadow-glass transition-all duration-300">
                    <Icon size={40} className="mb-2 text-primary" />
                    <span className="font-semibold text-sm">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </div>
  );
}

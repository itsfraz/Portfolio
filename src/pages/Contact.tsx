import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, Code, Mail, Phone } from 'lucide-react';
import { FaLinkedin as Linkedin, FaGithub as Github } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import AnimatedSection from '../components/AnimatedSection';
import GlassCard from '../components/ui/GlassCard';
import { PROFILE } from '../data/portfolioData';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Replace with actual EmailJS keys
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'SERVICE_ID_PLACEHOLDER';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'TEMPLATE_ID_PLACEHOLDER';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'PUBLIC_KEY_PLACEHOLDER';

    // Simulated behavior for now since keys aren't provided
    if (serviceId === 'SERVICE_ID_PLACEHOLDER') {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        if (formRef.current) formRef.current.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      }, 1500);
      return;
    }

    emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey)
      .then(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        if (formRef.current) formRef.current.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        setIsSubmitting(false);
        alert('Failed to send message. Please try again later.');
      });
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <AnimatedSection className="text-center mb-16">
        <h2 className="text-4xl font-extrabold relative inline-block mb-4 after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-gradient-to-r after:from-primary after:to-secondary after:rounded-full">
          Get In Touch
        </h2>
        <p className="text-lg text-text-muted dark:text-text-darkMuted mt-4">Let's build something amazing together.</p>
      </AnimatedSection>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <AnimatedSection direction="right" delay={0.2}>
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
                  <a key={social.name} href={social.url} target="_blank" rel="noreferrer" 
                     className="flex flex-col items-center justify-center w-28 h-28 rounded-2xl bg-bg-panel dark:bg-bg-darkPanel border border-border-glass dark:border-border-darkGlass text-text-main dark:text-text-darkMain hover:-translate-y-2 hover:rotate-[-3deg] hover:border-primary hover:shadow-glass transition-all duration-300">
                    <Icon size={40} className="mb-2 text-primary" />
                    <span className="font-semibold text-sm">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection direction="left" delay={0.4}>
          <GlassCard>
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-text-muted dark:text-text-darkMuted mb-2">Name</label>
                <input 
                  type="text" 
                  name="user_name"
                  id="name" 
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg bg-black/5 dark:bg-white/5 border border-border-glass text-text-main dark:text-text-darkMain focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-text-muted dark:text-text-darkMuted mb-2">Email</label>
                <input 
                  type="email" 
                  name="user_email"
                  id="email" 
                  required
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-black/5 dark:bg-white/5 border border-border-glass text-text-main dark:text-text-darkMain focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-text-muted dark:text-text-darkMuted mb-2">Message</label>
                <textarea 
                  name="message"
                  id="message" 
                  rows={4}
                  required
                  placeholder="How can I help you?"
                  className="w-full px-4 py-3 rounded-lg bg-black/5 dark:bg-white/5 border border-border-glass text-text-main dark:text-text-darkMain focus:outline-none focus:border-primary transition-colors resize-none"
                ></textarea>
              </div>
              
              <motion.button 
                type="submit" 
                disabled={isSubmitting || isSuccess}
                className={`w-full btn ${isSuccess ? 'bg-green-500 text-white border-green-500 shadow-[0_4px_15px_rgba(34,197,94,0.4)]' : 'btn-primary'} flex items-center justify-center gap-2 mt-4`}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <><Loader2 className="animate-spin" size={20} /> Sending...</>
                ) : isSuccess ? (
                  <><CheckCircle size={20} /> Sent Successfully!</>
                ) : (
                  <><Send size={20} /> Send Message</>
                )}
              </motion.button>
            </form>
          </GlassCard>
        </AnimatedSection>
      </div>
    </div>
  );
}

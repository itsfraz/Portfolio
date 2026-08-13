import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';
import { Coffee } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-8 py-6 glass relative z-10 text-center">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex justify-center gap-6 mb-3">
          <a href="https://github.com/itsfraz" target="_blank" rel="noopener noreferrer" className="text-text-muted dark:text-text-darkMuted hover:text-primary transition-colors">
            <Github size={28} />
          </a>
          <a href="https://www.linkedin.com/in/faraj-ansari/" target="_blank" rel="noopener noreferrer" className="text-text-muted dark:text-text-darkMuted hover:text-primary transition-colors">
            <Linkedin size={28} />
          </a>
        </div>
        <p className="text-text-muted dark:text-text-darkMuted font-medium flex items-center justify-center gap-1">
          &copy; 2025 Mohd Faraj Ansari. Crafted with <span className="text-red-500">♥</span> and <strong className="font-bold text-text-main dark:text-text-darkMain text-lg">चाय</strong> <Coffee size={18} className="text-amber-800 dark:text-amber-500" />
        </p>
      </div>
    </footer>
  );
}

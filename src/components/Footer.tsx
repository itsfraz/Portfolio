import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="mt-16 py-12 glass relative z-10 text-center">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex justify-center gap-6 mb-6">
          <a href="https://github.com/itsfraz" target="_blank" rel="noreferrer" className="text-text-muted dark:text-text-darkMuted hover:text-primary transition-colors">
            <Github size={28} />
          </a>
          <a href="https://www.linkedin.com/in/faraj-ansari/" target="_blank" rel="noreferrer" className="text-text-muted dark:text-text-darkMuted hover:text-primary transition-colors">
            <Linkedin size={28} />
          </a>
        </div>
        <p className="text-text-muted dark:text-text-darkMuted font-medium">
          &copy; 2025 Mohd Faraj Ansari. Crafted with <span className="text-red-500">♥</span> and Coffee.
        </p>
      </div>
    </footer>
  );
}

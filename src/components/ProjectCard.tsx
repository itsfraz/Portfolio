import { ExternalLink, Info } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';
import GlassCard from './ui/GlassCard';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  bgGradient: string;
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectCard({ 
  title, description, tags, icon, bgGradient, githubUrl, liveUrl 
}: ProjectCardProps) {
  return (
    <GlassCard className="flex flex-col p-0 overflow-hidden h-full interactive hover:-translate-y-2">
      <div className={`h-48 relative overflow-hidden flex items-center justify-center ${bgGradient}`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 drop-shadow-lg transform transition-transform duration-500 hover:scale-110">
          {icon}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-text-muted dark:text-text-darkMuted mb-6 flex-grow">{description}</p>
        
        <div className="flex flex-wrap gap-3 mt-auto">
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-semibold rounded-lg bg-transparent border border-border-glass text-text-main dark:text-text-darkMain hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <Github size={16} /> Code
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-blue-600 transition-colors">
              <ExternalLink size={16} /> Live
            </a>
          )}
          {!githubUrl && !liveUrl && (
             <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-blue-600 transition-colors">
             <Info size={16} /> Details
           </button>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

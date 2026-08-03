import { useState } from 'react';
import { ExternalLink, Info, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 120;
  const isLongDescription = description.length > maxLength;

  return (
    <GlassCard className="flex flex-col p-0 overflow-hidden h-full interactive hover:-translate-y-2">
      <div className={`h-48 shrink-0 relative overflow-hidden flex items-center justify-center ${bgGradient}`}>
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
        
        <div className="flex flex-col flex-grow mb-6">
          <p className="text-sm text-text-muted dark:text-text-darkMuted leading-relaxed">
            {isExpanded ? description : (isLongDescription ? `${description.substring(0, maxLength)}...` : description)}
          </p>
          {isLongDescription && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary font-bold text-xs mt-2 flex items-center gap-1 hover:underline self-start transition-all"
            >
              {isExpanded ? <>Show Less <ChevronUp size={14}/></> : <>Read More <ChevronDown size={14}/></>}
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-border-glass">
          {githubUrl && githubUrl !== '#' && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-semibold rounded-lg bg-transparent border border-border-glass text-text-main dark:text-text-darkMain hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <Github size={16} /> Code
            </a>
          )}
          {liveUrl && liveUrl !== '#' && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-blue-600 transition-colors">
              <ExternalLink size={16} /> Live
            </a>
          )}
          {(!githubUrl || githubUrl === '#') && (!liveUrl || liveUrl === '#') && (
             <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-blue-600 transition-colors">
             <Info size={16} /> Details
           </button>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

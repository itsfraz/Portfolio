import { ExternalLink } from 'lucide-react';
import GlassCard from './ui/GlassCard';

interface CertificateCardProps {
  title: string;
  issuer: string;
  date: string;
  image?: string;
  link?: string;
}

export default function CertificateCard({ title, issuer, date, image, link }: CertificateCardProps) {
  return (
    <GlassCard interactive className="flex flex-col h-full overflow-hidden !p-0 group">
      {/* Image Container */}
      <div className="relative w-full h-52 overflow-hidden bg-black/10 dark:bg-white/5 flex-shrink-0">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted">
            No Image Available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-panel/90 dark:from-bg-darkPanel/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow bg-bg-panel/50 dark:bg-bg-darkPanel/50 backdrop-blur-sm z-10 -mt-2 rounded-t-2xl">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{title}</h4>
        </div>
        <p className="text-primary font-medium mb-1">{issuer}</p>
        <p className="text-sm text-text-muted dark:text-text-darkMuted mb-6">{date}</p>
        
        <div className="mt-auto pt-4 border-t border-border-glass">
          {link && link !== '#' ? (
            <a 
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1"
            >
              View Certificate <ExternalLink size={16} />
            </a>
          ) : (
            <button disabled className="w-full py-2.5 px-4 bg-black/5 dark:bg-white/5 border border-border-glass text-text-muted dark:text-text-darkMuted rounded-xl font-semibold flex items-center justify-center gap-2 cursor-not-allowed">
              Link Unavailable
            </button>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

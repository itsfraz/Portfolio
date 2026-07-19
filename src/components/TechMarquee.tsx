import {
  FaJs, FaReact, FaNodeJs, FaDatabase, FaHtml5, FaCss3Alt, FaGitAlt, FaJava, FaDocker, FaAws
} from 'react-icons/fa';

export default function TechMarquee() {
  const icons = [
    { icon: FaJs, name: "JavaScript", color: "#F7DF1E" },
    { icon: FaReact, name: "React", color: "#61DAFB" },
    { icon: FaNodeJs, name: "Node.js", color: "#339933" },
    { icon: FaDatabase, name: "SQL", color: "#4479A1" },
    { icon: FaHtml5, name: "HTML5", color: "#E34F26" },
    { icon: FaCss3Alt, name: "CSS3", color: "#1572B6" },
    { icon: FaGitAlt, name: "Git", color: "#F05032" },
    { icon: FaJava, name: "Java", color: "#007396" },
    { icon: FaDocker, name: "Docker", color: "#2496ED" },
    { icon: FaAws, name: "AWS", color: "#232F3E" },
  ];

  return (
    <div className="w-full overflow-hidden py-16 relative" style={{
      maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
    }}>
      <div className="flex gap-12 w-max animate-marquee-scroll hover:[animation-play-state:paused]">
        {/* Render twice for seamless loop */}
        {[...icons, ...icons].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="text-5xl text-text-muted dark:text-text-darkMuted hover:text-primary transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_var(--tw-shadow-color)] shadow-primary cursor-default">
              <Icon title={item.name} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

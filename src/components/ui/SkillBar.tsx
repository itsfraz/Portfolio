import { motion } from 'framer-motion';

interface SkillBarProps {
  name: string;
  percentage: number;
}

export default function SkillBar({ name, percentage }: SkillBarProps) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex justify-between text-sm font-semibold mb-2">
        <span>{name}</span>
        <span className="text-primary">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

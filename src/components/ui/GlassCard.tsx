import { ReactNode } from 'react';
import clsx from 'clsx';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

export default function GlassCard({ children, className, interactive = false, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={clsx(
        "glass-panel transition-colors duration-300",
        interactive && "hover:-translate-y-2 hover:border-primary",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

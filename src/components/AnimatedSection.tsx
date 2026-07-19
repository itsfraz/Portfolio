import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedSectionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export default function AnimatedSection({ 
  children, 
  delay = 0, 
  className = "",
  direction = 'up',
  ...props 
}: AnimatedSectionProps) {
  
  const getVariants = () => {
    switch(direction) {
      case 'up': return { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };
      case 'down': return { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0 } };
      case 'left': return { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } };
      case 'right': return { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } };
      default: return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.175, 0.885, 0.32, 1.275] }}
      variants={getVariants()}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

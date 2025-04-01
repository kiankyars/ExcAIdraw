'use client'

import { motion } from 'framer-motion';

interface AnimatedArrowProps {
  isVisible: boolean;
}

export const AnimatedArrow: React.FC<AnimatedArrowProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: '15px',
        right: '100px',
        width: '40px',
        height: '40px',
        zIndex: 999999,
        transform: 'rotate(-45deg)',
      }}
      initial={{ scale: 1 }}
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 12H19M19 12L12 5M19 12L12 19"
          stroke="#4F46E5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}; 
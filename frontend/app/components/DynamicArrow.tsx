'use client'

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface DynamicArrowProps {
  isVisible: boolean;
  targetButtonId: string;
}

export const DynamicArrow: React.FC<DynamicArrowProps> = ({ isVisible, targetButtonId }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = () => {
      const button = document.getElementById(targetButtonId);
      if (button) {
        const rect = button.getBoundingClientRect();
        setPosition({
          x: rect.left - 60, // Position arrow 60px to the left of the button
          y: rect.top + rect.height / 2, // Vertically center with the button
        });
      }
    };

    if (isVisible) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      // Update position periodically in case of dynamic layout changes
      const interval = setInterval(updatePosition, 1000);
      return () => {
        window.removeEventListener('resize', updatePosition);
        clearInterval(interval);
      };
    }
  }, [isVisible, targetButtonId]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: position.y - 20, // Center the arrow
        left: position.x,
        width: '60px',
        height: '40px',
        zIndex: 999999,
      }}
      initial={{ scale: 1, x: -20 }}
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 10, 0],
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
        viewBox="0 0 60 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 20H55M55 20L40 5M55 20L40 35"
          stroke="#4F46E5"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}; 
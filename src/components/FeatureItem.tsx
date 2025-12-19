'use client';

import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface FeatureItemProps {
  title: string;
  description: string;
}

const FeatureItem = ({ title, description }: FeatureItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const iconControls = useAnimation();
  
  const handleHoverStart = () => {
    setIsHovered(true);
    iconControls.start({
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5 }
    });
  };
  
  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ x: 5, boxShadow: "0 10px 30px -15px rgba(0, 183, 255, 0.15)" }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="glass-card p-6 md:p-8 transition-all duration-300 border-l-4 border-transparent hover:border-l-primary"
    >
      <div className="flex items-start mb-4">
        <motion.div 
          animate={iconControls}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-4 md:mr-5 flex-shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <div>
          <motion.h3 
            className="text-lg md:text-xl font-bold mb-2 md:mb-3"
            animate={{ color: isHovered ? "#00B7FF" : "#FFFFFF" }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">{description}</p>
        </div>
      </div>
      
      <motion.div
        className="ml-[56px] md:ml-[68px] h-0.5 bg-primary/30"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '70%' : '0%' }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default FeatureItem; 
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const iconComponents = {
    code: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    robot: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    chart: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 md:p-8 hover-float"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <motion.div 
          className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4 md:mb-6"
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            backgroundColor: isHovered ? 'rgba(0, 183, 255, 0.3)' : 'rgba(0, 183, 255, 0.2)'
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {iconComponents[icon as keyof typeof iconComponents]}
          </motion.div>
        </motion.div>
        
        <motion.div
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-primary transition-colors flex items-center">
            {title}
            <motion.span
              className="ml-2 text-primary"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </h3>
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">{description}</p>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-2 -right-2 w-12 h-12 border-r-2 border-b-2 border-primary/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute -top-2 -left-2 w-12 h-12 border-l-2 border-t-2 border-primary/30 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </motion.div>
  );
};

export default ServiceCard; 
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    { 
      name: 'name', 
      label: 'Name', 
      type: 'text', 
      placeholder: 'Your name',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    { 
      name: 'email', 
      label: 'Email', 
      type: 'email', 
      placeholder: 'your.email@example.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const inputVariants = {
    focused: {
      boxShadow: "0 0 0 2px rgba(0, 183, 255, 0.5)",
      borderColor: "rgba(0, 183, 255, 1)",
      transition: { duration: 0.2 }
    },
    unfocused: {
      boxShadow: "0 0 0 0 rgba(0, 183, 255, 0)",
      borderColor: "rgba(75, 85, 99, 0.5)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 md:p-8 border-t-4 border-primary"
    >
      <AnimatePresence mode="wait">
        {submitSuccess ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="text-center py-8"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, times: [0, 0.7, 1] }}
              className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold mb-2 text-glow">Thank You!</h3>
            <p className="text-gray-300 mb-8">Your message has been sent successfully. We'll get back to you soon.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSubmitSuccess(false)}
              className="btn btn-primary"
            >
              Send Another Message
            </motion.button>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-6"
          >
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-glow">Get In Touch</h3>
              <p className="text-gray-300 text-sm md:text-base">We'd love to hear from you. Fill out the form below.</p>
            </div>
            
            {submitError && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg"
              >
                {submitError}
              </motion.div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {formFields.map(field => (
                <div key={field.name} className="relative">
                  <label htmlFor={field.name} className="block text-sm font-medium mb-2 flex items-center">
                    <span className="text-primary mr-2">{field.icon}</span>
                    {field.label}
                  </label>
                  <motion.div
                    variants={inputVariants}
                    animate={focusedField === field.name ? "focused" : "unfocused"}
                    className="relative"
                  >
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      onFocus={() => handleFocus(field.name)}
                      onBlur={handleBlur}
                      required
                      className="w-full px-4 py-3 bg-dark/50 border border-gray-700 rounded-lg focus:outline-none transition-colors"
                      placeholder={field.placeholder}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
            
            <div className="relative">
              <label htmlFor="subject" className="block text-sm font-medium mb-2 flex items-center">
                <span className="text-primary mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </span>
                Subject
              </label>
              <motion.div
                variants={inputVariants}
                animate={focusedField === 'subject' ? "focused" : "unfocused"}
                className="relative"
              >
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus('subject')}
                  onBlur={handleBlur}
                  required
                  className="w-full px-4 py-3 bg-dark/50 border border-gray-700 rounded-lg focus:outline-none transition-colors appearance-none"
                >
                  <option value="">Select a subject</option>
                  <option value="Software Development">Software Development</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </motion.div>
            </div>
            
            <div className="relative">
              <label htmlFor="message" className="block text-sm font-medium mb-2 flex items-center">
                <span className="text-primary mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </span>
                Message
              </label>
              <motion.div
                variants={inputVariants}
                animate={focusedField === 'message' ? "focused" : "unfocused"}
                className="relative"
              >
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-dark/50 border border-gray-700 rounded-lg focus:outline-none transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </motion.div>
            </div>
            
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full btn btn-primary flex items-center justify-center py-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContactForm; 
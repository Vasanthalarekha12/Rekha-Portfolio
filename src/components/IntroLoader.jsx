import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2500; // 2.5 seconds total loading time
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const easingProgress = 1 - Math.pow(1 - (currentStep / steps), 3); // cubic ease-out
      const nextProgress = Math.min(Math.round(easingProgress * 100), 100);
      
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 400); // Wait a little after reaching 100% before transitioning
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      key="intro-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--color-bg)]"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--color-accent)]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.15em] text-white uppercase text-center mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
            Vasanthala <span className="font-bold text-[var(--color-accent)]">Rekha Rani</span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="text-[var(--color-accent)] font-mono text-xl tracking-widest font-medium mb-3">
            {progress}%
          </div>
          <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[var(--color-accent)]/50 to-[var(--color-accent)]"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IntroLoader;

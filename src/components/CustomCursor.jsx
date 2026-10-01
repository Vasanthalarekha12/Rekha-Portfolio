import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const dotXSpring = useSpring(cursorX, { stiffness: 1000, damping: 40 });
  const dotYSpring = useSpring(cursorY, { stiffness: 1000, damping: 40 });

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.premium-card') ||
        target.classList.contains('cursor-interactive')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Don't render on mobile/touch devices
  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-orange-500 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? 'rgba(249, 115, 22, 0.2)' : 'transparent',
        }}
        transition={{ scale: { duration: 0.2 } }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--color-accent)] pointer-events-none z-[10000]"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          marginLeft: 12,
          marginTop: 12,
          scale: isHovered ? 0 : 1,
        }}
      />
    </>
  );
};

export default CustomCursor;

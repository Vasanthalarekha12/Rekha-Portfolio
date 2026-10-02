import React, { useRef, useEffect } from 'react';

const InfiniteCarousel = ({ children, speedDesktop = 40, speedMobile = 25 }) => {
  const trackRef = useRef(null);
  const set1Ref = useRef(null);
  const requestRef = useRef(null);
  const positionRef = useRef(0);
  const lastTimeRef = useRef(null);
  const isPausedRef = useRef(false);
  const isReducedMotion = useRef(false);
  const totalDistanceRef = useRef(0);
  
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);

  const handlePause = () => { isPausedRef.current = true; };
  const handleResume = () => {
    lastTimeRef.current = performance.now();
    isPausedRef.current = false;
  };

  const handleTouchStart = (e) => {
    isPausedRef.current = true;
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = positionRef.current;
  };

  const handleTouchMove = (e) => {
    if (!isPausedRef.current) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    
    // We update the position with the drag delta
    positionRef.current = touchCurrentX.current + deltaX;
    
    if (trackRef.current && totalDistanceRef.current > 0) {
      if (positionRef.current > 0) {
        positionRef.current -= totalDistanceRef.current;
        touchCurrentX.current -= totalDistanceRef.current;
      } else if (Math.abs(positionRef.current) >= totalDistanceRef.current) {
        positionRef.current += totalDistanceRef.current;
        touchCurrentX.current += totalDistanceRef.current;
      }
      
      trackRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
    }
  };

  const handleTouchEnd = () => {
    lastTimeRef.current = performance.now();
    isPausedRef.current = false;
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotion.current = mediaQuery.matches;
    if (isReducedMotion.current) return;

    if (!children) return;

    const isMobile = window.innerWidth < 768;
    const speed = isMobile ? speedMobile : speedDesktop;

    const updateDistance = () => {
      if (set1Ref.current) {
        totalDistanceRef.current = set1Ref.current.getBoundingClientRect().width + 24;
      }
    };
    
    updateDistance();
    // Re-measure after a small delay in case fonts/images load
    const timeoutId = setTimeout(updateDistance, 500);
    window.addEventListener('resize', updateDistance);

    const animate = (time) => {
      if (lastTimeRef.current !== null && !isPausedRef.current && totalDistanceRef.current > 0) {
        const deltaTime = (time - lastTimeRef.current) / 1000;
        positionRef.current -= speed * deltaTime;
        
        if (Math.abs(positionRef.current) >= totalDistanceRef.current) {
          positionRef.current = positionRef.current % totalDistanceRef.current;
        }
        
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
        }
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestRef.current);
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateDistance);
    };
  }, [children, speedDesktop, speedMobile]);

  if (!children) return null;

  if (isReducedMotion.current) {
    return (
      <div className="w-full overflow-x-auto hide-scrollbar pb-12 pt-8 px-4 sm:px-8 relative z-20">
        <div className="flex gap-6 w-max">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full overflow-hidden relative z-20 pb-12 pt-8"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{ perspective: '1200px', touchAction: 'pan-y' }}
    >
      <div 
        ref={trackRef} 
        className="flex w-max will-change-transform"
        style={{ gap: '24px' }}
      >
        <div ref={set1Ref} className="flex" style={{ gap: '24px' }}>
          {children}
        </div>
        <div className="flex" style={{ gap: '24px' }} aria-hidden="true">
          {children}
        </div>
        <div className="flex" style={{ gap: '24px' }} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};

export default InfiniteCarousel;

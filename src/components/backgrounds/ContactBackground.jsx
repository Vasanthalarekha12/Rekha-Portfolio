import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ContactBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let signals = [];
    
    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    class SignalNode {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 0;
        this.maxRadius = Math.random() * 100 + 50;
        this.speed = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.delay = Math.random() * 100;
        this.counter = 0;
      }
      
      update() {
        this.counter++;
        if (this.counter < this.delay) return;
        
        this.radius += this.speed;
        let currentOpacity = this.opacity * (1 - this.radius / this.maxRadius);
        
        if (this.radius > this.maxRadius) {
          this.radius = 0;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.delay = Math.random() * 100;
          this.counter = 0;
        } else {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 122, 0, ${currentOpacity})`;
          ctx.lineWidth = 1;
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.stroke();
          
          if (this.radius < 5) {
            ctx.fillStyle = `rgba(255, 122, 0, ${currentOpacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }
    
    const init = () => {
      initCanvas();
      signals = [];
      const numSignals = window.innerWidth < 768 ? 8 : 15;
      for (let i = 0; i < numSignals; i++) {
        signals.push(new SignalNode());
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      signals.forEach(s => s.update());
      animationFrameId = requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    const handleResize = () => initCanvas();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-[-1] pointer-events-none transition-colors duration-300">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[radial-gradient(circle,_rgba(255,122,0,0.15)_0%,_rgba(0,0,0,0)_70%)] rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[20%] right-[20%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[radial-gradient(circle,_rgba(255,122,0,0.1)_0%,_rgba(0,0,0,0)_70%)] rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
    </div>
  );
};

export default ContactBackground;

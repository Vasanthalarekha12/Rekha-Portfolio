import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const ProjectsBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    class DataNode {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = Math.random() * -0.5 - 0.2; // Move upwards
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.y < 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
        }
        
        ctx.fillStyle = `rgba(255, 122, 0, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
    }
    
    const init = () => {
      initCanvas();
      particles = [];
      const numNodes = window.innerWidth < 768 ? 30 : 80;
      for (let i = 0; i < numNodes; i++) {
        particles.push(new DataNode());
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw vertical lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const spacing = 50;
      for(let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      particles.forEach(p => p.update());
      
      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 122, 0, ${0.15 - distance/100 * 0.15})`;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

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
    <div className="absolute inset-0 overflow-hidden z-[-1] pointer-events-none">
      {/* Perspective Grid */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[60%] opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to top, rgba(255, 122, 0, 0.2) 1px, transparent 1px), linear-gradient(to right, rgba(255, 122, 0, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'bottom',
          maskImage: 'linear-gradient(to top, black, transparent)'
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-[var(--color-bg)] opacity-80" />
    </div>
  );
};

export default ProjectsBackground;

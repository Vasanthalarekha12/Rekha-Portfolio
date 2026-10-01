import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HomeBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouseX = -1000;
    let mouseY = -1000;
    
    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.color = `rgba(255, 122, 0, ${Math.random() * 0.5 + 0.2})`;
      }
      
      update(isMobile) {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        if (!isMobile) {
          let dx = mouseX - this.x;
          let dy = mouseY - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            const force = (150 - distance) / 150;
            this.x -= (dx / distance) * force * 1.5;
            this.y -= (dy / distance) * force * 1.5;
          }
        }
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        if (this.size > 1.5) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = 'var(--color-accent)';
        } else {
          ctx.shadowBlur = 0;
        }
      }
    }
    
    const init = () => {
      initCanvas();
      particles = [];
      const numParticles = window.innerWidth < 768 ? 25 : 60;
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isMobile = window.innerWidth < 768;
      
      if (!isMobile && mouseX !== -1000) {
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 250);
        gradient.addColorStop(0, 'rgba(255, 122, 0, 0.05)');
        gradient.addColorStop(1, 'rgba(255, 122, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 250, 0, Math.PI * 2);
        ctx.fill();
      }

      particles.forEach(p => p.update(isMobile));
      animationFrameId = requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    const handleResize = () => initCanvas();
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const handleMouseLeave = () => { mouseX = -1000; mouseY = -1000; };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-[-1] pointer-events-none">
      <motion.div 
        animate={{ 
          x: [0, 50, 0, -50, 0],
          y: [0, -30, 30, 0, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[var(--color-accent)]/10 rounded-full blur-[100px]"
      />
      <motion.div 
        animate={{ 
          x: [0, -40, 0, 60, 0],
          y: [0, 40, -20, 10, 0],
          scale: [1, 1.05, 0.95, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-orange-600/5 rounded-full blur-[120px]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] opacity-30" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-100" />
    </div>
  );
};

export default HomeBackground;

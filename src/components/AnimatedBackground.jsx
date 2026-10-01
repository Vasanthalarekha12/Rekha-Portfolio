import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 5000], [0, -100]); // Subtler parallax
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Detect active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    const sections = ['home', 'about', 'projects', 'skills', 'certifications', 'contact'];
    setTimeout(() => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 500);
    return () => observer.disconnect();
  }, []);

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
        this.size = Math.random() * 2.5 + 1; // slightly larger for visibility
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.color = `rgba(255, 122, 0, ${Math.random() * 0.6 + 0.3})`; // much higher opacity (0.3 to 0.9)
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        
        // Add subtle glow to larger particles
        if (this.size > 1.5) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'var(--color-accent)';
        } else {
          ctx.shadowBlur = 0;
        }
      }
      
      update(config) {
        // Apply velocity
        this.x += this.vx * config.speed;
        this.y += this.vy * config.speed;
        
        // Section specific movement behavior
        if (config.behavior === 'rise') {
          this.y -= 0.3 * config.speed;
        }

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Mouse interaction
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.mouseRadius) {
          const force = (config.mouseRadius - distance) / config.mouseRadius;
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          
          this.x -= forceDirectionX * force * 2;
          this.y -= forceDirectionY * force * 2;
        }
        
        this.draw();
      }
    }
    
    const init = () => {
      initCanvas();
      particles = [];
      const isMobile = window.innerWidth < 768;
      // Reduce on mobile
      const numParticles = isMobile ? 30 : 80;
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };
    
    const animate = () => {
      // Configuration based on active section
      const sectionConfigs = {
        home: { speed: 1, connections: true, mouseRadius: 150, behavior: 'float', connectDist: 120 },
        about: { speed: 0.5, connections: false, mouseRadius: 100, behavior: 'rise', connectDist: 0 },
        projects: { speed: 1.2, connections: true, mouseRadius: 200, behavior: 'float', connectDist: 150 },
        skills: { speed: 1.5, connections: true, mouseRadius: 180, behavior: 'float', connectDist: 180 },
        certifications: { speed: 0.8, connections: true, mouseRadius: 120, behavior: 'float', connectDist: 100 },
        contact: { speed: 0.4, connections: false, mouseRadius: 250, behavior: 'float', connectDist: 0 },
      };
      
      const config = sectionConfigs[activeSection] || sectionConfigs.home;
      
      // Reduce intense drawing on mobile
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        config.connections = false; // disable expensive lines
        config.mouseRadius = 0; // disable expensive mouse tracking
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw cursor subtle glow
      if (mouseX !== -1000 && !isMobile) {
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 300);
        gradient.addColorStop(0, 'rgba(255, 122, 0, 0.04)');
        gradient.addColorStop(1, 'rgba(255, 122, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 300, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(config);
        
        // Draw connections
        if (config.connections) {
          for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < config.connectDist) {
              ctx.beginPath();
              // Increased connection line opacity for visibility
              ctx.strokeStyle = `rgba(255, 122, 0, ${0.4 - (distance / config.connectDist) * 0.4})`;
              ctx.lineWidth = 1;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    init();
    animate();
    
    const handleResize = () => {
      initCanvas();
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeSection]);

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{ y: yOffset }}
    >
      {/* Ambient slow moving orbs */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <motion.div 
          animate={{ 
            x: [0, 100, 0, -100, 0],
            y: [0, -50, 50, 0, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[var(--color-accent)]/5 rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0, 120, 0],
            y: [0, 80, -40, 20, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-orange-900/10 rounded-full blur-[150px]"
        />
      </div>

      <canvas
        ref={canvasRef}
        className="relative w-full h-full opacity-100"
      />
    </motion.div>
  );
};

export default AnimatedBackground;

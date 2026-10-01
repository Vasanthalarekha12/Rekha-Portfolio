import { useEffect, useRef } from 'react';

const InteractiveBackground = ({ theme = 'home' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let scrollY = window.scrollY;
    let scrollVelocity = 0;
    
    // Resize logic
    const initCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    initCanvas();
    window.addEventListener('resize', initCanvas);

    // Scroll logic
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = currentScrollY - scrollY;
      scrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mouse logic
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const handleMouseLeave = () => { mouseX = -1000; mouseY = -1000; };
    canvas.parentElement.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);

    // Check light mode
    const isLightMode = document.body.classList.contains('light');
    const baseColor = isLightMode ? '234, 88, 12' : '255, 122, 0'; // Orange accent

    // Common particle class
    class Particle {
      constructor(type) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = type === 'blueprint' ? Math.random() * 1.5 + 1 : Math.random() * 2.5 + 1;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.pulse = Math.random() * Math.PI * 2;
        this.depth = Math.random() * 0.8 + 0.2; // For parallax
      }
      
      update(config) {
        // Base movement
        this.x += this.vx * config.speed;
        this.y += this.vy * config.speed;
        
        // Scroll Parallax (scroll velocity affects Y position)
        if (Math.abs(scrollVelocity) > 0) {
          this.y -= scrollVelocity * this.depth * 0.5;
        }
        
        // Repulsion / Attraction
        if (config.repel && mouseX !== -1000) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 200) {
            const force = (200 - dist) / 200;
            // Gentle repulsion
            this.x -= (dx / dist) * force * 3;
            this.y -= (dy / dist) * force * 3;
          }
        }
        
        // Wrapping
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        
        this.pulse += 0.03;
      }
    }

    const init = () => {
      particles = [];
      const isMobile = canvas.width < 768;
      const count = isMobile ? 40 : 80;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(theme));
      }
    };
    init();

    let time = 0;

    const drawConnectingLines = (maxDist, maxOpacity, connectAll = false) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          
          if (dist < maxDist) {
            let opacity = maxOpacity * (1 - dist / maxDist);
            
            if (mouseX !== -1000) {
              const mouseDist = Math.hypot(mouseX - p1.x, mouseY - p1.y);
              if (mouseDist < 300) {
                opacity = Math.min(opacity * 3, 0.9);
              }
            }
            
            if (connectAll || Math.random() > 0.05) {
              ctx.strokeStyle = `rgba(${baseColor}, ${opacity})`;
              ctx.lineWidth = 1.2;
              ctx.beginPath(); 
              ctx.moveTo(p1.x, p1.y); 
              ctx.lineTo(p2.x, p2.y); 
              ctx.stroke();
            }
          }
        }
      }
    };

    const renderHome = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (mouseX !== -1000) {
        const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 400);
        grad.addColorStop(0, `rgba(${baseColor}, 0.15)`);
        grad.addColorStop(1, `rgba(${baseColor}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      drawConnectingLines(180, 0.4);

      particles.forEach((p) => {
        p.update({ speed: 0.8, repel: true });
        
        // Outer glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${baseColor}, 0.8)`;
        ctx.fillStyle = `rgba(${baseColor}, ${p.opacity + Math.sin(p.pulse)*0.5})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2); ctx.fill();
        
        // Bright core
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity + 0.3})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2); ctx.fill();
      });
    };

    const renderAbout = () => {
      // Soft depth/parallax particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update({ speed: 0.4, repel: true });
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.4})`;
        ctx.beginPath(); 
        ctx.arc(p.x, p.y, p.size * (p.depth * 2), 0, Math.PI * 2); 
        ctx.fill();
      });
      
      drawConnectingLines(140, 0.1, true);
    };

    const renderProjects = () => {
      // Data-flow particles + paths
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.update({ speed: 1.2, repel: false });
        
        ctx.fillStyle = `rgba(${baseColor}, ${p.opacity})`;
        ctx.fillRect(p.x, p.y, 2.5, 2.5);

        // Data flow trails
        if (i % 4 === 0) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${baseColor}, 0.08)`;
          ctx.moveTo(p.x, 0);
          ctx.lineTo(p.x, canvas.height);
          ctx.stroke();
        }
      });
      
      drawConnectingLines(120, 0.2);
    };

    const renderSkills = () => {
      // Neural network nodes
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update({ speed: 0.5, repel: true });
        ctx.fillStyle = `rgba(${baseColor}, ${p.opacity})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2); ctx.fill();
      });
      
      drawConnectingLines(180, 0.3, true);
    };

    const renderCertifications = () => {
      // Technical blueprint particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = `rgba(${baseColor}, 0.08)`;
      const step = 50;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      particles.forEach((p) => {
        p.update({ speed: 0.9, repel: false });
        // Snap to grid for blueprint effect
        const snappedX = Math.round(p.x / step) * step;
        const snappedY = Math.round(p.y / step) * step;
        
        ctx.fillStyle = `rgba(${baseColor}, 0.6)`;
        ctx.beginPath(); ctx.arc(snappedX, snappedY, 3, 0, Math.PI*2); ctx.fill();
        
        // Circuit paths
        ctx.strokeStyle = `rgba(${baseColor}, 0.3)`;
        ctx.beginPath();
        ctx.moveTo(snappedX, snappedY);
        ctx.lineTo(snappedX + (p.vx > 0 ? step : -step), snappedY);
        ctx.stroke();
      });
    };

    const renderContact = () => {
      // Signal/ripple particles
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = mouseX !== -1000 ? mouseX : canvas.width / 2;
      const centerY = mouseY !== -1000 ? mouseY : canvas.height / 2;

      // Expanding rings
      const maxRadius = Math.max(canvas.width, canvas.height);
      for (let i = 0; i < 4; i++) {
        const radius = ((time * 1.5 + i * 250) % maxRadius);
        ctx.strokeStyle = `rgba(${baseColor}, ${0.15 * (1 - radius / maxRadius)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      particles.forEach((p) => {
        p.update({ speed: 0.4, repel: true });
        ctx.fillStyle = `rgba(${baseColor}, ${p.opacity + Math.sin(p.pulse)*0.5})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2); ctx.fill();
      });
      
      drawConnectingLines(150, 0.15);
    };

    const animate = () => {
      time++;
      // Decay scroll velocity
      scrollVelocity *= 0.9;
      
      switch (theme) {
        case 'home': renderHome(); break;
        case 'about': renderAbout(); break;
        case 'projects': renderProjects(); break;
        case 'skills': renderSkills(); break;
        case 'certifications': renderCertifications(); break;
        case 'contact': renderContact(); break;
        default: renderHome();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', initCanvas);
      window.removeEventListener('scroll', handleScroll);
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[-1] opacity-100" style={{ mixBlendMode: 'screen' }} />;
};

export default InteractiveBackground;

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
    
    // Resize logic
    const initCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    initCanvas();
    window.addEventListener('resize', initCanvas);

    // Mouse logic
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const handleMouseLeave = () => { mouseX = -1000; mouseY = -1000; };
    canvas.parentElement.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);

    // Common particle class
    class Particle {
      constructor(type) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = type === 'blueprint' ? Math.random() * 1.5 + 0.5 : Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.4 + 0.4;
        this.pulse = Math.random() * Math.PI * 2;
      }
      
      update(config) {
        this.x += this.vx * config.speed;
        this.y += this.vy * config.speed;
        
        // Repulsion
        if (config.repel) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            this.x -= (dx / dist) * force * 2;
            this.y -= (dy / dist) * force * 2;
          }
        }
        
        // Wrapping
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        
        this.pulse += 0.05;
      }
    }

    const init = () => {
      particles = [];
      const isMobile = canvas.width < 768;
      const count = theme === 'about' ? (isMobile ? 15 : 30) : theme === 'contact' ? (isMobile ? 12 : 25) : (isMobile ? 30 : 60);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(theme));
      }
    };
    init();

    let time = 0;

    const renderHome = () => {
      // Neural Ambient Field
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Ambient radial light
      if (mouseX !== -1000) {
        const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 300);
        grad.addColorStop(0, 'rgba(255, 122, 0, 0.05)');
        grad.addColorStop(1, 'rgba(255, 122, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      particles.forEach((p, i) => {
        p.update({ speed: 0.6, repel: true });
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 122, 0, 0.4)';
        ctx.fillStyle = `rgba(255, 122, 0, ${p.opacity + Math.sin(p.pulse)*0.3})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0; // reset for lines

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(255, 122, 0, ${0.3 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }
      });
    };

    const renderAbout = () => {
      // Digital Depth Field
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fine geometric grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const step = 60;
      for (let x = (time * 0.2) % step; x < canvas.width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = (time * 0.2) % step; y < canvas.height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      particles.forEach((p) => {
        p.update({ speed: 0.3, repel: false });
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.3})`;
        ctx.beginPath(); ctx.fillRect(p.x, p.y, p.size * 1.5, p.size * 1.5);
      });
    };

    const renderProjects = () => {
      // Data Grid / Digital Matrix
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255, 122, 0, 0.05)';
      
      particles.forEach((p, i) => {
        p.y += p.vy > 0 ? 1.5 : -1.5;
        p.x += p.vx > 0 ? 0.5 : -0.5;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;

        ctx.fillStyle = `rgba(255, 122, 0, ${p.opacity})`;
        ctx.fillRect(p.x, p.y, 2, 2);

        // Grid trails
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.moveTo(p.x, 0);
          ctx.lineTo(p.x, canvas.height);
          ctx.stroke();
        }
      });
    };

    const renderSkills = () => {
      // Neural Network
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update({ speed: 0.5, repel: true });
        ctx.fillStyle = `rgba(255, 122, 0, ${p.opacity})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2); ctx.fill();
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(255, 122, 0, ${0.2 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
          }
        }
      });
    };

    const renderCertifications = () => {
      // Digital Blueprint
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255, 122, 0, 0.06)';
      const step = 40;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      particles.forEach((p) => {
        p.update({ speed: 0.8, repel: false });
        // Snap to grid
        const snappedX = Math.round(p.x / step) * step;
        const snappedY = Math.round(p.y / step) * step;
        
        ctx.fillStyle = 'rgba(255, 122, 0, 0.5)';
        ctx.beginPath(); ctx.arc(snappedX, snappedY, 3, 0, Math.PI*2); ctx.fill();
        
        // Circuit paths
        ctx.strokeStyle = 'rgba(255, 122, 0, 0.2)';
        ctx.beginPath();
        ctx.moveTo(snappedX, snappedY);
        ctx.lineTo(snappedX + (p.vx > 0 ? step : -step), snappedY);
        ctx.lineTo(snappedX + (p.vx > 0 ? step : -step), snappedY + (p.vy > 0 ? step : -step));
        ctx.stroke();
      });
    };

    const renderContact = () => {
      // Signal Field
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = mouseX !== -1000 ? mouseX : canvas.width / 2;
      const centerY = mouseY !== -1000 ? mouseY : canvas.height / 2;

      // Expanding rings
      const maxRadius = Math.max(canvas.width, canvas.height);
      for (let i = 0; i < 5; i++) {
        const radius = ((time * 2 + i * 200) % maxRadius);
        ctx.strokeStyle = `rgba(255, 122, 0, ${0.1 * (1 - radius / maxRadius)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      particles.forEach((p) => {
        p.update({ speed: 0.4, repel: true });
        ctx.fillStyle = `rgba(255, 122, 0, ${p.opacity})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      });
    };

    const animate = () => {
      time++;
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
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-[-1] opacity-70 mix-blend-screen" />;
};

export default InteractiveBackground;

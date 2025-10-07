// src/scripts/fondoParticulas.js
(() => {
  // Crear canvas y añadirlo al div #particles-js
  const container = document.getElementById('particles-js');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = container.clientWidth;
  let height = container.clientHeight;
  canvas.width = width;
  canvas.height = height;

  // Configuración
  const config = {
    particleCount: 70,
    particleRadius: { min: 1, max: 3 },
    speed: { min: 0.1, max: 0.6 },
    colors: ['#4cafef', '#a64dff', '#4dff88', '#ff4da6', '#ffd24d'],
    linkDistance: 130,
    linkOpacity: 0.12,
    mouseRadius: 150
  };

  let particles = [];
  let mouseX = null;
  let mouseY = null;
  let animationId;

  // Clase Partícula
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * config.speed.max;
      this.vy = (Math.random() - 0.5) * config.speed.max;
      this.radius = Math.random() * (config.particleRadius.max - config.particleRadius.min) + config.particleRadius.min;
      this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
    }

    update() {
      // Rebote suave en bordes
      if (this.x <= 0 || this.x >= width) this.vx *= -0.95;
      if (this.y <= 0 || this.y >= height) this.vy *= -0.95;

      // Interacción con mouse
      if (mouseX !== null && mouseY !== null) {
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < config.mouseRadius) {
          const force = (config.mouseRadius - distance) / config.mouseRadius;
          this.vx -= (dx / distance) * force * 0.8;
          this.vy -= (dy / distance) * force * 0.8;
        }
      }

      this.x += this.vx;
      this.y += this.vy;

      // Fricción
      this.vx *= 0.99;
      this.vy *= 0.99;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  // Inicializar partículas
  const init = () => {
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
      particles.push(new Particle());
    }
  };

  // Dibujar conexiones
  const drawConnections = () => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.linkDistance) {
          const opacity = (1 - distance / config.linkDistance) * config.linkOpacity;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(76, 175, 239, ${opacity})`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  };

  // Animación
  const animate = () => {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => p.update());
    drawConnections();
    particles.forEach(p => p.draw());
    animationId = requestAnimationFrame(animate);
  };

  // Eventos
  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  };

  const handleMouseLeave = () => {
    mouseX = null;
    mouseY = null;
  };

  const handleResize = () => {
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
    init();
  };

  // Iniciar
  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);
  window.addEventListener('resize', handleResize);

  init();
  animate();

  // Limpieza (útil en desarrollo con HMR)
  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      container.removeChild(canvas);
    });
  }
})();
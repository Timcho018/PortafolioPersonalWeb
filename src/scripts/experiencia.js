document.addEventListener('DOMContentLoaded', () => {

  // === LOADER MODULAR 3D ===
  const grid = document.getElementById('letter-grid');
  const loader = document.getElementById('modular-loader');
  const content = document.getElementById('experience-content');
  const word = "EXPERIENCIA";

  word.split('').forEach((char, i) => {
    const block = document.createElement('div');
    block.className = 'letter-block';
    ['front','back','top','bottom','left','right'].forEach(face => {
      const f = document.createElement('div');
      f.className = `letter-face ${face}`;
      f.textContent = char;
      block.appendChild(f);
    });
    grid.appendChild(block);
  });

  setTimeout(() => {
    document.querySelectorAll('.letter-block').forEach((b, i) => {
      b.style.opacity = '0';
      b.style.transform = 'translateY(40px) rotateX(-20deg) rotateY(10deg)';
      setTimeout(() => {
        b.style.transition = 'opacity 0.5s, transform 0.8s cubic-bezier(0.165,0.84,0.44,1)';
        b.style.opacity = '1';
        b.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
      }, i * 70);
    });
  }, 200);

  setTimeout(() => {
  const l = document.getElementById('modular-loader');
  if (l) {
    l.style.opacity = '0';
    l.style.transition = 'opacity 0.6s';
    setTimeout(() => {
      l.remove();
      // 🔹 Mostrar contenido con transición
      const content = document.getElementById('experience-content');
      if (content) {
        content.style.opacity = '1';
        content.style.transition = 'opacity 0.8s ease';
      }
    }, 600);
  }
}, 2100);


  // === CURSOR PERSONALIZADO ===
  const cursorDot = document.getElementById('cursor-dot');
  const cursorTrail = document.getElementById('cursor-trail');
  let mouseX = 0, mouseY = 0, posX = 0, posY = 0, trailX = 0, trailY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateCursor = () => {
    posX += (mouseX - posX) / 6;
    posY += (mouseY - posY) / 6;
    trailX += (mouseX - trailX) / 10;
    trailY += (mouseY - trailY) / 10;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorTrail.style.left = `${trailX}px`;
    cursorTrail.style.top = `${trailY}px`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  // === 3D TARJETAS ===
  const cards = document.querySelectorAll('.exp-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = ((x - rect.width / 2) / 15);
      const rotateX = ((rect.height / 2 - y) / 15);
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
    });
  });

  // === CURSOR HOVER ===
  const interactives = document.querySelectorAll('.exp-card, .exp-card a, .exp-card *');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(3)';
      cursorDot.style.background = 'rgba(0,247,255,0.9)';
      cursorTrail.style.transform = 'translate(-50%, -50%) scale(0.3)';
      cursorTrail.style.opacity = '0.15';
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorDot.style.background = '#00f7ff';
      cursorTrail.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorTrail.style.opacity = '0.6';
    });
  });

  // === PARTÍCULAS ===
  const particlesContainer = document.getElementById('particles-js');
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  particlesContainer.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 0.5;
      this.speedX = Math.random() * 1.2 - 0.6;
      this.speedY = Math.random() * 1.2 - 0.6;
      this.color = `hsl(${Math.random() * 360}, 80%, 70%)`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
      if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    const count = Math.min(150, Math.floor((canvas.width * canvas.height) / 6000));
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', resize);
  resize();
  animateParticles();
});
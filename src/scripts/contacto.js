// /src/scripts/contacto.js

// === 1. FONDO DE PARTÍCULAS (con tsParticles desde CDN) ===
const loadParticles = () => {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js';
  script.onload = () => {
    tsParticles.load('particles-js', {
      fpsLimit: 60,
      particles: {
        number: { value: 70, density: { enable: true, area: 800 } },
        color: { value: ['#4cafef', '#a64dff', '#4dff88', '#ff4da6', '#ffd24d'] },
        shape: { type: 'circle' },
        opacity: { value: 0.45, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
        size: { value: 2.8, random: true, anim: { enable: true, speed: 2, size_min: 0.5 } },
        move: { enable: true, speed: 1.4, direction: 'none', random: true, straight: false, outModes: { default: 'out' } },
        links: { enable: true, distance: 110, color: '#ffffff', opacity: 0.18, width: 1 }
      },
      interactivity: {
        detectsOn: 'canvas',
        events: {
          onHover: { enable: true, mode: 'grab' },
          onClick: { enable: true, mode: 'push' },
          resize: true
        },
        modes: {
          grab: { distance: 130, links: { opacity: 0.35 } },
          push: { quantity: 3 }
        }
      },
      detectRetina: true
    });
  };
  document.head.appendChild(script);
};

// === 2. CURSOR PERSONALIZADO ===
const initCursor = () => {
  const dot = document.getElementById('cursorNeb');
  const trail = document.getElementById('cursorNebTrail');
  if (!dot || !trail) return;

  let mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  let pos = { x: mouse.x, y: mouse.y };

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    dot.style.left = mouse.x + 'px';
    dot.style.top = mouse.y + 'px';
  });

  const lerp = (a, b, n) => (1 - n) * a + n * b;

  const animate = () => {
    pos.x = lerp(pos.x, mouse.x, 0.12);
    pos.y = lerp(pos.y, mouse.y, 0.12);
    trail.style.left = pos.x + 'px';
    trail.style.top = pos.y + 'px';
    requestAnimationFrame(animate);
  };

  animate();

  const hoverEls = document.querySelectorAll('a, button, .bubble, .input-ghost, .panel, nav a');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1.9)';
      trail.style.transform = 'translate(-50%, -50%) scale(1.1)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      trail.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
};

// === 3. LOADER MODULAR 3D ===
const initLoader = () => {
  const grid = document.getElementById('letter-grid');
  const loader = document.getElementById('modular-loader');
  const content = document.getElementById('contact-content');
  const word = "CONTACTO";

  word.split('').forEach((char, i) => {
    const block = document.createElement('div');
    block.className = 'letter-block';
    ['front', 'back', 'top', 'bottom', 'left', 'right'].forEach(face => {
      const faceEl = document.createElement('div');
      faceEl.className = `letter-face ${face}`;
      faceEl.textContent = char;
      block.appendChild(faceEl);
    });
    grid.appendChild(block);
  });

  setTimeout(() => {
    document.querySelectorAll('.letter-block').forEach((block, i) => {
      setTimeout(() => {
        block.style.opacity = '1';
        block.style.transform = 'translateY(40px) rotateX(-20deg) rotateY(10deg)';
        block.style.transition = 'opacity 0.5s, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        block.querySelectorAll('.letter-face').forEach(face => {
          face.style.transition = 'transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        });
      }, i * 80);
    });
  }, 200);

  setTimeout(() => {
    document.querySelectorAll('.letter-block').forEach(block => {
      block.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
  }, 1200);

  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.6s';
    setTimeout(() => {
      loader.style.display = 'none';
      content.style.opacity = '1';
    }, 600);
  }, 2100);
};

// === INICIAR TODO CUANDO EL DOM ESTÉ LISTO ===
document.addEventListener('DOMContentLoaded', () => {
  loadParticles();
  initCursor();
  initLoader();
});

// Tu lógica de formulario (si la tienes) puede ir aquí abajo
// Ejemplo:
// document.getElementById('contactForm')?.addEventListener('submit', (e) => { ... });
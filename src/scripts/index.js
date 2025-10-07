// index-loader.js — TRANSICIÓN SUAVE POST-LOADER
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('experience-style-loader');
  const lines = document.querySelectorAll('.terminal-body .line');
  const glitchOverlay = document.querySelector('.glitch-overlay');
  const content = document.getElementById('home-content');

  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= lines.length) {
      // Glitch final
      glitchOverlay.style.opacity = '1';
      glitchOverlay.style.animation = 'terminalGlitch 0.6s ease';
      
      setTimeout(() => {
        // Desvanecer loader con elegancia
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
        
        setTimeout(() => {
          loader.style.display = 'none';
          
          // Micro-pausa dramática (100ms)
          setTimeout(() => {
            // Mostrar contenido con fade suave
            content.style.opacity = '1';
            content.style.transition = 'opacity 0.9s cubic-bezier(0.165, 0.84, 0.44, 1)';
            
            // Forzar reflow para que las animaciones CSS nativas se activen
            void content.offsetWidth;
            
            // Añadir clase para disparar animaciones internas (opcional, pero seguro)
            content.classList.add('loaded');
          }, 100);
        }, 600);
      }, 600);
      return;
    }

    const line = lines[lineIndex];
    line.style.animation = 'lineIn 0.6s forwards';
    
    if (line.classList.contains('auth')) {
      setTimeout(() => {
        lineIndex++;
        typeLine();
      }, 1200);
    } else {
      setTimeout(() => {
        lineIndex++;
        typeLine();
      }, Math.random() * 400 + 300);
    }
  }

  setTimeout(typeLine, 500);
});
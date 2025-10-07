document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('letter-grid');
  const loader = document.getElementById('modular-loader');
  const content = document.getElementById('projects-content');
  const word = "PROYECTOS";

  // Crear bloques 3D para cada letra
  word.split('').forEach((char, i) => {
    const block = document.createElement('div');
    block.className = 'letter-block';
    block.style.setProperty('--delay', `${i * 0.08}s`);
    
    const faces = ['front', 'back', 'top', 'bottom', 'left', 'right'];
    faces.forEach(face => {
      const faceEl = document.createElement('div');
      faceEl.className = `letter-face ${face}`;
      faceEl.textContent = char;
      block.appendChild(faceEl);
    });
    
    grid.appendChild(block);
  });

  // Iniciar animación
  setTimeout(() => {
    const blocks = document.querySelectorAll('.letter-block');
    blocks.forEach((block, i) => {
      setTimeout(() => {
        block.style.opacity = '1';
        block.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        block.style.transition = 'opacity 0.5s, transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        
        // Rotación inicial
        block.style.transform = 'translateY(40px) rotateX(-20deg) rotateY(10deg)';
        
        // Animar caras
        const faces = block.querySelectorAll('.letter-face');
        faces.forEach(face => {
          face.style.transition = 'transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        });
      }, i * 80);
    });
  }, 200);

  // Ensamblaje final
  setTimeout(() => {
    const blocks = document.querySelectorAll('.letter-block');
    blocks.forEach(block => {
      block.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
  }, 1200);

  // Disolución final
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.6s';
    
    setTimeout(() => {
      loader.style.display = 'none';
      content.style.opacity = '1';
    }, 600);
  }, 2100);
});
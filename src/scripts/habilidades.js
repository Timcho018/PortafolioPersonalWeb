document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('letter-grid');
  const word = "HABILIDADES";

  word.split('').forEach(char => {
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
      }, i * 80);
    });
  }, 200);

  setTimeout(() => {
    const loader = document.getElementById('modular-loader');
    if (loader) loader.remove();
  }, 2100);
});
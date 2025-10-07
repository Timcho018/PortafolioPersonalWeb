document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.timeline-item');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.12 });

  items.forEach(item => observer.observe(item));

  const bubbles = document.querySelectorAll('.bubble');
  bubbles.forEach((b, idx) => {
    const delay = parseInt(b.getAttribute('data-delay') || (idx * 100));
    setTimeout(() => b.classList.add('show'), delay + 180);
  });

  const wrap = document.querySelector('.holo-wrap');
  const photo = document.querySelector('.holo-photo');
  if (wrap && photo) {
    wrap.addEventListener('mousemove', (e) => {
      const r = wrap.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const rx = (dy / r.height) * -6;
      const ry = (dx / r.width) * 6;
      photo.style.transform = `translateZ(30px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    wrap.addEventListener('mouseleave', () => {
      photo.style.transform = 'translateZ(30px) rotateX(0deg) rotateY(0deg)';
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.cursor');
  const trail = document.querySelector('.cursor-trail');

  if (!cursor || !trail) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
  });
});
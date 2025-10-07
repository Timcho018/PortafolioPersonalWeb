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

function lerp(a, b, n) { return (1 - n) * a + n * b; }

function raf() {
  pos.x = lerp(pos.x, mouse.x, 0.12);
  pos.y = lerp(pos.y, mouse.y, 0.12);
  trail.style.left = pos.x + 'px';
  trail.style.top = pos.y + 'px';
  requestAnimationFrame(raf);
}
raf();

const hoverEls = document.querySelectorAll('a, button, .bubble, .holo-photo');
hoverEls.forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.style.transform = 'translate(-50%,-50%) scale(1.9)';
    trail.style.transform = 'translate(-50%,-50%) scale(1.08)';
  });
  el.addEventListener('mouseleave', () => {
    dot.style.transform = 'translate(-50%,-50%) scale(1)';
    trail.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

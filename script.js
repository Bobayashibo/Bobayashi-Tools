/* =============================================
   ボ林 Tool Showcase Portal - JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initCardTilt();
  initToolsAutomation();
});

/* =============================================
   Scroll Animations (Intersection Observer)
   ============================================= */
/* =============================================
   Tools Automation
   (Automatic Numbering, Coloring, and Delay)
   ============================================= */
function initToolsAutomation() {
  const wrappers = document.querySelectorAll('.tool-card-wrapper');
  const palette = [
    { primary: '#df5d4b', rgb: '223, 93, 75' },  // Red
    { primary: '#a2ef44', rgb: '162, 239, 68' },  // Lime
    { primary: '#4a86e8', rgb: '74, 134, 232' }, // Blue
    { primary: '#f6c48d', rgb: '246, 196, 141' }, // Orange
    { primary: '#f1b2d3', rgb: '241, 178, 211' }  // Pink
  ];

  wrappers.forEach((wrapper, index) => {
    const card = wrapper.querySelector('.tool-card');
    if (!card) return;

    // 1. Automatic Numbering (padded: 01, 02...)
    let numEl = card.querySelector('.tool-card-number');
    if (!numEl) {
      numEl = document.createElement('div');
      numEl.className = 'tool-card-number';
      card.appendChild(numEl);
    }
    numEl.textContent = (index + 1).toString().padStart(2, '0');

    // 2. Automatic Coloring (cycle through palette)
    const colorTheme = palette[index % palette.length];
    card.style.setProperty('--card-theme', colorTheme.primary);
    card.style.setProperty('--card-theme-rgb', colorTheme.rgb);

    // 3. Automatic Animation Delay (on wrapper since it has anim-item)
    wrapper.style.transitionDelay = `${index * 0.15}s`;
  });
}

function initScrollAnimations() {
  const animItems = document.querySelectorAll('.anim-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  animItems.forEach(item => observer.observe(item));
}

/* =============================================
   Card Tilt Effect
   ============================================= */
function initCardTilt() {
  const cards = document.querySelectorAll('.tool-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      requestAnimationFrame(() => {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* =============================================
   ボ林 Tool Showcase Portal - JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
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
    { primary: '#4a86e8', rgb: '74, 134, 232' }, // Blue
    { primary: '#f6a23c', rgb: '246, 162, 60' }, // Orange
    { primary: '#e91e63', rgb: '233, 30, 99' }   // Vivid Pink
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

    // Set variables on both wrapper and card for flexibility
    wrapper.style.setProperty('--card-theme', colorTheme.primary);
    wrapper.style.setProperty('--card-theme-rgb', colorTheme.rgb);
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

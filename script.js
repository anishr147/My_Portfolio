const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

function getInitialTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;

  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark';
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const toggleIcon = document.querySelector('#themeToggle .theme-toggle__icon');
  if (toggleIcon) toggleIcon.textContent = theme === 'light' ? '☀️' : '🌙';
}

// Theme toggle + persistence
document.addEventListener('DOMContentLoaded', () => {
  // apply initial theme asap
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  const themeToggle = document.querySelector('#themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.dataset.theme || 'dark';
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', nextTheme);
      applyTheme(nextTheme);
    });
  }

  const introOverlay = document.querySelector('#introOverlay');
  if (introOverlay) {
    window.setTimeout(() => {
      introOverlay.classList.add('intro-hidden');
      window.setTimeout(() => {
        introOverlay.remove();
      }, 700);
    }, 1800);
  }
});

// Open Gmail compose when email button is clicked, fallback to mailto
const emailBtn = document.querySelector('.btn-email');
if (emailBtn) {
  emailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const gmail = emailBtn.getAttribute('data-gmail');
    const mailto = emailBtn.getAttribute('href');
    // try to open Gmail compose in a new tab
    try {
      const win = window.open(gmail, '_blank');
      if (!win) {
        // popup blocked, fallback to mailto
        window.location.href = mailto;
      }
    } catch (err) {
      window.location.href = mailto;
    }
  });
}



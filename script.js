// mobile menu toggle
const burger = document.getElementById('burgerBtn');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('mobile-open');
  burger.setAttribute('aria-expanded', isOpen);
});

// mobile dropdown toggle (click instead of hover under 980px)
document.querySelectorAll('.nav-links > li').forEach((li) => {
  const link = li.querySelector('a');
  const dropdown = li.querySelector('.dropdown');
  if (!dropdown) return;
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 980) {
      e.preventDefault();
      const isOpen = li.classList.toggle('open');
      li.setAttribute('aria-expanded', isOpen);
    }
  });
});

// estimator logic
const tiers = {
  'off-grid': {
    tier: 'Full Off-Grid System',
    desc: 'Built to run independently of PHCN — solar and battery sized to cover your home around the clock.',
  },
  'hybrid-heavy': {
    tier: 'Heavy-Duty Hybrid System',
    desc: 'A larger battery bank to bridge long outages, with solar topping it back up every day.',
  },
  'hybrid-light': {
    tier: 'Standard Hybrid System',
    desc: "Balanced solar and battery backup for the hours NEPA doesn't show up.",
  },
  'backup-light': {
    tier: 'Light Backup System',
    desc: 'A lean backup system for the occasional outage — efficient and affordable.',
  },
};
const estOptions = document.querySelectorAll('.est-option');
const resultBox = document.getElementById('estimatorResult');
estOptions.forEach((btn) => {
  btn.addEventListener('click', () => {
    estOptions.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const data = tiers[btn.dataset.tier];
    document.getElementById('resultTier').textContent = data.tier;
    document.getElementById('resultDesc').textContent = data.desc;
    resultBox.hidden = false;
  });
});

// scroll reveal
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
}

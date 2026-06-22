/* =========================================================
   HOME.JS — logic specific to index.html only
   (hero mini-estimator + scroll-reveal animation)
   ========================================================= */

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

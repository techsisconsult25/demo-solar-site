/* =========================================================
   STORE.JS — logic specific to store.html only
   (product data, rendering, category filter)

   To add a product later: just add an entry to PRODUCTS below.
   No HTML editing needed — the grid renders from this array.
   ========================================================= */

const PRODUCTS = [
  {
    name: '450W Monocrystalline Panel',
    category: 'panels',
    desc: 'High-efficiency PERC cell technology, built for Nigerian sun and heat.',
  },
  {
    name: '550W Monocrystalline Panel',
    category: 'panels',
    desc: 'Higher output per panel — ideal for larger arrays and commercial installs.',
  },
  {
    name: '3.5kVA Hybrid Inverter',
    category: 'inverters',
    desc: 'Ideal for starter and small home systems.',
  },
  {
    name: '5kVA Hybrid Inverter',
    category: 'inverters',
    desc: 'Our most popular size — built for family homes.',
  },
  {
    name: '10kVA Hybrid Inverter',
    category: 'inverters',
    desc: 'Engineered for business and commercial loads.',
  },
  {
    name: '100Ah Lithium Battery (12V)',
    category: 'batteries',
    desc: 'Compact, long cycle life, low maintenance.',
  },
  {
    name: '200Ah Lithium Battery (24V)',
    category: 'batteries',
    desc: 'Expandable battery banking for growing systems.',
  },
  {
    name: '200Ah Tubular Battery',
    category: 'batteries',
    desc: 'A budget-friendly backup option.',
  },
  {
    name: 'MC4 Solar Cable',
    category: 'accessories',
    desc: 'UV-resistant, sold per meter.',
  },
  {
    name: 'Mounting Rail Kit',
    category: 'accessories',
    desc: 'Roof and ground-mount compatible.',
  },
  {
    name: 'MPPT Charge Controller',
    category: 'accessories',
    desc: 'Maximises panel efficiency and battery life.',
  },
  {
    name: 'Battery Monitor Display',
    category: 'accessories',
    desc: "Real-time visibility into your system's health.",
  },
];

const CATEGORY_LABELS = {
  panels: 'Panels',
  inverters: 'Inverters',
  batteries: 'Batteries',
  accessories: 'Accessories',
};

const CATEGORY_ICONS = {
  panels:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="1"/><path d="M2 9h20M2 14h20M8 3v14M16 3v14"/></svg>',
  inverters:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h7l-1 8 11-13h-7l1-7z"/></svg>',
  batteries:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="16" height="10" rx="2"/><path d="M19 10h2v4h-2"/><path d="M7 10v4M11 10v4"/></svg>',
  accessories:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
};

function renderProducts() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = PRODUCTS.map(
    (p) => `
    <div class="product-card" data-category="${p.category}">
      <div class="icon">${CATEGORY_ICONS[p.category]}</div>
      <div class="cat-tag">${CATEGORY_LABELS[p.category]}</div>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <a href="contact.html?product=${encodeURIComponent(p.name)}" class="btn btn-outline-dark btn-small">Request Quote</a>
    </div>
  `,
  ).join('');
}
renderProducts();

const filterPills = document.querySelectorAll('.filter-pill');
filterPills.forEach((pill) => {
  pill.addEventListener('click', () => {
    filterPills.forEach((p) => p.classList.remove('active'));
    pill.classList.add('active');
    const filter = pill.dataset.filter;
    document.querySelectorAll('.product-card').forEach((card) => {
      card.style.display =
        filter === 'all' || card.dataset.category === filter ? '' : 'none';
    });
  });
});

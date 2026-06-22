/* =========================================================
   PARTIALS.JS — the shared header & footer.
   Edit the markup here ONCE and every page picks it up.

   HOW IT WORKS:
   1. Each page has two empty containers:
        <div id="site-header"></div>  ...page content...  <div id="site-footer"></div>
   2. This file defines the HTML for both as JS strings.
   3. Each page calls loadPartials('home') or loadPartials('estimator')
      right after loading this script, passing which page is "active"
      so the right nav link gets highlighted and Home/Services/Contact
      point to the correct place whether you're already on index.html
      or on a different page.

   No fetch(), no build step — this works straight off the file
   system (file://) as well as on any real web host.
   ========================================================= */

function getHeaderHTML(active) {
  const isHome = active === 'home';
  const isEstimator = active === 'estimator';
  const isAbout = active === 'about';
  const isServices = active === 'services';
  const isContact = active === 'contact';
  const isStore = active === 'store';
  const homeHref = isHome ? '#home' : 'index.html';

  return `
<div class="topbar">
  <div class="wrap">
    <div class="topbar-left">
      <a href="tel:+2348000000000"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> +234 7026766769</a>
      <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg> info@jimohsolar.com</span>
      <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Mon–Fri 8am–5pm · Support 24/7</span>
    </div>
    <div class="topbar-right">
      <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
      <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
      <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v1.5A5 5 0 0 1 16 8z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
    </div>
  </div>
</div>

<header class="nav">
  <div class="wrap">
    <a href="index.html" class="logo">
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="24" r="9" fill="var(--gold)"/>
        <g stroke="var(--espresso)" stroke-width="2" stroke-linecap="round">
          <line x1="20" y1="3" x2="20" y2="9"/>
          <line x1="6" y1="10" x2="10.5" y2="13.5"/>
          <line x1="34" y1="10" x2="29.5" y2="13.5"/>
        </g>
      </svg>
      <span>
        <span class="logo-text">Jimoh Solar</span>
        <span class="logo-sub">POWER &amp; ENERGY</span>
      </span>
    </a>

    <ul class="nav-links" id="navLinks">
      <li><a href="${homeHref}" class="${isHome ? 'current' : ''}">Home</a></li>
      <li>
        <a href="about.html" class="${isAbout ? 'current' : ''}">About <svg class="chev" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></a>
        <div class="dropdown">
          <a href="about.html#history" class="dd-primary">Our History</a>
          <a href="about.html#board">Board of Directors</a>
          <a href="about.html#management">Management Team</a>
          <a href="Jimoh-Solar-Datasheet.pdf" target="_blank">Jimoh Solar Datasheet</a>
          <a href="Jimoh-Solar-Brochure.pdf" target="_blank">Jimoh Solar Brochure</a>
        </div>
      </li>
      <li>
        <a href="services.html" class="${isServices ? 'current' : ''}">Services <svg class="chev" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg></a>
        <div class="dropdown">
          <a href="services.html#consultation" class="dd-primary">Consultation</a>
          <a href="services.html#design-assembly">System Design &amp; Assembly</a>
          <a href="services.html#component-sales">Component Sales</a>
          <a href="services.html#installation">Installation Services</a>
          <a href="services.html#repairs">Repairs &amp; Services</a>
          <a href="services.html#promotions">Promotions</a>
        </div>
      </li>
      <li><a href="store.html" class="${isStore ? 'current' : ''}">Store</a></li>
      <li><a href="estimator.html" class="${isEstimator ? 'current' : ''}">Energy Calculator</a></li>
      <li><a href="contact.html" class="${isContact ? 'current' : ''}">Contact Us</a></li>
    </ul>

    <div class="nav-cta">
      <a href="contact.html" class="btn btn-gold"><span>Get a Quote</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
      <button class="burger" id="burgerBtn" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>`;
}

const FOOTER_HTML = `
<footer>
  <div class="wrap">
    <div class="footer-grid">
      <div class="footer-brand">
        <span class="logo-text">Jimoh Solar</span>
        <p>We design and install reliable, custom-built solar power systems for homes and businesses across Nigeria — from first consultation to long-term support.</p>
        <div class="social-row">
          <a href="#" aria-label="Facebook"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
          <a href="#" aria-label="Instagram"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
          <a href="#" aria-label="LinkedIn"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V8h4v1.5A5 5 0 0 1 16 8z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
        </div>
      </div>
      <div>
        <h4>Our Services</h4>
        <div class="flinks">
          <a href="services.html#consultation">Consultation</a>
          <a href="services.html#design-assembly">System Design &amp; Assembly</a>
          <a href="services.html#component-sales">Component Sales</a>
          <a href="services.html#installation">Installation Services</a>
          <a href="services.html#repairs">Repairs &amp; Maintenance</a>
        </div>
      </div>
      <div>
        <h4>Quick Links</h4>
        <div class="flinks">
          <a href="index.html">Home</a>
          <a href="about.html">About Us</a>
          <a href="services.html">Services</a>
          <a href="store.html">Store</a>
          <a href="estimator.html">Energy Calculator</a>
          <a href="contact.html">Contact Us</a>
        </div>
      </div>
      <div>
        <h4>Contact</h4>
        <ul class="footer-contact">
          <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> +234 7026766769</li>
          <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg> info@jimohsolar.com</li>
          <li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Port Harcourt, Rivers State, Nigeria</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">© 2026 Jimoh Solar. All rights reserved.</div>
  </div>
</footer>`;

/* Injects the header/footer into the page and wires up the
   mobile menu + dropdown behaviour. Call this once, right after
   this script tag, passing the current page's id. */
function loadPartials(active) {
  document.getElementById('site-header').innerHTML = getHeaderHTML(active);
  document.getElementById('site-footer').innerHTML = FOOTER_HTML;

  const burger = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-open');
    burger.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.nav-links > li').forEach((li) => {
    const link = li.querySelector('a');
    const dropdown = li.querySelector('.dropdown');
    if (!dropdown) return;
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 980) {
        e.preventDefault();
        li.classList.toggle('open');
      }
    });
  });

  initScrollReveal();
}

/* Fades in any element with class="reveal" as it scrolls into view.
   Called automatically by loadPartials() — no need to repeat this
   in every page's own JS file. */
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document
      .querySelectorAll('.reveal')
      .forEach((el) => el.classList.add('in'));
    return;
  }
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
}

/* =========================================================
   CONTACT.JS — logic specific to contact.html only
   (state dropdown, FAQ accordion, form -> mailto handoff)
   ========================================================= */

const STATES = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT (Abuja)',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
];
function renderStates() {
  const select = document.getElementById('stateSelect');
  select.innerHTML =
    '<option value="">— Select your state —</option>' +
    STATES.map(
      (s) => `<option ${s === 'Rivers' ? 'selected' : ''}>${s}</option>`,
    ).join('');
}
renderStates();

/* pre-fill from Store page "Request Quote" links, e.g. contact.html?product=450W%20Panel */
const urlParams = new URLSearchParams(window.location.search);
const requestedProduct = urlParams.get('product');
if (requestedProduct) {
  document.getElementById('cMessage').value =
    `I'm interested in: ${requestedProduct}`;
  const quoteCheckbox = document.querySelector(
    'input[name="interest"][value="Solar System Quote"]',
  );
  if (quoteCheckbox) quoteCheckbox.checked = true;
}

/* FAQ accordion */
document.querySelectorAll('.faq-item').forEach((item) => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
      }
    });
    if (isOpen) {
      item.classList.remove('open');
      answer.style.maxHeight = null;
    } else {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

/* contact form -> builds a pre-filled email and hands off to the user's mail app.
   No backend here — for a live site, wire this to Formspree, Netlify Forms,
   or a serverless function instead and keep this as the client-side fallback. */
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const firstName = document.getElementById('cFirstName').value.trim();
  const lastName = document.getElementById('cLastName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const phone = document.getElementById('cPhone').value.trim();
  const state = document.getElementById('stateSelect').value;
  const message = document.getElementById('cMessage').value.trim();
  const consent = document.getElementById('cConsent').checked;
  const interests = Array.from(
    document.querySelectorAll('input[name="interest"]:checked'),
  ).map((el) => el.value);

  const emailOk = /\S+@\S+\.\S+/.test(email);
  if (!firstName || !lastName || !emailOk || !phone || !consent) {
    formNote.textContent =
      'Please fill in your name, a valid email, phone number, and accept the consent checkbox.';
    formNote.classList.add('show');
    formNote.style.background = '#fdecea';
    formNote.style.color = '#b3261e';
    return;
  }

  const body = `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nState: ${state || 'N/A'}\nInterested In: ${interests.length ? interests.join(', ') : 'N/A'}\n\nMessage:\n${message || '(no message provided)'}`;
  const mailtoLink =
    'mailto:info@jimohsolar.com?subject=' +
    encodeURIComponent('Website Enquiry from ' + firstName + ' ' + lastName) +
    '&body=' +
    encodeURIComponent(body);

  formNote.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg> Opening your email app with this message ready to send — hit send there to reach us. Prefer WhatsApp? Use the green button on the right instead.';
  formNote.classList.add('show');
  formNote.style.background = 'var(--cream)';
  formNote.style.color = 'var(--espresso)';

  window.location.href = mailtoLink;
});

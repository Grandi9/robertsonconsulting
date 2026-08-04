document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a, button').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const leadOverlay = document.getElementById('leadOverlay');
const leadClose = document.getElementById('leadClose');
const leadForm = document.getElementById('leadForm');
const leadFormState = document.getElementById('leadFormState');
const leadSuccessState = document.getElementById('leadSuccessState');

function openLeadModal() {
  leadOverlay.hidden = false;
  requestAnimationFrame(() => leadOverlay.classList.add('is-visible'));
  document.body.style.overflow = 'hidden';
  document.getElementById('leadEmail').focus();
}

function closeLeadModal() {
  leadOverlay.classList.remove('is-visible');
  document.body.style.overflow = '';
  setTimeout(() => {
    leadOverlay.hidden = true;
    leadForm.reset();
    leadFormState.hidden = false;
    leadSuccessState.hidden = true;
  }, 180);
}

document.querySelectorAll('.js-open-lead').forEach(btn => {
  btn.addEventListener('click', openLeadModal);
});

leadClose.addEventListener('click', closeLeadModal);

leadOverlay.addEventListener('click', (e) => {
  if (e.target === leadOverlay) closeLeadModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !leadOverlay.hidden) closeLeadModal();
});

const LEAD_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyAkz-8nVBURbbbJ7ldprSmyRkZIhVL0RgpUG_jQWRxqLD-rzgxjn0ywhV52rDgpkzlgA/exec';

leadForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const submitBtn = leadForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  const payload = {
    email: document.getElementById('leadEmail').value,
    message: document.getElementById('leadMessage').value
  };

  fetch(LEAD_ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload)
  })
    .catch(() => {
      // Apps Script web apps don't return readable CORS responses in no-cors
      // mode, so network-level failures are the only errors we can catch.
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send';
      leadFormState.hidden = true;
      leadSuccessState.hidden = false;
    });
});

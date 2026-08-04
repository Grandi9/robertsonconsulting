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

leadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  leadFormState.hidden = true;
  leadSuccessState.hidden = false;
});

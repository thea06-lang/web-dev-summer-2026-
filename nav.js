// Mobile nav toggle: below 600px, style.css hides .nav-links until it has
// the "open" class (see the max-width: 600px media query).
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.querySelector('.nav-links');

// Clicking the hamburger opens/closes the dropdown and keeps aria-expanded
// in sync so screen readers report the menu's current state.
hamburgerBtn.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Clicking any link closes the menu, so it doesn't stay open after
// navigating to the next page.
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  });
});

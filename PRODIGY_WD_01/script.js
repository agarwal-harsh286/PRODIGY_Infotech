window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 50) {
      nav.classList.add('scrolled');
  } else {
      nav.classList.remove('scrolled');
  }
});

function toggleMenu() {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('active');
}
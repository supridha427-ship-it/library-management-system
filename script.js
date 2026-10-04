const slides = [...document.querySelectorAll('.slide')];
const navButtons = [...document.querySelectorAll('.nav-link')];
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const label = document.querySelector('#slide-label');
const names = ['HOME', 'BOOKS', 'CONTACT'];
let current = 0;

function showSlide(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    const active = i === current;
    slide.hidden = !active;
    slide.classList.toggle('active', active);
  });
  navButtons.forEach((button, i) => {
    const active = i === current;
    button.classList.toggle('active', active);
    if (active) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  });
  previous.disabled = current === 0;
  next.disabled = current === slides.length - 1;
  label.textContent = names[current];
  history.replaceState(null, '', `#${slides[current].id}`);
}

navButtons.forEach((button, i) => button.addEventListener('click', () => showSlide(i)));
document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => {
  const target = slides.findIndex(slide => slide.id === button.dataset.go);
  if (target >= 0) showSlide(target);
}));
previous.addEventListener('click', () => showSlide(current - 1));
next.addEventListener('click', () => showSlide(current + 1));
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') showSlide(current + 1);
  if (event.key === 'ArrowLeft') showSlide(current - 1);
});

const initial = slides.findIndex(slide => slide.id === location.hash.slice(1));
showSlide(initial >= 0 ? initial : 0);

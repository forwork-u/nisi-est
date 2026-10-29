/* 西新エステート 会社概要 */
(() => {
  // ---- Hamburger menu ----
  const menu = document.getElementById('menu');
  const burger = document.querySelector('.header__burger');
  const closeBtn = document.querySelector('.menu__close');
  const setMenu = (open) => {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    burger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('is-locked', open);
  };
  burger.addEventListener('click', () => setMenu(true));
  closeBtn.addEventListener('click', () => setMenu(false));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  // ---- Scroll reveal ----
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.js-reveal').forEach(el => io.observe(el));

  // ---- Parallax: hero image, arc, contact circle ----
  const heroImg = document.querySelector('.js-hero-img');
  const arc = document.querySelector('.js-hero-arc');
  const circle = document.querySelector('.contact__circle');
  let ticking = false;
  const onScroll = () => {
    const vh = window.innerHeight, y = window.scrollY;
    if (heroImg) heroImg.style.transform = `translateY(${Math.min(y * 0.3, vh * 0.3)}px)`;
    if (arc) {
      const p = Math.min(1, y / (vh * 0.8));
      arc.style.transform = `translate(-50%, calc(-14vw - ${p * 22}vw)) scaleX(${1 + p * 0.25})`;
    }
    if (circle) {
      const r = circle.parentElement.getBoundingClientRect();
      circle.style.transform = `rotate(${(vh - r.top) * 0.05}deg) translateY(${(r.top - vh / 2) * 0.08}px)`;
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();
})();

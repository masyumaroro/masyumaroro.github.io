// ヘッダースクロール効果
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ハンバーガーメニュー
const hamburger = document.querySelector('.hamburger');
const mainNav = document.querySelector('.main-nav');

if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mainNav.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
      hamburger.classList.remove('open');
      mainNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

// ヒーロースライダー
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
const progress = document.querySelector('.slider-progress');
const INTERVAL = 5000;

if (slides.length > 1) {
  let current = 0;
  let timer;

  function goToSlide(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    if (progress) {
      progress.style.transition = 'none';
      progress.style.width = '0%';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          progress.style.transition = `width ${INTERVAL}ms linear`;
          progress.style.width = '100%';
        });
      });
    }
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => goToSlide(current + 1), INTERVAL);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goToSlide(i); startTimer(); });
  });

  goToSlide(0);
  startTimer();
}

// スクロールフェードイン
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

fadeEls.forEach((el) => observer.observe(el));

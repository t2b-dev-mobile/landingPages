/* ===========================
   Testimonials Carousel
   =========================== */
(function () {
  const track = document.querySelector('.car-track');
  if (!track) return;

  const prev = document.querySelector('.car-prev');
  const next = document.querySelector('.car-next');
  const viewport = document.querySelector('.car-viewport');
  const dotsWrap = document.querySelector('.dots');

  let index = 0;
  let cards = Array.from(track.children);

  function cardWidth() {
    const w = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap || 0);
    return w + gap;
  }

  function updateDots() {
    dotsWrap.innerHTML = '';
    cards.forEach((_, i) => {
      const b = document.createElement('button');
      if (i === index) b.classList.add('active');
      b.addEventListener('click', () => {
        index = i;
        move();
      });
      dotsWrap.appendChild(b);
    });
  }

  function move() {
    track.style.transform = `translateX(${-index * cardWidth()}px)`;
    dotsWrap.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === index));
  }

  prev.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    move();
  });

  next.addEventListener('click', () => {
    index = Math.min(cards.length - 1, index + 1);
    move();
  });

  window.addEventListener('resize', move);
  updateDots();
  move();
})();

/* ===========================
   Video Play Handler
   =========================== */
document.querySelectorAll('.video-frame .play')?.forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Play video placeholder'); // swap with real embed if/when provided
  });
});

/* ===========================
   Email Form Handler
   =========================== */
document.querySelector('.mailer')?.addEventListener('submit', e => {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  if (input && input.value) {
    alert('Thanks! We\'ll send your copy shortly.');
    input.value = '';
  }
});

/* ===========================
   Smooth Scroll for Navigation
   =========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

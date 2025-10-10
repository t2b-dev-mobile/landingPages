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
  const cardsPerView = 3; // Show 3 cards at a time
  const maxIndex = Math.max(0, cards.length - cardsPerView);

  function getScrollAmount() {
    // Calculate based on one card width + gap
    const cardElement = cards[0];
    const cardWidth = cardElement.offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap || 0);
    return cardWidth + gap;
  }

  function updateDots() {
    dotsWrap.innerHTML = '';
    const totalDots = maxIndex + 1;
    for (let i = 0; i <= maxIndex; i++) {
      const b = document.createElement('button');
      if (i === index) b.classList.add('active');
      b.addEventListener('click', () => {
        index = i;
        move();
      });
      dotsWrap.appendChild(b);
    }
  }

  function move() {
    const offset = -index * getScrollAmount();
    track.style.transform = `translateX(${offset}px)`;
    
    // Update dots
    dotsWrap.querySelectorAll('button').forEach((b, i) => {
      b.classList.toggle('active', i === index);
    });
    
    // Update button states
    prev.disabled = index === 0;
    next.disabled = index >= maxIndex;
  }

  prev.addEventListener('click', () => {
    if (index > 0) {
      index--;
      move();
    }
  });

  next.addEventListener('click', () => {
    if (index < maxIndex) {
      index++;
      move();
    }
  });

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      move();
    }, 100);
  });

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

/* ═══════════════════════════════════════════
   THE LEDGER — script.js
   ═══════════════════════════════════════════ */

/* ── DATELINE ── */
(function setDateline() {
  const el = document.getElementById('dateline');
  if (!el) return;
  const now = new Date();
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  el.textContent = now.toLocaleDateString('en-US', opts).toUpperCase();
})();


/* ── STICKY HEADER SHADOW ── */
(function stickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ── MOBILE NAV TOGGLE ── */
(function mobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');
  if (!toggle || !navList) return;

  toggle.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);

    // Animate hamburger → X
    const spans = toggle.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu on link click
  navList.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      const spans = toggle.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
})();


/* ── SCROLL REVEAL ── */
(function scrollReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(item => observer.observe(item));
})();


/* ── TICKER DUPLICATION (seamless loop) ── */
(function duplicateTicker() {
  const inner = document.getElementById('ticker-inner');
  if (!inner) return;
  // Clone children to create seamless loop
  const clone = inner.cloneNode(true);
  inner.parentElement.appendChild(clone);
})();


/* ── FACT OF THE DAY ── */
(function factRotator() {
  const facts = [
    "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid of Giza.",
    "The shortest war in history was between Britain and Zanzibar on 27 August 1896. Zanzibar surrendered after just 38 minutes.",
    "Oxford University is older than the Aztec Empire. Teaching began at Oxford around 1096 AD; the Aztec Empire was founded in 1428 AD.",
    "Napoleon was not particularly short. He stood around 5'7\" — average height for a Frenchman of his era. The myth arose partly from a British caricaturist.",
    "The Great Wall of China is not visible from space with the naked eye. This claim has been debunked by multiple astronauts.",
    "Ancient Romans used urine as a mouthwash because of its ammonia content. It was even taxed by Emperor Vespasian.",
    "The first elected female head of government was Sirimavo Bandaranaike of Ceylon (now Sri Lanka) in 1960.",
    "The word 'salary' comes from the Latin 'salarium,' linked to salt — a precious Roman commodity sometimes used to pay soldiers.",
    "Sweden has not been at war since 1814, making it one of the world's longest-running peacetime nations.",
    "Julius Caesar was kidnapped by pirates as a young man. After his release, he returned with a fleet, captured them, and had them crucified."
  ];

  let current = 0;
  const factEl = document.getElementById('fact-text');
  const nextBtn = document.getElementById('next-fact');

  function showFact(index) {
    if (!factEl) return;
    factEl.style.opacity = '0';
    setTimeout(() => {
      factEl.textContent = facts[index];
      factEl.style.opacity = '1';
    }, 350);
  }

  // Show random fact on load
  current = Math.floor(Math.random() * facts.length);
  if (factEl) {
    factEl.style.transition = 'opacity .35s ease';
    showFact(current);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      current = (current + 1) % facts.length;
      showFact(current);
    });
  }
})();


/* ── ACTIVE NAV LINK (demo – marks first by default, update as needed) ── */
(function activeNav() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', function () {
      links.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
})();


/* ── NEWSLETTER FORM (basic UX) ── */
(function newsletterForm() {
  const input = document.querySelector('.email-input');
  const btn   = document.querySelector('.btn-join');
  if (!input || !btn) return;

  btn.addEventListener('click', () => {
    const email = input.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      input.style.borderColor = '#b5321a';
      input.focus();
      setTimeout(() => { input.style.borderColor = ''; }, 1500);
      return;
    }
    btn.textContent = '✓ You\'re in!';
    btn.style.background = '#2a5c3f';
    input.value = '';
    input.disabled = true;
    btn.disabled   = true;
  });
})();

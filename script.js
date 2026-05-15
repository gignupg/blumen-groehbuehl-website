// Scroll-triggered fade-up reveal for sections.
// Adds [data-fade] to key elements at load, then promotes them to .is-in
// when they enter the viewport. Honors prefers-reduced-motion.

(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Elements that should fade in as they enter
  const selectors = [
    '.hero__inner > *',
    '.hero__figure',
    '.intro__heading',
    '.intro__prose p',
    '.credit',
    '.awards__list li',
    '.section-header > *',
    '.leistung',
    '.partner__title',
    '.partner__list li',
    '.galerie__item',
    '.aktion',
    '.kontakt__col',
  ];

  const nodes = document.querySelectorAll(selectors.join(', '));

  if (reduced) {
    nodes.forEach((n) => n.classList.add('is-in'));
    return;
  }

  nodes.forEach((n, i) => {
    n.dataset.fade = '';
    n.style.transitionDelay = `${Math.min(i * 35, 600)}ms`;
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
  );

  nodes.forEach((n) => io.observe(n));
})();

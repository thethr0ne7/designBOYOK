(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  const setMenu = (open) => {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded', String(open));
    mobileNav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };

  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileNav?.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 18);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (reducedMotion) return;

  if (window.Lenis) {
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    lenis.on('scroll', () => window.ScrollTrigger?.update());
    if (window.gsap) {
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  if (!window.gsap) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('[data-intro]', { y: 26, opacity: 0, duration: .75, stagger: .09 })
    .from('[data-route-stage]', { x: 30, opacity: 0, scale: .985, duration: .9 }, '-=.58')
    .from('[data-float-card]', { y: 14, opacity: 0, duration: .58, stagger: .1 }, '-=.42')
    .from('[data-car]', { x: 32, opacity: 0, duration: .65 }, '-=.45');

  gsap.to('[data-float-card]', { y: -5, duration: 2.8, stagger: .35, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  if (window.ScrollTrigger) {
    gsap.to('[data-route-path]', {
      strokeDashoffset: -150,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .8 }
    });

    gsap.utils.toArray('[data-reveal]').forEach((element) => {
      gsap.from(element, { y: 28, opacity: 0, duration: .78, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } });
    });

    gsap.from('[data-step]', { x: 24, opacity: 0, stagger: .1, duration: .62, ease: 'power2.out', scrollTrigger: { trigger: '.steps', start: 'top 78%', once: true } });
  }
})();

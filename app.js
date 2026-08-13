(() => {
  'use strict';

  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  const setMenu = (open) => {
    if (!menuButton || !mobileNav) return;

    menuButton.setAttribute('aria-expanded', String(open));
    mobileNav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  };

  menuButton?.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  mobileNav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  const updateHeader = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (!window.gsap) return;

  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const media = gsap.matchMedia();

  media.add('(prefers-reduced-motion: no-preference)', () => {
    const routePath = document.querySelector('[data-route-path]');
    const routeLength = routePath?.getTotalLength() ?? 0;

    if (routePath && routeLength) {
      gsap.set(routePath, {
        strokeDasharray: routeLength,
        strokeDashoffset: routeLength
      });
    }

    const intro = gsap.timeline({
      defaults: { ease: 'power3.out' }
    });

    intro
      .from('[data-hero-item]', {
        autoAlpha: 0,
        y: 18,
        duration: 0.54,
        stagger: 0.07
      })
      .from('[data-sheet]', {
        autoAlpha: 0,
        x: 24,
        duration: 0.62
      }, '-=0.38');

    if (routePath && routeLength) {
      intro.to(routePath, {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: 'power2.inOut'
      }, '-=0.34');
    }

    intro
      .from('[data-car]', {
        autoAlpha: 0,
        x: 36,
        duration: 0.72
      }, '-=0.72')
      .from('.route-axis li', {
        autoAlpha: 0,
        y: 8,
        duration: 0.28,
        stagger: 0.05
      }, '-=0.38');

    if (window.ScrollTrigger) {
      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 18,
          duration: 0.54,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true
          }
        });
      });
    }
  });

  media.add('(min-width: 64.0625rem) and (prefers-reduced-motion: no-preference)', () => {
    if (!window.ScrollTrigger) return;

    gsap.to('[data-car]', {
      xPercent: -4,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.7
      }
    });
  });

  if (window.ScrollTrigger) {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    document.querySelector('[data-car]')?.addEventListener('load', () => {
      ScrollTrigger.refresh();
    }, { once: true });
  }
})();

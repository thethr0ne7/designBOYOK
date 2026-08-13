(() => {
  'use strict';

  const refreshStyle = document.createElement('link');
  refreshStyle.rel = 'stylesheet';
  refreshStyle.href = './mobile-refresh-v5.css';
  document.head.appendChild(refreshStyle);

  const carPicture = document.querySelector('.route-diagram picture');
  const carImage = carPicture?.querySelector('[data-car]');
  if (carPicture && carImage) {
    carPicture.querySelectorAll('source').forEach((source) => source.remove());
    carImage.src = './assets/z4-g29-line.png';
    carImage.removeAttribute('width');
    carImage.removeAttribute('height');
    carImage.loading = 'eager';
    carImage.decoding = 'async';
  }

  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const menuLabel = menuButton?.querySelector('.sr-only');
  const mobileBreakpoint = window.matchMedia('(max-width: 52.5rem)');

  const setMenu = (open) => {
    if (!menuButton || !mobileNav) return;

    menuButton.setAttribute('aria-expanded', String(open));
    mobileNav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    if (menuLabel) menuLabel.textContent = open ? 'Закрыть меню' : 'Открыть меню';
  };

  menuButton?.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  mobileNav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      menuButton.focus();
    }
  });

  mobileBreakpoint.addEventListener('change', ({ matches }) => {
    if (!matches) setMenu(false);
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
        opacity: 0,
        y: 18,
        duration: 0.54,
        stagger: 0.07
      })
      .from('[data-sheet]', {
        opacity: 0,
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
        opacity: 0,
        x: 36,
        duration: 0.72
      }, '-=0.72')
      .from('.route-axis li', {
        opacity: 0,
        y: 8,
        duration: 0.28,
        stagger: 0.05
      }, '-=0.38');

    if (window.ScrollTrigger) {
      const reveal = (target, vars) => {
        gsap.from(target, {
          opacity: 0,
          duration: 0.54,
          ease: 'power3.out',
          ...vars,
          scrollTrigger: {
            trigger: typeof target === 'string' ? target : target,
            start: 'top 88%',
            once: true
          }
        });
      };

      gsap.utils.toArray('[data-reveal="heading"]').forEach((element) => reveal(element, { y: 18 }));
      reveal('[data-reveal="program"]', { x: 18 });
      reveal('[data-reveal="status"]', {});

      gsap.from('[data-reveal="steps"] > li', {
        opacity: 0,
        x: 14,
        duration: 0.44,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-reveal="steps"]',
          start: 'top 86%',
          once: true
        }
      });

      gsap.from('[data-reveal="documents"] > .document-row', {
        opacity: 0,
        x: 14,
        duration: 0.46,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-reveal="documents"]',
          start: 'top 88%',
          once: true
        }
      });

      reveal('[data-reveal="action"]', { y: 12 });
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

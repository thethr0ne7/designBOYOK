(() => {
  'use strict';

  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const menuLabel = menuButton?.querySelector('.sr-only');
  const mobileBreakpoint = window.matchMedia('(max-width: 52.5rem)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const setMenu = (open) => {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded', String(open));
    mobileNav.classList.toggle('is-open', open);
    body.classList.toggle('menu-open', open);
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
    header?.classList.toggle('is-scrolled', window.scrollY > 10);
  };

  const reveals = [...document.querySelectorAll('[data-reveal]')];
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add('is-visible'));
  }

  const routeExperience = document.querySelector('[data-route-experience]');
  const routeIntro = routeExperience?.querySelector('.route-intro');
  const routeCard = document.querySelector('[data-route-card]');
  const routeSteps = [...document.querySelectorAll('[data-route-step]')];
  const routeLabel = document.querySelector('[data-route-label]');
  const roadPattern = document.querySelector('.road-pattern');

  let rafId = null;
  let lastStep = -1;
  let lastProgress = '';
  let enterTimer = null;

  const triggerStepEntrance = (index) => {
    if (reducedMotion.matches) return;
    const step = routeSteps[index];
    if (!step) return;

    routeSteps.forEach((item) => item.classList.remove('is-entering'));
    step.classList.remove('is-entering');
    void step.offsetWidth;
    step.classList.add('is-entering');

    window.clearTimeout(enterTimer);
    enterTimer = window.setTimeout(() => step.classList.remove('is-entering'), 760);
  };

  const setRouteState = (progress, forceComplete = false) => {
    if (!routeCard || !routeSteps.length) return;

    const safeProgress = clamp(progress, 0, 1);
    const easedProgress = safeProgress < 0.5
      ? 2 * safeProgress * safeProgress
      : 1 - Math.pow(-2 * safeProgress + 2, 2) / 2;
    const progressPercent = `${(easedProgress * 100).toFixed(2)}%`;

    if (progressPercent !== lastProgress) {
      routeCard.style.setProperty('--route-progress', progressPercent);
      lastProgress = progressPercent;
    }

    const complete = forceComplete || safeProgress >= 0.992;
    const activeIndex = complete
      ? routeSteps.length - 1
      : Math.min(routeSteps.length - 1, Math.floor(safeProgress * routeSteps.length));

    routeSteps.forEach((step, index) => {
      const done = complete || index < activeIndex;
      const active = !complete && index === activeIndex;
      step.classList.toggle('is-done', done);
      step.classList.toggle('is-active', active);
    });

    routeCard.classList.toggle('is-complete', complete);

    if (activeIndex !== lastStep) {
      if (!complete) triggerStepEntrance(activeIndex);
      if (routeLabel) {
        routeLabel.textContent = complete ? '4 шага завершены' : `Шаг ${activeIndex + 1} из 4`;
      }
      lastStep = activeIndex;
    }
  };

  const getRouteProgress = () => {
    if (!routeExperience) return 0;

    const rect = routeExperience.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const headerHeight = header?.offsetHeight ?? 0;
    const mobile = window.innerWidth < 840;
    const introOffset = mobile ? (routeIntro?.offsetHeight ?? 0) + 22 : 0;

    const start = sectionTop + introOffset - headerHeight - 8;
    const end = sectionTop + routeExperience.offsetHeight - window.innerHeight + headerHeight;
    const distance = Math.max(1, end - start);

    return clamp((window.scrollY - start) / distance, 0, 1);
  };

  const updateRoute = () => {
    if (!routeExperience || !routeCard) return;

    if (reducedMotion.matches) {
      setRouteState(1, true);
      return;
    }

    setRouteState(getRouteProgress());
  };

  const updatePattern = () => {
    if (!roadPattern || reducedMotion.matches) return;

    const y = clamp(window.scrollY * 0.035, 0, 54);
    const x = Math.sin(window.scrollY / 680) * 8;
    roadPattern.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(1.05)`;
  };

  const updateFrame = () => {
    rafId = null;
    updateHeader();
    updateRoute();
    updatePattern();
  };

  const requestFrame = () => {
    if (rafId !== null) return;
    rafId = requestAnimationFrame(updateFrame);
  };

  window.addEventListener('scroll', requestFrame, { passive: true });
  window.addEventListener('resize', requestFrame, { passive: true });
  reducedMotion.addEventListener('change', () => {
    lastStep = -1;
    requestFrame();
  });
  document.fonts?.ready.then(requestFrame);

  updateHeader();
  updateRoute();
  updatePattern();
})();

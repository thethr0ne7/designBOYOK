(() => {
  'use strict';

  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menuButton = document.querySelector('[data-menu]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const menuLabel = menuButton?.querySelector('.sr-only');
  const mobileBreakpoint = window.matchMedia('(max-width: 52.5rem)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const routeStage = document.querySelector('[data-route-stage]');
  const routeCard = document.querySelector('[data-route-card]');
  const routeSteps = [...document.querySelectorAll('[data-route-step]')];
  const routeStates = routeSteps.map((step) => step.querySelector('.route-state'));

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const smoothstep = (value) => value * value * (3 - 2 * value);

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

  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -7% 0px', threshold: 0.08 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  let frame = null;
  let lastActive = -1;
  let entranceTimer = null;

  const triggerStepEntrance = (index) => {
    if (reducedMotion.matches || index < 0) return;
    const step = routeSteps[index];
    if (!step) return;

    routeSteps.forEach((item) => item.classList.remove('is-entering'));
    step.classList.remove('is-entering');
    void step.offsetWidth;
    step.classList.add('is-entering');
    window.clearTimeout(entranceTimer);
    entranceTimer = window.setTimeout(() => step.classList.remove('is-entering'), 760);
  };

  const setRoute = (progress) => {
    if (!routeCard || !routeSteps.length) return;

    if (reducedMotion.matches) {
      routeCard.style.setProperty('--route-progress', '100%');
      routeCard.classList.add('is-complete');
      routeSteps.forEach((step, index) => {
        step.classList.add('is-done');
        step.classList.remove('is-active');
        if (routeStates[index]) routeStates[index].textContent = '✓';
      });
      return;
    }

    const safe = clamp(progress, 0, 1);
    const eased = smoothstep(safe);
    const complete = safe >= 0.985;
    const phase = Math.min(3.999, eased * 4);
    const activeIndex = complete ? 3 : Math.floor(phase);
    const local = phase - Math.floor(phase);
    const nodePositions = [0, 33.333, 66.666, 100, 100];
    const segmentIndex = Math.min(3, Math.floor(phase));
    const visualProgress = nodePositions[segmentIndex] + (nodePositions[segmentIndex + 1] - nodePositions[segmentIndex]) * local;

    routeCard.style.setProperty('--route-progress', `${visualProgress.toFixed(2)}%`);
    routeCard.classList.toggle('is-complete', complete);

    routeSteps.forEach((step, index) => {
      const done = complete || index < activeIndex;
      const active = !complete && index === activeIndex;
      step.classList.toggle('is-done', done);
      step.classList.toggle('is-active', active);

      const state = routeStates[index];
      if (!state) return;
      state.textContent = done ? '✓' : active ? 'Текущий' : String(index + 1);
      state.classList.toggle('route-state--current', active);
    });

    if (activeIndex !== lastActive && !complete) {
      triggerStepEntrance(activeIndex);
      lastActive = activeIndex;
    }
  };

  const getRouteProgress = () => {
    if (!routeStage) return 0;
    const rect = routeStage.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const headerHeight = header?.offsetHeight ?? 0;
    const start = absoluteTop - headerHeight - 12;
    const distance = Math.max(1, routeStage.offsetHeight - window.innerHeight + headerHeight + 24);
    return clamp((window.scrollY - start) / distance, 0, 1);
  };

  const update = () => {
    frame = null;
    header?.classList.toggle('is-scrolled', window.scrollY > 8);
    setRoute(getRouteProgress());
  };

  const requestUpdate = () => {
    if (frame !== null) return;
    frame = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  reducedMotion.addEventListener('change', () => {
    lastActive = -1;
    requestUpdate();
  });
  document.fonts?.ready.then(requestUpdate);

  update();
})();

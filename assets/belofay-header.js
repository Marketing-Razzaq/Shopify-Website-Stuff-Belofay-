(() => {
  const setupHeader = () => {
    const header = document.querySelector('[data-belofay-header]');
    if (!header) return;

    const group = document.body;
    if (!group || group.dataset.belofayHeaderReady === 'true') return;

    group.dataset.belofayHeaderReady = 'true';
    group.classList.add('belofay-site-header-group');
    group.classList.toggle('is-product', header.closest('.belofay-header--product') !== null);
    const headerSections = [...document.querySelectorAll('body > .shopify-section-group-header-group')];

    let previousY = window.scrollY;
    let ticking = false;

    const isInteracting = () => {
      if (headerSections.some((section) => section.contains(document.activeElement))) return true;
      if (headerSections.some((section) => section.querySelector('details[open]'))) return true;
      if (document.querySelector('cart-drawer.active, cart-notification.active')) return true;
      return false;
    };

    const update = () => {
      const currentY = Math.max(window.scrollY, 0);
      const delta = currentY - previousY;

      if (currentY <= 24) {
        group.classList.remove('is-hidden', 'is-condensed');
      } else {
        group.classList.add('is-condensed');
        if (!isInteracting() && delta > 5 && currentY > 110) {
          group.classList.add('is-hidden');
        } else if (delta < -3 || isInteracting()) {
          group.classList.remove('is-hidden');
        }
      }

      previousY = currentY;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    headerSections.forEach((section) => {
      section.addEventListener('focusin', () => group.classList.remove('is-hidden'));
      section.addEventListener('pointerenter', () => group.classList.remove('is-hidden'));
      section.addEventListener('toggle', () => group.classList.remove('is-hidden'), true);
    });
    update();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupHeader, { once: true });
  } else {
    setupHeader();
  }

  document.addEventListener('shopify:section:load', setupHeader);
})();

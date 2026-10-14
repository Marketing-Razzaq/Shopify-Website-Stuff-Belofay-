(() => {
  const key = 'belofay-wishlist';
  const read = () => { try { const value = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(value) ? value.map(String) : []; } catch { return []; } };
  const sync = () => document.querySelectorAll('.belofay-similar__wish').forEach(button => button.setAttribute('aria-pressed', String(read().includes(button.dataset.wishlistId))));
  const arrows = root => {
    const track = root.querySelector('.belofay-similar__track'); if (!track) return;
    root.querySelector('[data-carousel-direction="-1"]').disabled = track.scrollLeft <= 1;
    root.querySelector('[data-carousel-direction="1"]').disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  };
  document.addEventListener('click', event => {
    const wish = event.target.closest('.belofay-similar__wish');
    if (wish) { const ids = read(), id = wish.dataset.wishlistId; const next = ids.includes(id) ? ids.filter(value => value !== id) : [...ids, id]; try { localStorage.setItem(key, JSON.stringify(next)); sync(); } catch { wish.setAttribute('aria-pressed', String(wish.getAttribute('aria-pressed') !== 'true')); } return; }
    const arrow = event.target.closest('[data-carousel-direction]'); if (!arrow) return;
    const track = arrow.closest('.belofay-similar').querySelector('.belofay-similar__track');
    track.scrollBy({left: Number(arrow.dataset.carouselDirection) * track.clientWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
  });
  document.addEventListener('scroll', event => { if (event.target.classList?.contains('belofay-similar__track')) arrows(event.target.closest('.belofay-similar')); }, true);
  const refresh = () => { sync(); document.querySelectorAll('.belofay-similar').forEach(arrows); };
  new MutationObserver(refresh).observe(document.querySelector('main') || document.body, {childList:true,subtree:true});
  window.addEventListener('resize', refresh); window.addEventListener('storage', refresh); refresh();
})();

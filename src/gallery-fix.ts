const galleryRoutes = [
  '/products/motorbike-gloves/motorbike-gloves-03',
  '/products/fitness-gloves/fitness-gloves-04',
  '/products/golf-gloves/golf-gloves-05',
  '/products/cycling-gloves/cycling-gloves-05',
  '/products/rugby-gloves/rugby-gloves-07',
  '/products/tactical-gloves/tactical-gloves-06',
] as const;

const wireGallery = () => {
  // The current React Gallery renders .galleryTile cards without images or
  // .galleryArt. The previous fix targeted the old markup, so it never matched.
  document.querySelectorAll<HTMLElement>('.galleryGrid .galleryTile').forEach((card, index) => {
    const route = galleryRoutes[index];
    if (!route) return;

    card.style.cursor = 'pointer';
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Open ${card.querySelector('h3')?.textContent?.trim() || 'product'} detail`);

    if (card.dataset.galleryWired === 'true') return;
    card.dataset.galleryWired = 'true';

    const openProduct = () => {
      window.location.assign(route);
    };

    card.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.closest('a,button')) return;
      event.preventDefault();
      event.stopPropagation();
      openProduct();
    }, true);

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProduct();
      }
    });
  });
};

const startGalleryFix = () => {
  wireGallery();
  new MutationObserver(wireGallery).observe(document.body, { childList: true, subtree: true });
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startGalleryFix);
else startGalleryFix();

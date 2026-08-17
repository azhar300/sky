const galleryRoutes = [
  '/products/motorbike-gloves/motorbike-gloves-03',
  '/products/fitness-gloves/fitness-gloves-04',
  '/products/golf-gloves/golf-gloves-05',
  '/products/cycling-gloves/cycling-gloves-05',
  '/products/rugby-gloves/rugby-gloves-07',
  '/products/tactical-gloves/tactical-gloves-06',
] as const;

const wireGallery = () => {
  const cards = document.querySelectorAll<HTMLElement>('.galleryPage .galleryArt');
  cards.forEach((card, index) => {
    const route = galleryRoutes[index];
    if (!route) return;

    card.style.cursor = 'pointer';
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Open product ${index + 1} detail`);

    if (card.dataset.galleryWired === 'true') return;
    card.dataset.galleryWired = 'true';

    const openProduct = () => {
      // Keep navigation inside the React BrowserRouter so Cloudflare does not
      // receive a direct request for a nested SPA route.
      window.history.pushState({}, '', route);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
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

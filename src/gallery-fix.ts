const galleryRoutes: Record<string, string> = {
  'SLGI-MG-03': '/products/motorbike-gloves/motorbike-gloves-03',
  'SLGI-FG-04': '/products/fitness-gloves/fitness-gloves-04',
  'SLGI-GG-05': '/products/golf-gloves/golf-gloves-05',
  'SLGI-CG-05': '/products/cycling-gloves/cycling-gloves-05',
  'SLGI-RAG-07': '/products/rugby-gloves/rugby-gloves-07',
  'SLGI-TG-06': '/products/tactical-gloves/tactical-gloves-06',
};

const getCode = (card: Element) => {
  const image = card.querySelector('img');
  const src = image?.getAttribute('src') || '';
  const match = src.match(/SLGI-[A-Z]+-\d{2}/i);
  return match?.[0]?.toUpperCase() || '';
};

const wireGallery = () => {
  document.querySelectorAll<HTMLElement>('.galleryPage .galleryArt').forEach((card) => {
    const code = getCode(card);
    const route = galleryRoutes[code];
    if (!route) return;

    card.style.cursor = 'pointer';
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Open ${code} product detail`);

    if (card.dataset.galleryWired === 'true') return;
    card.dataset.galleryWired = 'true';

    // Use a real navigation instead of manually mutating history. This guarantees
    // the React SPA route is loaded even when another gallery overlay captures clicks.
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

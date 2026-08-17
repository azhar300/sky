const galleryRoutes = [
  '/products/motorbike-gloves/motorbike-gloves-03',
  '/products/fitness-gloves/fitness-gloves-04',
  '/products/golf-gloves/golf-gloves-05',
  '/products/cycling-gloves/cycling-gloves-05',
  '/products/rugby-gloves/rugby-gloves-07',
  '/products/tactical-gloves/tactical-gloves-06',
] as const;

const getGalleryCard = (target: EventTarget | null) => {
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLElement>('.galleryPage .galleryArt');
};

const wireGallery = () => {
  document.querySelectorAll<HTMLElement>('.galleryPage .galleryArt').forEach((card, index) => {
    const route = galleryRoutes[index];
    if (!route) return;
    card.style.cursor = 'pointer';
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Open product ${index + 1} detail`);
  });
};

const navigateToProduct = (card: HTMLElement) => {
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.galleryPage .galleryArt'));
  const index = cards.indexOf(card);
  const route = galleryRoutes[index];
  if (!route) return;
  window.location.assign(route);
};

const startGalleryFix = () => {
  wireGallery();

  // Use one document-level capture listener. This intentionally bypasses any
  // card-level click behavior and performs a real navigation to the existing
  // React product route.
  document.addEventListener('click', (event) => {
    const card = getGalleryCard(event.target);
    if (!card) return;
    event.preventDefault();
    event.stopPropagation();
    navigateToProduct(card);
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const card = getGalleryCard(event.target);
    if (!card) return;
    event.preventDefault();
    event.stopPropagation();
    navigateToProduct(card);
  }, true);

  new MutationObserver(wireGallery).observe(document.body, { childList: true, subtree: true });
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startGalleryFix);
else startGalleryFix();

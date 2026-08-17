const galleryRoutes = [
  '/products/motorbike-gloves/motorbike-gloves-03',
  '/products/fitness-gloves/fitness-gloves-04',
  '/products/golf-gloves/golf-gloves-05',
  '/products/cycling-gloves/cycling-gloves-05',
  '/products/rugby-gloves/rugby-gloves-07',
  '/products/tactical-gloves/tactical-gloves-06',
] as const;

const galleryProducts = [
  ['MotorBike Gloves 03', 'SLGI-MG-03'],
  ['Fitness Gloves 04', 'SLGI-FG-04'],
  ['Golf Gloves 05', 'SLGI-GG-05'],
  ['Cycling Gloves 05', 'SLGI-CG-05'],
  ['Rugby Gloves 07', 'SLGI-RAG-07'],
  ['Tactical Gloves 06', 'SLGI-TG-06'],
] as const;

const injectFreshGallery = () => {
  const page = document.querySelector<HTMLElement>('.galleryPage');
  if (!page || page.dataset.freshGallery === 'true') return;
  page.dataset.freshGallery = 'true';

  const grid = page.querySelector<HTMLElement>('.galleryGrid');
  if (!grid) return;

  const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c] || c));
  const cloudinary = (code: string) => `https://res.cloudinary.com/m2w7btvw/image/upload/f_auto,q_auto/${code}.png`;

  grid.innerHTML = galleryProducts.map(([name, code], index) => `
    <a class="freshGalleryCard" href="${galleryRoutes[index]}" aria-label="Open ${escapeHtml(name)} product page">
      <img src="${cloudinary(code)}" alt="${escapeHtml(name)}" loading="lazy" />
      <span class="freshGalleryShade"></span>
      <span class="freshGalleryNumber">${String(index + 1).padStart(2, '0')}</span>
      <span class="freshGalleryInfo">
        <small>SKYLINE / PRODUCT</small>
        <strong>${escapeHtml(name)}</strong>
        <em>${code}</em>
        <span class="freshGalleryButton">VIEW PRODUCT ↗</span>
      </span>
    </a>
  `).join('');

  if (!document.getElementById('fresh-gallery-styles')) {
    const style = document.createElement('style');
    style.id = 'fresh-gallery-styles';
    style.textContent = `
      .galleryPage .galleryGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
      .freshGalleryCard{position:relative;display:block;min-height:520px;overflow:hidden;border-radius:24px;background:#e9edf1;color:#fff;text-decoration:none;isolation:isolate;box-shadow:0 18px 45px rgba(0,0,0,.12);transition:transform .35s ease,box-shadow .35s ease}
      .freshGalleryCard:hover{transform:translateY(-6px);box-shadow:0 28px 60px rgba(0,0,0,.2)}
      .freshGalleryCard img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .7s ease}
      .freshGalleryCard:hover img{transform:scale(1.04)}
      .freshGalleryShade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.04) 30%,rgba(0,0,0,.78) 100%);z-index:1}
      .freshGalleryNumber{position:absolute;top:24px;left:24px;z-index:2;font-size:11px;font-weight:800;letter-spacing:.16em}
      .freshGalleryInfo{position:absolute;left:28px;right:28px;bottom:26px;z-index:2;display:flex;flex-direction:column;align-items:flex-start;gap:7px}
      .freshGalleryInfo small{font-size:10px;letter-spacing:.16em;opacity:.7}
      .freshGalleryInfo strong{font-size:27px;line-height:1.1}
      .freshGalleryInfo em{font-style:normal;font-size:10px;letter-spacing:.14em;opacity:.65}
      .freshGalleryButton{margin-top:10px;padding:10px 15px;border:1px solid rgba(255,255,255,.4);border-radius:999px;background:rgba(255,255,255,.1);font-size:10px;font-weight:800;letter-spacing:.12em;backdrop-filter:blur(10px)}
      @media(max-width:700px){.galleryPage .galleryGrid{grid-template-columns:1fr}.freshGalleryCard{min-height:430px}.freshGalleryInfo strong{font-size:22px}}
    `;
    document.head.appendChild(style);
  }
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectFreshGallery);
else injectFreshGallery();

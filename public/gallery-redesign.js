(() => {
  const categoryMap = {
    'SLGI-MG-03': ['motorbike-gloves', 'MotorBike Gloves', '03'],
    'SLGI-FG-04': ['fitness-gloves', 'Fitness Gloves', '04'],
    'SLGI-GG-05': ['golf-gloves', 'Golf Gloves', '05'],
    'SLGI-CG-05': ['cycling-gloves', 'Cycling Gloves', '05'],
    'SLGI-RAG-07': ['rugby-gloves', 'Rugby Gloves', '07'],
    'SLGI-TG-06': ['tactical-gloves', 'Tactical Gloves', '06']
  };

  const productPath = (code) => {
    const data = categoryMap[code];
    return data ? `/products/${data[0]}/${data[0]}-${data[2]}` : '/products';
  };

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const enhance = () => {
    const page = document.querySelector('.galleryPage');
    if (!page || page.dataset.redesigned === 'true') return;
    const grid = page.querySelector('.galleryGrid');
    if (!grid) return;

    page.dataset.redesigned = 'true';
    page.classList.add('galleryRedesigned');

    const title = page.querySelector('.galleryTitle');
    if (title) {
      title.insertAdjacentHTML('beforeend', '<div class="galleryIntroCopy">Explore selected Skyline products directly. Open any glove to view its full product presentation and request a quotation.</div>');
    }

    grid.querySelectorAll('.galleryArt').forEach((card, index) => {
      const img = card.querySelector('img');
      if (!img) return;
      const match = img.src.match(/(SLGI-[A-Z]+-\d{2})/i);
      const code = match ? match[1].toUpperCase() : '';
      const meta = categoryMap[code];
      if (!meta) return;

      card.classList.add('galleryProductCard');
      card.dataset.productCode = code;
      card.setAttribute('role', 'link');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `View ${meta[1]} ${meta[2]}`);

      const number = card.querySelector('span');
      if (number) number.textContent = String(index + 1).padStart(2, '0');

      card.insertAdjacentHTML('beforeend', `
        <div class="galleryCardShade"></div>
        <div class="galleryCardInfo">
          <div>
            <span class="galleryCategory">${meta[1]}</span>
            <strong>${meta[1]} ${meta[2]}</strong>
            <small>${code} · B2B PRODUCT</small>
          </div>
          <span class="galleryView">VIEW PRODUCT <span>↗</span></span>
        </div>
      `);

      const go = (event) => {
        event.preventDefault();
        event.stopPropagation();
        navigate(productPath(code));
      };
      card.addEventListener('click', go);
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') go(event);
      });
    });
  };

  const start = () => {
    enhance();
    new MutationObserver(enhance).observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();

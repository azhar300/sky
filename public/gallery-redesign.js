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

  const addStyles = () => {
    if (document.getElementById('skyline-gallery-redesign-styles')) return;
    const style = document.createElement('style');
    style.id = 'skyline-gallery-redesign-styles';
    style.textContent = `
      .galleryRedesigned .galleryTitle { display:grid; grid-template-columns:minmax(0,1fr) minmax(280px,420px); gap:48px; align-items:end; margin-bottom:36px; }
      .galleryRedesigned .galleryTitle h2 { max-width:760px; margin:0; }
      .galleryIntroCopy { color:#64748b; font-size:15px; line-height:1.75; max-width:390px; }
      .galleryRedesigned .galleryGrid { display:grid; grid-template-columns:repeat(12,minmax(0,1fr)); gap:18px; }
      .galleryRedesigned .galleryProductCard { position:relative; min-height:430px; grid-column:span 4; overflow:hidden; border-radius:24px; background:#e8edf2; cursor:pointer; isolation:isolate; box-shadow:0 14px 40px rgba(0,19,55,.08); transition:transform .45s cubic-bezier(.22,1,.36,1), box-shadow .45s ease; }
      .galleryRedesigned .galleryProductCard:nth-child(1), .galleryRedesigned .galleryProductCard:nth-child(6) { grid-column:span 6; min-height:500px; }
      .galleryRedesigned .galleryProductCard:hover { transform:translateY(-7px); box-shadow:0 24px 55px rgba(0,19,55,.17); }
      .galleryRedesigned .galleryProductCard img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition:transform .8s cubic-bezier(.22,1,.36,1), filter .5s ease; }
      .galleryRedesigned .galleryProductCard:hover img { transform:scale(1.055); }
      .galleryCardShade { position:absolute; inset:0; z-index:1; background:linear-gradient(180deg,rgba(0,19,55,.04) 25%,rgba(0,19,55,.12) 48%,rgba(0,19,55,.9) 100%); pointer-events:none; }
      .galleryCardInfo { position:absolute; z-index:2; left:26px; right:26px; bottom:24px; display:flex; align-items:flex-end; justify-content:space-between; gap:18px; color:#fff; }
      .galleryCardInfo > div { display:flex; flex-direction:column; gap:5px; }
      .galleryCategory { font-size:10px; font-weight:800; letter-spacing:.16em; text-transform:uppercase; opacity:.76; }
      .galleryCardInfo strong { font-size:22px; line-height:1.1; letter-spacing:-.02em; }
      .galleryCardInfo small { font-size:10px; letter-spacing:.13em; opacity:.66; }
      .galleryView { flex:none; border:1px solid rgba(255,255,255,.32); border-radius:999px; padding:11px 14px; font-size:10px; font-weight:800; letter-spacing:.12em; white-space:nowrap; background:rgba(255,255,255,.1); backdrop-filter:blur(12px); }
      .galleryView span { margin-left:7px; font-size:14px; }
      .galleryRedesigned .galleryProductCard > span:not(.galleryView) { position:absolute; z-index:3; top:22px; left:24px; color:#fff; font-size:11px; font-weight:800; letter-spacing:.14em; opacity:.85; }
      .galleryProductAnchor { position:absolute; inset:0; z-index:4; display:block; color:inherit; text-decoration:none; border-radius:inherit; }
      .galleryProductAnchor:focus-visible { outline:3px solid #fff; outline-offset:-6px; }
      @media (max-width:900px) { .galleryRedesigned .galleryTitle { grid-template-columns:1fr; gap:14px; } .galleryRedesigned .galleryProductCard, .galleryRedesigned .galleryProductCard:nth-child(1), .galleryRedesigned .galleryProductCard:nth-child(6) { grid-column:span 6; min-height:420px; } }
      @media (max-width:600px) { .galleryRedesigned .galleryGrid { grid-template-columns:1fr; } .galleryRedesigned .galleryProductCard, .galleryRedesigned .galleryProductCard:nth-child(1), .galleryRedesigned .galleryProductCard:nth-child(6) { grid-column:span 1; min-height:430px; } .galleryCardInfo { left:20px; right:20px; bottom:20px; } .galleryCardInfo strong { font-size:19px; } .galleryView { padding:9px 11px; } }
    `;
    document.head.appendChild(style);
  };

  const enhance = () => {
    const page = document.querySelector('.galleryPage');
    if (!page || page.dataset.redesigned === 'true') return;
    const grid = page.querySelector('.galleryGrid');
    if (!grid) return;

    page.dataset.redesigned = 'true';
    page.classList.add('galleryRedesigned');
    addStyles();

    const title = page.querySelector('.galleryTitle');
    if (title) title.insertAdjacentHTML('beforeend', '<div class="galleryIntroCopy">Explore selected Skyline products directly. Open any glove to view its full product presentation and request a quotation.</div>');

    grid.querySelectorAll('.galleryArt').forEach((card, index) => {
      const img = card.querySelector('img');
      if (!img) return;
      const match = img.src.match(/(SLGI-[A-Z]+-\d{2})/i);
      const code = match ? match[1].toUpperCase() : '';
      const meta = categoryMap[code];
      if (!meta) return;

      card.classList.add('galleryProductCard');
      card.dataset.productCode = code;
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
        <a class="galleryProductAnchor" href="${productPath(code)}" aria-label="Open ${meta[1]} ${meta[2]}"></a>
      `);
    });
  };

  const start = () => {
    enhance();
    new MutationObserver(enhance).observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();

(() => {
  const CLOUD = 'https://res.cloudinary.com/m2w7btvw/image/upload/f_auto,q_auto/';
  const img = (code) => `${CLOUD}${code}.png`;
  const gallery = [
    ['SLGI-MG-01','MotorBike'],['SLGI-MG-04','MotorBike'],
    ['SLGI-RAG-01','Rugby'],['SLGI-RAG-05','Rugby'],
    ['SLGI-GG-01','Golf'],['SLGI-GG-05','Golf'],
    ['SLGI-FG-01','Fitness'],['SLGI-FG-05','Fitness'],
    ['SLGI-CG-01','Cycling'],['SLGI-CG-05','Cycling'],
    ['SLGI-TG-01','Tactical'],['SLGI-TG-05','Tactical']
  ];

  const style = document.createElement('style');
  style.textContent = `
    .sky-oem-visual{display:grid!important;grid-template-columns:1fr 1fr;gap:18px;align-items:end;position:relative;min-height:430px;width:100%}
    .sky-oem-card{position:relative;background:linear-gradient(145deg,#fff,#f3f6fa);border:1px solid rgba(0,19,55,.1);border-radius:22px;padding:24px;min-height:320px;display:flex;align-items:center;justify-content:center;box-shadow:0 24px 60px rgba(0,19,55,.12);overflow:hidden}
    .sky-oem-card img{width:100%;height:260px;object-fit:contain!important;display:block!important;mix-blend-mode:normal!important;filter:none!important;position:relative!important}
    .sky-oem-card.branded{background:linear-gradient(145deg,#eef3f8,#fff)}
    .sky-oem-badge{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);background:#fff;border:1px solid rgba(0,19,55,.16);border-radius:10px;padding:8px 12px;box-shadow:0 10px 28px rgba(0,19,55,.15);z-index:2}
    .sky-oem-badge img{width:92px!important;height:auto!important;object-fit:contain!important}
    .sky-oem-box{position:absolute;right:-8px;bottom:-12px;width:155px;height:190px;background:linear-gradient(145deg,#001337,#082d61);border-radius:10px 10px 4px 4px;color:#fff;padding:24px 18px;box-shadow:0 24px 45px rgba(0,19,55,.28);transform:rotate(2deg);z-index:4;display:flex;flex-direction:column;justify-content:space-between}
    .sky-oem-box strong{font-size:22px;line-height:1.05;letter-spacing:.08em}.sky-oem-box span{font-size:9px;letter-spacing:.16em;opacity:.7}.sky-oem-box img{width:70px!important;height:auto!important;filter:brightness(0) invert(1)!important;mix-blend-mode:normal!important}
    .sky-oem-label{position:absolute;top:16px;left:18px;font-size:10px;letter-spacing:.18em;font-weight:700;color:#60708a}
    .sky-gallery-grid{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:220px;gap:18px}
    .sky-gallery-item{position:relative;overflow:hidden;border-radius:18px;background:#f5f7fa;border:1px solid rgba(0,19,55,.08);min-height:220px}
    .sky-gallery-item:nth-child(3n){grid-row:span 2}.sky-gallery-item:nth-child(5n){grid-column:span 2}
    .sky-gallery-item img{width:100%!important;height:100%!important;object-fit:contain!important;display:block!important;padding:22px;mix-blend-mode:normal!important;filter:none!important;transition:transform .55s cubic-bezier(.22,1,.36,1)}
    .sky-gallery-item:hover img{transform:scale(1.06)}
    .sky-gallery-overlay{position:absolute;inset:auto 12px 12px 12px;background:rgba(0,19,55,.88);color:#fff;border-radius:10px;padding:9px 12px;display:flex;align-items:center;justify-content:space-between;font-size:10px;letter-spacing:.12em;font-weight:700;opacity:0;transform:translateY(8px);transition:.3s ease}
    .sky-gallery-item:hover .sky-gallery-overlay{opacity:1;transform:none}
    @media(max-width:900px){.sky-oem-visual{grid-template-columns:1fr 1fr;min-height:360px}.sky-oem-card{min-height:260px;padding:12px}.sky-oem-card img{height:210px!important}.sky-oem-box{width:125px;height:150px}.sky-gallery-grid{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:190px}.sky-gallery-item:nth-child(3n),.sky-gallery-item:nth-child(5n){grid-row:span 1;grid-column:span 1}}
    @media(max-width:600px){.sky-oem-visual{grid-template-columns:1fr;min-height:auto;padding-bottom:110px}.sky-oem-card{min-height:280px}.sky-oem-box{right:10px}.sky-gallery-grid{grid-template-columns:1fr;grid-auto-rows:250px}}
  `;
  document.head.appendChild(style);

  function enhanceOEM(){
    const visual = document.querySelector('.oemPageVisual');
    if(!visual || visual.dataset.skylineEnhanced==='1') return;
    visual.dataset.skylineEnhanced='1';
    visual.className += ' sky-oem-visual';
    visual.innerHTML = `
      <div class="sky-oem-card">
        <span class="sky-oem-label">WHITE GLOVE / PRODUCT BASE</span>
        <img src="${img('SLGI-GG-01')}" alt="White Skyline glove">
      </div>
      <div class="sky-oem-card branded">
        <span class="sky-oem-label">YOUR LOGO / PRIVATE LABEL</span>
        <img src="${img('SLGI-TG-01')}" alt="Private label glove">
        <div class="sky-oem-badge"><img src="/images/logo.svg" alt="Skyline logo"></div>
      </div>
      <div class="sky-oem-box">
        <strong>YOUR<br>BRAND</strong>
        <span>PRIVATE LABEL PACKAGING</span>
        <img src="/images/logo.svg" alt="Skyline logo">
      </div>`;
  }

  function enhanceGallery(){
    const grid = document.querySelector('.galleryGrid');
    if(!grid || grid.dataset.skylineEnhanced==='1') return;
    grid.dataset.skylineEnhanced='1';
    grid.className = 'sky-gallery-grid';
    grid.innerHTML = gallery.map(([code,label]) => `
      <div class="sky-gallery-item">
        <img src="${img(code)}" alt="${label} glove ${code}" loading="lazy">
        <div class="sky-gallery-overlay"><span>${label} · ${code}</span><span>VIEW</span></div>
      </div>`).join('');
  }

  function run(){
    enhanceOEM();
    enhanceGallery();
  }
  new MutationObserver(run).observe(document.body,{childList:true,subtree:true});
  run();
})();

(() => {
  const CLOUD = 'https://res.cloudinary.com/m2w7btvw/image/upload/f_auto,q_auto/';
  const whiteGlove = `${CLOUD}SLGI-GG-01.png`;

  const css = document.createElement('style');
  css.textContent = `
    .sky-oem-clean{display:flex!important;align-items:center!important;justify-content:center!important;position:relative!important;min-height:430px!important;width:100%!important;background:linear-gradient(145deg,#f7f9fb,#ffffff)!important;border-radius:22px!important;border:1px solid rgba(0,19,55,.10)!important;box-shadow:0 24px 60px rgba(0,19,55,.10)!important;overflow:hidden!important}
    .sky-oem-clean:before{content:'OEM / PRIVATE LABEL';position:absolute;top:22px;left:24px;font:800 9px/1 var(--display,Arial,sans-serif);letter-spacing:.18em;color:#718197}
    .sky-oem-clean img{width:min(72%,420px)!important;height:350px!important;object-fit:contain!important;display:block!important;filter:none!important;mix-blend-mode:normal!important;position:relative!important;z-index:2!important}
    .sky-oem-clean:after{content:'YOUR BRAND';position:absolute;right:24px;bottom:22px;font:800 9px/1 var(--display,Arial,sans-serif);letter-spacing:.18em;color:#001337;opacity:.45}
    @media(max-width:600px){.sky-oem-clean{min-height:330px!important}.sky-oem-clean img{height:270px!important;width:82%!important}}
  `;
  document.head.appendChild(css);

  function clean() {
    const target = document.querySelector('.oemPageVisual') || document.querySelector('.sky-oem-visual');
    if (!target || target.dataset.skyClean === '1') return;
    target.dataset.skyClean = '1';
    target.className = 'sky-oem-clean';
    target.innerHTML = `<img src="${whiteGlove}" alt="White glove for OEM and private label manufacturing">`;
  }

  const observer = new MutationObserver(clean);
  observer.observe(document.body, { childList: true, subtree: true });
  clean();
})();

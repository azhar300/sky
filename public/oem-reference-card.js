(() => {
  const style = document.createElement('style');
  style.textContent = `
    .sky-oem-layout{display:grid!important;grid-template-columns:minmax(0,1.25fr) minmax(250px,.75fr)!important;gap:22px!important;align-items:stretch!important;width:100%!important;max-width:980px!important;margin:0 auto!important}
    .sky-oem-layout .sky-oem-clean{min-width:0!important}
    .sky-logo-reference{background:linear-gradient(145deg,#001337 0%,#062a63 58%,#0e5d8c 100%)!important;border:1px solid rgba(105,212,229,.28)!important;border-radius:22px!important;padding:28px!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important;min-height:430px!important;box-shadow:0 24px 60px rgba(0,19,55,.24)!important;position:relative!important;overflow:hidden!important;color:#fff!important}
    .sky-logo-reference:before{content:'';position:absolute;right:-55px;top:-55px;width:190px;height:190px;border:1px solid rgba(105,212,229,.24);border-radius:50%}
    .sky-logo-reference:after{content:'';position:absolute;left:-80px;bottom:-95px;width:230px;height:230px;background:radial-gradient(circle,rgba(105,212,229,.16),transparent 68%);pointer-events:none}
    .sky-logo-ref-kicker{font:800 9px/1 var(--display,Arial,sans-serif)!important;letter-spacing:.18em!important;color:#b8eaf4!important;position:relative!important;z-index:1!important}
    .sky-logo-ref-card{border:1px solid rgba(255,255,255,.24)!important;background:rgba(255,255,255,.96)!important;border-radius:14px!important;min-height:210px!important;display:flex!important;align-items:center!important;justify-content:center!important;position:relative!important;margin:22px 0!important;box-shadow:0 18px 40px rgba(0,0,0,.16)!important;z-index:1!important}
    .sky-logo-placeholder{width:150px!important;height:150px!important;border:2px solid #001337!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;color:#001337!important;position:relative!important}
    .sky-logo-placeholder:after{content:'';position:absolute!important;inset:7px!important;border:1px solid #69d4e5!important}
    .sky-logo-placeholder strong{font:800 22px/1 var(--display,Arial,sans-serif)!important;letter-spacing:.08em!important;z-index:1!important}
    .sky-logo-placeholder span{font:800 7px/1 var(--display,Arial,sans-serif)!important;letter-spacing:.16em!important;margin-top:7px!important;z-index:1!important}
    .sky-logo-ref-title{font:800 25px/1.08 var(--display,Arial,sans-serif)!important;letter-spacing:-.04em!important;color:#fff!important;margin:0 0 8px!important;position:relative!important;z-index:1!important}
    .sky-logo-ref-copy{font:500 11px/1.65 var(--body,Arial,sans-serif)!important;color:rgba(255,255,255,.78)!important;margin:0!important;position:relative!important;z-index:1!important}
    .sky-logo-ref-note{font:800 8px/1.4 var(--display,Arial,sans-serif)!important;letter-spacing:.1em!important;color:#8fe3ef!important;text-transform:uppercase!important;margin-top:20px!important;position:relative!important;z-index:1!important}
    @media(max-width:700px){.sky-oem-layout{grid-template-columns:1fr!important}.sky-logo-reference{min-height:330px!important}.sky-logo-ref-card{min-height:170px!important}.sky-logo-placeholder{width:120px!important;height:120px!important}}
  `;
  document.head.appendChild(style);

  function mount() {
    const visual = document.querySelector('.sky-oem-clean');
    if (!visual || visual.dataset.skyReferenceMounted === '1') return;
    const parent = visual.parentElement;
    if (!parent) return;
    const layout = document.createElement('div');
    layout.className = 'sky-oem-layout';
    parent.insertBefore(layout, visual);
    layout.appendChild(visual);
    const card = document.createElement('aside');
    card.className = 'sky-logo-reference';
    card.innerHTML = `
      <div class="sky-logo-ref-kicker">OEM / PRIVATE LABEL</div>
      <div class="sky-logo-ref-card">
        <div class="sky-logo-placeholder" aria-label="Your Logo reference">
          <strong>YOUR</strong>
          <span>LOGO</span>
        </div>
      </div>
      <div>
        <h3 class="sky-logo-ref-title">Your logo, your brand.</h3>
        <p class="sky-logo-ref-copy">Use this reference card to show buyers how their own branding can be applied to the glove program.</p>
        <div class="sky-logo-ref-note">Branding reference · artwork supplied by buyer</div>
      </div>
    `;
    layout.appendChild(card);
    visual.dataset.skyReferenceMounted = '1';
  }

  const observer = new MutationObserver(mount);
  observer.observe(document.body, { childList: true, subtree: true });
  mount();
})();

(() => {
  const links = [
    { label: 'Instagram', url: 'https://www.instagram.com/skylineglobalindustries?igsh=MWkwNDlycHdtdXVleg==', glyph: '◎' },
    { label: 'Facebook', url: 'https://www.facebook.com/share/1JWWj4JrJC/', glyph: 'f' },
    { label: 'TikTok', url: 'https://www.tiktok.com/@skylineglobalindustries?_r=1&_d=elled1h1m2cb14&sec_uid=MS4wLjABAAAAp_Vc97dXMAG03mijd2ltRuHBypGkgc1tdB-vDhbxL5luTl3C7r2UHHq3qlnjello&share_author_id=7606251600193881102&sharer_language=en&source=h5_m&u_code=f21m71cdi17gi5&timestamp=1786783181&user_id=7606251600193881102&sec_user_id=MS4wLjABAAAAp_Vc97dXMAG03mijd2ltRuHBypGkgc1tdB-vDhbxL5luTl3C7r2UHHq3qlnjello&item_author_type=1&utm_source=copy&utm_campaign=client_share&utm_medium=android&share_iid=7673912887886268190&share_link_id=0f57b465-4600-4db9-b055-5decf08baf36&share_app_id=1233&ugbiz_name=ACCOUNT&ug_btm=b8727%2Cb7360&social_share_type=5&enable_checksum=1', glyph: '♪' },
  ];

  function addSocials() {
    const footer = document.querySelector('.footer');
    if (!footer || footer.querySelector('.skylineSocialLinks')) return;
    const target = footer.querySelector('.footerGrid > div:first-child');
    if (!target) return;

    const wrap = document.createElement('div');
    wrap.className = 'skylineSocialLinks';
    wrap.setAttribute('aria-label', 'Skyline Global Industries social media');
    wrap.innerHTML = links.map(({ label, url, glyph }) => `
      <a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Skyline Global Industries on ${label}" title="${label}">
        <span aria-hidden="true">${glyph}</span>
      </a>
    `).join('');

    target.appendChild(wrap);
  }

  const style = document.createElement('style');
  style.textContent = `
    .skylineSocialLinks{display:flex;gap:10px;margin-top:20px;align-items:center}
    .skylineSocialLinks a{width:38px;height:38px;border:1px solid rgba(255,255,255,.16);border-radius:50%;display:grid;place-items:center;color:inherit;text-decoration:none;background:rgba(255,255,255,.035);transition:transform .25s ease,border-color .25s ease,background .25s ease}
    .skylineSocialLinks a:hover{transform:translateY(-3px);border-color:rgba(255,255,255,.42);background:rgba(255,255,255,.10)}
    .skylineSocialLinks span{font-size:18px;font-weight:700;line-height:1;font-family:Arial,sans-serif}
  `;
  document.head.appendChild(style);

  addSocials();
  new MutationObserver(addSocials).observe(document.documentElement, { childList: true, subtree: true });
})();

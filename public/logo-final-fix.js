(() => {
  const base = 'https://res.cloudinary.com/m2w7btvw/image/upload';
  const logo = (width) => `${base}/e_trim/f_auto,q_auto,w_${width}/v1787041692/file_00000000b9d8821185be06c8af36dbc8.png`;

  const apply = () => {
    document.querySelectorAll('.header .brand img').forEach((img) => {
      img.src = logo(window.innerWidth <= 700 ? 120 : 180);
      img.removeAttribute('srcset');
      img.classList.add('logo-cloudinary');
      img.setAttribute('data-skyline-logo', 'true');
    });

    document.querySelectorAll('.footer .footerLogo').forEach((img) => {
      img.src = logo(180);
      img.removeAttribute('srcset');
      img.classList.add('logo-cloudinary');
      img.setAttribute('data-skyline-logo', 'true');
    });

    const icon = document.querySelector('link[rel="icon"]');
    const apple = document.querySelector('link[rel="apple-touch-icon"]');
    if (icon) icon.href = logo(64);
    if (apple) apple.href = logo(96);
  };

  apply();
  new MutationObserver(apply).observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('resize', apply, { passive: true });
})();

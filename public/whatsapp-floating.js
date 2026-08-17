(() => {
  const id = 'skyline-floating-whatsapp';
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.textContent = `
    #${id}{position:fixed;right:22px;bottom:22px;z-index:99999;width:58px;height:58px;border-radius:50%;display:grid;place-items:center;background:#25D366;color:#fff;text-decoration:none;box-shadow:0 10px 28px rgba(0,0,0,.22);transition:transform .2s ease,box-shadow .2s ease}
    #${id}:hover{transform:translateY(-3px) scale(1.04);box-shadow:0 14px 34px rgba(0,0,0,.28)}
    #${id} svg{width:30px;height:30px;fill:currentColor}
    @media(max-width:600px){#${id}{right:16px;bottom:16px;width:54px;height:54px}}
  `;
  document.head.appendChild(style);
  const a = document.createElement('a');
  a.id = id;
  a.href = 'https://wa.me/923427289884';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.setAttribute('aria-label','Chat with Skyline on WhatsApp');
  a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.56 0 .25 5.31.25 11.83c0 2.08.54 4.11 1.56 5.9L.2 24l6.42-1.68a11.83 11.83 0 0 0 5.46 1.34h.01c6.52 0 11.83-5.31 11.83-11.83 0-3.16-1.23-6.13-3.4-8.35ZM12.09 21.7h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.81 1 1.02-3.71-.23-.38a9.84 9.84 0 0 1-1.51-5.2C2.17 6.4 6.61 1.96 12.09 1.96c2.66 0 5.16 1.04 7.04 2.93a9.89 9.89 0 0 1 2.91 7.05c0 5.48-4.46 9.92-9.95 9.92Zm5.44-7.43c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>';
  document.body.appendChild(a);
})();

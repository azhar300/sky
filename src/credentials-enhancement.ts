const certificateItems = [
  {
    title: 'Company Certificate',
    label: 'OFFICIAL COMPANY DOCUMENT',
    image: 'https://res.cloudinary.com/m2w7btvw/image/upload/f_auto,q_auto/v1786971747/IMG_20260709_134407_383.jpg',
  },
  {
    title: 'Company Registration Certificate',
    label: 'OFFICIAL REGISTRATION DOCUMENT',
    image: 'https://res.cloudinary.com/m2w7btvw/image/upload/f_auto,q_auto/v1786971733/IMG_20260709_134415_805.jpg',
  },
];

// Keep the exact logo artwork used by the header/footer; the credentials container supplies the blue background.
const logo = 'https://res.cloudinary.com/m2w7btvw/image/upload/e_trim,f_auto,q_auto,w_220/v1787041692/file_00000000b9d8821185be06c8af36dbc8.png';
const certificateFileNames = certificateItems.map((item) => item.image.split('/').pop()!.split('?')[0]);

function isCertificateAsset(value: string) {
  return certificateFileNames.some((name) => value.includes(name));
}

function removeDuplicateCertificateAssets(page: Element) {
  page.querySelectorAll('img, a, figure, [style]').forEach((element) => {
    if (element.closest('.certificateCard')) return;
    const imgSrc = element instanceof HTMLImageElement ? (element.getAttribute('src') || '') : '';
    const href = element instanceof HTMLAnchorElement ? (element.getAttribute('href') || '') : '';
    const style = element.getAttribute('style') || '';
    if (!isCertificateAsset(`${imgSrc} ${href} ${style}`)) return;
    const removable = element.closest('figure, article, section, a') || element;
    if (!removable.closest('.certificateCard')) removable.remove();
  });
}

function enhanceCredentials() {
  const page = document.querySelector('.credentialsPage');
  const grid = page?.querySelector('.credentialGrid');
  if (!page || !grid) return;

  if (grid.getAttribute('data-enhanced') !== 'true') {
    grid.setAttribute('data-enhanced', 'true');
    grid.innerHTML = `
      <div class="credentialsIntro">
        <div class="credentialsBrand"><div class="credentialsLogoFrame"><img src="${logo}" alt="Skyline Global Industries" /></div></div>
        <div>
          <div class="eyebrow">COMPANY CREDENTIALS</div>
          <h2>Verified company documentation.</h2>
          <p>Review Skyline Global Industries' official company documents below. Select a certificate to open the full-resolution document.</p>
        </div>
      </div>
      <div class="certificateGrid">
        ${certificateItems.map((item, index) => `
          <a class="certificateCard" href="${item.image}" target="_blank" rel="noopener noreferrer">
            <div class="certificatePreview">
              <img src="${item.image}" alt="${item.title}" loading="lazy" />
              <span class="certificateOpen">OPEN CERTIFICATE ↗</span>
            </div>
            <div class="certificateCardInfo">
              <span>0${index + 1} · ${item.label}</span>
              <h3>${item.title}</h3>
              <p>Click to view the complete document.</p>
            </div>
          </a>
        `).join('')}
      </div>
    `;
  }

  removeDuplicateCertificateAssets(page);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', enhanceCredentials, { once: true });
} else {
  enhanceCredentials();
}

new MutationObserver(enhanceCredentials).observe(document.body, { childList: true, subtree: true });

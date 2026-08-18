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

// Use the same current Skyline logo already used in the site footer.
const logo = '/images/logo.svg';

function removeDuplicateCertificateImages(page: Element) {
  const certificateUrls = new Set(certificateItems.map((item) => item.image));
  page.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src') || '';
    const isCertificate = [...certificateUrls].some((url) => src.includes(url));
    if (isCertificate && !img.closest('.certificateGrid')) {
      const removable = img.closest('a, figure, article, .certificate, .credential, .certificateItem') || img;
      removable.remove();
    }
  });
}

function enhanceCredentials() {
  const page = document.querySelector('.credentialsPage');
  const grid = page?.querySelector('.credentialGrid');
  if (!page || !grid || grid.getAttribute('data-enhanced') === 'true') return;

  grid.setAttribute('data-enhanced', 'true');
  grid.innerHTML = `
    <div class="credentialsIntro">
      <div class="credentialsBrand"><img src="${logo}" alt="Skyline Global Industries" /></div>
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

  // Remove any older certificate copies that another legacy enhancement may have left outside the cards.
  removeDuplicateCertificateImages(page);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', enhanceCredentials, { once: true });
} else {
  enhanceCredentials();
}

new MutationObserver(enhanceCredentials).observe(document.body, { childList: true, subtree: true });

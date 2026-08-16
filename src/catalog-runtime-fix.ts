const CLOUDINARY_BASE = 'https://res.cloudinary.com/m2w7btvw/image/upload/f_auto,q_auto/';
const JPG_CODES = new Set(['SLGI-RAG-06', 'SLGI-CG-08']);

function normalizeCloudinaryUrl(raw: string): string {
  if (!raw.includes('res.cloudinary.com/m2w7btvw/image/upload/')) return raw;
  if (/\.(png|jpg|jpeg|webp|avif)(?:$|\?)/i.test(raw)) return raw;
  const code = raw.split('/').pop() || '';
  const ext = JPG_CODES.has(code) ? 'jpg' : 'png';
  return `${CLOUDINARY_BASE}${code}.${ext}`;
}

function repairImage(img: HTMLImageElement) {
  const src = img.getAttribute('src');
  if (!src || img.dataset.skylineImageFixed === '1') return;
  const fixed = normalizeCloudinaryUrl(src);
  if (fixed !== src) {
    img.setAttribute('src', fixed);
  }
  img.dataset.skylineImageFixed = '1';
}

function repairAll(root: ParentNode = document) {
  root.querySelectorAll<HTMLImageElement>('img[src*="res.cloudinary.com/m2w7btvw/image/upload/"]').forEach(repairImage);
}

repairAll();
new MutationObserver((records) => {
  records.forEach((record) => record.addedNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) repairAll(node as Element);
  }));
}).observe(document.documentElement, { childList: true, subtree: true });

window.addEventListener('error', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLImageElement)) return;
  const src = target.getAttribute('src');
  if (!src || !src.includes('res.cloudinary.com/m2w7btvw/image/upload/')) return;
  const code = src.split('/').pop()?.split('.')[0] || '';
  const ext = JPG_CODES.has(code) ? 'jpg' : 'png';
  if (!src.endsWith(`.${ext}`)) target.src = `${CLOUDINARY_BASE}${code}.${ext}`;
}, true);

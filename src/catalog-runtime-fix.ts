const CLOUDINARY_BASE = 'https://res.cloudinary.com/m2w7btvw/image/upload/f_auto,q_auto/';
const JPG_CODES = new Set(['SLGI-RAG-06', 'SLGI-CG-08']);
const AVAILABLE_CODES = new Set<string>([
  ...Array.from({ length: 12 }, (_, i) => `SLGI-MG-${String(i + 1).padStart(2, '0')}`),
  ...['RAG', 'GG', 'FG', 'CG', 'TG'].flatMap((prefix) => Array.from({ length: 8 }, (_, i) => `SLGI-${prefix}-${String(i + 1).padStart(2, '0')}`)),
]);

function imageUrl(code: string) {
  const ext = JPG_CODES.has(code) ? 'jpg' : 'png';
  return `${CLOUDINARY_BASE}${code}.${ext}`;
}

function getCode(src: string) {
  const match = src.match(/(SLGI-(?:MG|RAG|GG|FG|CG|TG)-\d{2})(?:\.(?:png|jpg|jpeg|webp|avif))?(?:$|\?)/i);
  return match?.[1] ?? '';
}

function repairImage(img: HTMLImageElement) {
  const raw = img.getAttribute('src') || '';
  const code = getCode(raw);
  if (!code) return;
  const fixed = imageUrl(code);
  if (raw !== fixed || img.src !== fixed) {
    img.removeAttribute('srcset');
    img.setAttribute('src', fixed);
    img.src = fixed;
  }
  img.dataset.skylineImageFixed = '1';
}

function syncCatalogueUi() {
  document.querySelectorAll<HTMLElement>('.catalogMeta span:first-child').forEach((el) => {
    if (/references/i.test(el.textContent || '')) el.textContent = '52 references';
  });
  document.querySelectorAll<HTMLButtonElement>('.filterBar button').forEach((button) => {
    if (/^All\s/i.test(button.textContent || '')) button.innerHTML = 'All <b>52</b>';
  });
  document.querySelectorAll<HTMLImageElement>('img').forEach((img) => repairImage(img));
  document.querySelectorAll<HTMLElement>('.productCard').forEach((card) => {
    const code = card.querySelector('.productVisual span')?.textContent?.trim() || '';
    if (!code || AVAILABLE_CODES.has(code)) return;
    card.parentElement?.remove();
  });
}

function repairAll(root: ParentNode = document) {
  root.querySelectorAll<HTMLImageElement>('img').forEach((img) => repairImage(img));
  syncCatalogueUi();
}

repairAll();

const observer = new MutationObserver((records) => {
  for (const record of records) {
    for (const node of record.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) repairAll(node as Element);
    }
  }
});
observer.observe(document.documentElement, { childList: true, subtree: true });

let passes = 0;
const forcePass = () => {
  repairAll();
  passes += 1;
  if (passes < 12) window.setTimeout(forcePass, 100);
};
window.setTimeout(forcePass, 0);

window.addEventListener('error', (event) => {
  const target = event.target;
  if (!(target instanceof HTMLImageElement)) return;
  const code = getCode(target.currentSrc || target.src || '');
  if (code) target.src = imageUrl(code);
}, true);

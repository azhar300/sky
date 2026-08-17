const CONTACT_STORAGE_KEY = 'skyline_contact_details';
const QUOTE_INTENT_KEY = 'skyline_quote_intent';

function loadSavedContact() {
  try { return JSON.parse(localStorage.getItem(CONTACT_STORAGE_KEY) || '{}'); } catch { return {}; }
}
function saveContact(form: HTMLFormElement) {
  const data = {
    name: (form.elements.namedItem('name') as HTMLInputElement | null)?.value || '',
    company: (form.elements.namedItem('company') as HTMLInputElement | null)?.value || '',
    email: (form.elements.namedItem('email') as HTMLInputElement | null)?.value || '',
    phone: (form.elements.namedItem('phone') as HTMLInputElement | null)?.value || '',
  };
  try { localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(data)); } catch {}
}
function addContactStyles() {
  if (document.getElementById('skyline-contact-enhancements')) return;
  const style = document.createElement('style');
  style.id = 'skyline-contact-enhancements';
  style.textContent = `
    .contactPage .contactGrid{display:grid!important;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)!important;gap:64px!important;align-items:start!important}
    .contactPage .contactGrid>div{min-width:0!important}
    .contactPage .contactList{display:flex!important;flex-direction:column!important;gap:12px!important;margin:28px 0!important}
    .contactPage .contactList a,.contactPage .contactList span{display:flex!important;align-items:center!important;min-height:26px!important;word-break:break-word!important}
    .contactPage .contactForm{display:grid!important;grid-template-columns:1fr 1fr!important;gap:16px!important;padding:30px!important;background:#fff!important;border:1px solid #dfe7ed!important;border-radius:6px!important;box-shadow:0 18px 45px rgba(0,19,55,.08)!important;align-items:start!important}
    .contactPage .contactForm label{display:flex!important;flex-direction:column!important;gap:7px!important;font:800 10px var(--display)!important;letter-spacing:.08em!important;color:#001337!important}
    .contactPage .contactForm label:nth-last-of-type(1),.contactPage .contactForm button{grid-column:1/-1!important}
    .contactPage .contactForm input,.contactPage .contactForm textarea{width:100%!important;border:1px solid #cfdbe4!important;border-radius:4px!important;background:#fbfdfe!important;color:#0b1420!important;padding:12px 13px!important;outline:none!important}
    .contactPage .contactForm input:focus,.contactPage .contactForm textarea:focus{border-color:#1599b3!important;box-shadow:0 0 0 3px rgba(21,153,179,.1)!important}
    .contactPage .contactForm button{justify-self:start!important;margin-top:4px!important}
    .contactPage .skylineContactExtra{display:flex;align-items:center;gap:10px;margin-top:12px;font-size:12px;color:#526274}
    .productCard{position:relative!important}
    .skylineProductQuote{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;margin:14px!important;padding:11px 15px!important;border:1px solid var(--cyan,#1599b3)!important;border-radius:4px!important;background:var(--cyan,#1599b3)!important;color:#fff!important;font:800 10px var(--display)!important;letter-spacing:.02em!important;text-transform:none!important;line-height:1!important;transition:transform .2s,box-shadow .2s,background .2s!important}
    .skylineProductQuote:hover{transform:translateY(-2px)!important;background:#0a8199!important;box-shadow:0 10px 22px rgba(21,153,179,.18)!important}
    .productInfo .skylineProductQuote{display:inline-flex!important;width:auto!important}
    @media(max-width:800px){.contactPage .contactGrid{grid-template-columns:1fr!important;gap:40px!important}.contactPage .contactForm{grid-template-columns:1fr!important}.contactPage .contactForm label:nth-last-of-type(1),.contactPage .contactForm button{grid-column:auto!important}.contactPage .contactForm button{width:100%!important}.skylineProductQuote{margin:12px 14px 16px!important;width:calc(100% - 28px)!important}}
  `;
  document.head.appendChild(style);
}
function addProductQuoteButtons() {
  document.querySelectorAll<HTMLElement>('.productCard').forEach((card) => {
    const existing = card.querySelector('.skylineProductQuote');
    const sku = card.querySelector('.productVisual span')?.textContent?.trim() || '';
    const product = card.querySelector('.productInfo h3')?.textContent?.trim() || sku || 'Selected product';
    const category = card.querySelector('.productInfo small')?.textContent?.trim() || '';
    if (existing) return;
    const link = document.createElement('a');
    link.className = 'skylineProductQuote';
    link.href = `/contact?product=${encodeURIComponent(product)}&sku=${encodeURIComponent(sku)}&category=${encodeURIComponent(category)}`;
    link.textContent = 'Get a Quote';
    card.appendChild(link);
  });
}
function enhanceContactPage() {
  const form = document.querySelector<HTMLFormElement>('.contactForm');
  if (!form || form.dataset.skylineEnhanced === 'true') return;
  form.dataset.skylineEnhanced = 'true';
  addContactStyles();
  const saved = loadSavedContact();
  const name = form.elements.namedItem('name') as HTMLInputElement | null;
  const company = form.elements.namedItem('company') as HTMLInputElement | null;
  const email = form.elements.namedItem('email') as HTMLInputElement | null;
  const message = form.elements.namedItem('message') as HTMLTextAreaElement | null;
  if (name) name.autocomplete = 'name';
  if (company) company.autocomplete = 'organization';
  if (email) email.autocomplete = 'email';
  if (name && !name.value && saved.name) name.value = saved.name;
  if (company && !company.value && saved.company) company.value = saved.company;
  if (email && !email.value && saved.email) email.value = saved.email;
  if (!form.elements.namedItem('phone')) {
    const label = document.createElement('label');
    label.innerHTML = 'Phone / WhatsApp <input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+92 ..." />';
    const requirementLabel = message?.closest('label');
    if (requirementLabel) form.insertBefore(label, requirementLabel); else form.appendChild(label);
  }
  const phone = form.elements.namedItem('phone') as HTMLInputElement | null;
  if (phone && !phone.value && saved.phone) phone.value = saved.phone;
  if (phone) phone.autocomplete = 'tel';
  const params = new URLSearchParams(window.location.search);
  const product = params.get('product');
  const sku = params.get('sku');
  const category = params.get('category');
  if (message && product) {
    const details = [`I would like a quotation for ${product}.`, sku ? `SKU: ${sku}.` : '', category ? `Category: ${category}.` : '', 'Please share your pricing, MOQ and lead time.'].filter(Boolean).join(' ');
    message.value = details;
  } else if (message && !message.value && sessionStorage.getItem(QUOTE_INTENT_KEY) === '1') {
    message.value = 'I would like to request a quotation for your gloves. Please share pricing, MOQ and lead time.';
    sessionStorage.removeItem(QUOTE_INTENT_KEY);
  }
  let contactExtra = document.querySelector('.skylineContactExtra');
  if (!contactExtra) {
    contactExtra = document.createElement('a');
    contactExtra.className = 'skylineContactExtra';
    contactExtra.href = 'https://wa.me/923427189884';
    contactExtra.target = '_blank';
    contactExtra.rel = 'noopener noreferrer';
    contactExtra.textContent = 'WhatsApp: +92 342 7189884';
    form.closest('.contactGrid')?.querySelector('.contactList')?.insertAdjacentElement('afterend', contactExtra);
  }
  form.addEventListener('input', () => saveContact(form));
  form.addEventListener('submit', () => saveContact(form));
}
function markQuoteIntent() {
  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a.quoteBtn[href*="/contact"]') : null;
    if (!target) return;
    try { sessionStorage.setItem(QUOTE_INTENT_KEY, '1'); } catch {}
  });
}
function boot() {
  markQuoteIntent();
  const observer = new MutationObserver(() => { addProductQuoteButtons(); enhanceContactPage(); });
  observer.observe(document.body, { childList: true, subtree: true });
  addProductQuoteButtons();
  enhanceContactPage();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true }); else boot();

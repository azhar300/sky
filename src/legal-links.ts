const addLegalLinks = () => {
  const companyColumn = Array.from(document.querySelectorAll('.footerGrid > div')).find((column) => {
    const text = column.textContent || '';
    return text.includes('About Skyline') && text.includes('Contact');
  });

  if (!companyColumn || companyColumn.querySelector('[data-legal-links]')) return;

  const links = document.createElement('div');
  links.setAttribute('data-legal-links', 'true');
  links.style.display = 'contents';
  links.innerHTML = '<a href="/privacy-policy.html">Privacy Policy</a><a href="/terms-of-service.html">Terms of Service</a>';
  companyColumn.appendChild(links);
};

const observer = new MutationObserver(addLegalLinks);
observer.observe(document.documentElement, { childList: true, subtree: true });
addLegalLinks();

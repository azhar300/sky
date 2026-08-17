// Gallery has been intentionally removed from production.
// Redirect stale bookmarks and remove any old navigation links while the page is rebuilt.
const removeGallery = () => {
  if (window.location.pathname === '/gallery') {
    window.location.replace('/products');
    return;
  }

  document.querySelectorAll<HTMLAnchorElement>('a[href="/gallery"]').forEach((link) => link.remove());
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', removeGallery, { once: true });
} else {
  removeGallery();
}

new MutationObserver(removeGallery).observe(document.body, {
  childList: true,
  subtree: true,
});

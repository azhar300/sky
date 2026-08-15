(() => {
  const fix = (root = document) => {
    root.querySelectorAll?.('img[src*="res.cloudinary.com/m2w7btvw/image/upload/"]').forEach((img) => {
      const src = img.getAttribute('src');
      if (!src || img.dataset.cloudinaryFixed === '1') return;
      try {
        const url = new URL(src, location.href);
        if (!/\.[a-z0-9]{2,5}$/i.test(url.pathname)) {
          url.pathname += '.png';
          img.src = url.toString();
        }
        img.dataset.cloudinaryFixed = '1';
      } catch (_) {}
    });
  };
  fix();
  new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
    if (node.nodeType === 1) fix(node);
  }))).observe(document.documentElement, { childList: true, subtree: true });
})();

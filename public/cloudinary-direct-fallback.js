(() => {
  const versions = {
    'SLGI-RAG-05': 1786822180, 'SLGI-TG-02': 1786822179, 'SLGI-RAG-08': 1786822176, 'SLGI-TG-04': 1786822174,
    'SLGI-RAG-03': 1786822171, 'SLGI-RAG-04': 1786822171, 'SLGI-MG-10': 1786822163, 'SLGI-MG-12': 1786822162,
    'SLGI-MG-09': 1786822158, 'SLGI-RAG-01': 1786822152, 'SLGI-MG-11': 1786822152, 'SLGI-RAG-02': 1786822148,
    'SLGI-MG-07': 1786821989, 'SLGI-MG-02': 1786821988, 'SLGI-MG-08': 1786821987, 'SLGI-MG-05': 1786821986,
    'SLGI-MG-03': 1786821985, 'SLGI-MG-06': 1786821984, 'SLGI-GG-08': 1786821974, 'SLGI-GG-05': 1786821974,
    'SLGI-MG-04': 1786821974, 'SLGI-MG-01': 1786821973, 'SLGI-GG-07': 1786821967, 'SLGI-GG-06': 1786821967,
    'SLGI-GG-04': 1786821915, 'SLGI-GG-01': 1786821901, 'SLGI-GG-03': 1786821899, 'SLGI-FG-07': 1786821895,
    'SLGI-GG-02': 1786821889, 'SLGI-FG-06': 1786821889, 'SLGI-FG-05': 1786821888, 'SLGI-FG-08': 1786821884,
    'SLGI-FG-04': 1786821880, 'SLGI-FG-03': 1786821867, 'SLGI-FG-02': 1786821846, 'SLGI-FG-01': 1786821842,
    'SLGI-CG-02': 1786821817, 'SLGI-CG-01': 1786821790, 'SLGI-TG-03': 1786821731, 'SLGI-TG-06': 1786821730,
    'SLGI-TG-08': 1786821726, 'SLGI-TG-01': 1786821726, 'SLGI-TG-05': 1786821725, 'SLGI-RAG-07': 1786821723,
    'SLGI-TG-07': 1786821722, 'SLGI-RAG-06': 1786821716, 'SLGI-CG-04': 1786820212, 'SLGI-CG-07': 1786820183,
    'SLGI-CG-03': 1786820072, 'SLGI-CG-05': 1786820044, 'SLGI-CG-08': 1786819992, 'SLGI-CG-06': 1786819809
  };

  function fixImages(root = document) {
    root.querySelectorAll('img[src*="res.cloudinary.com/m2w7btvw"]').forEach((img) => {
      const match = img.src.match(/\/(SLGI-(?:MG|RAG|GG|FG|CG|TG)-\d{2})(?:\.[a-z0-9]+)?(?:[?#].*)?$/i);
      if (!match) return;
      const code = match[1];
      const version = versions[code];
      if (!version) return;
      const ext = code === 'SLGI-RAG-06' || code === 'SLGI-CG-08' ? 'jpg' : 'png';
      const direct = `https://res.cloudinary.com/m2w7btvw/image/upload/v${version}/${code}.${ext}`;
      if (img.src !== direct) img.src = direct;
    });
  }

  fixImages();
  new MutationObserver(() => fixImages()).observe(document.documentElement, { childList: true, subtree: true });
})();

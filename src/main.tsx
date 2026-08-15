import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';
import './catalog-pass.css';
import './catalog-images.css';

const CLOUDINARY = 'https://res.cloudinary.com/m2w7btvw/image/upload/';
const syncProductImages = () => {
  document.querySelectorAll<HTMLElement>('.productCard').forEach((card) => {
    const code = card.querySelector('.productMeta strong')?.textContent?.trim();
    const visual = card.querySelector<HTMLElement>('.productVisual');
    if (code && visual && /^SLGI-(MG|RAG|GG|FG|CG|TG)-\d+$/.test(code)) visual.style.backgroundImage = `url('${CLOUDINARY}${code}.png')`;
  });
  document.querySelectorAll<HTMLElement>('.detailGrid').forEach((grid) => {
    const code = grid.querySelector('.detailRows div:nth-child(2) b')?.textContent?.trim();
    const visual = grid.querySelector<HTMLElement>('.detailArt');
    if (code && visual && /^SLGI-(MG|RAG|GG|FG|CG|TG)-\d+$/.test(code)) {
      visual.style.backgroundImage = `url('${CLOUDINARY}${code}.png')`;
      visual.querySelector('img')?.setAttribute('style', 'display:none');
    }
  });
};

createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode>);
const observer = new MutationObserver(syncProductImages);
observer.observe(document.body, { childList: true, subtree: true });
syncProductImages();

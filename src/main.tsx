import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import App from './App';
import './styles.css';
import './catalog-pass.css';
import './catalog-images.css';
import './premium-overrides.css';
import './asset-visibility-fix.css';
import './hero-redesign.css';
import './reference-redesign.css';
import './manufacturing-quality-overrides.css';

/* Final requested visual layers — deliberately loaded last. */
import './final-catalog-fix.css';
import './final-hero-oem-only.css';
import './header-brand-final.css';
import './header-colors-final.css';

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, search]);

  return null;
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Skyline application root element was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </StrictMode>
);
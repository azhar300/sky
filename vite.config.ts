import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'skyline-catalog-normalizer',
      transform(code, id) {
        if (id.endsWith('/src/App.tsx')) {
          return code
            .replaceAll(
              'https://res.cloudinary.com/m2w7btvw/image/upload/f_auto,q_auto/',
              'https://res.cloudinary.com/m2w7btvw/image/upload/f_auto,q_auto/products/'
            )
            .replace("prefix: 'SLGI-MG', count: 15", "prefix: 'SLGI-MG', count: 12");
        }
        return null;
      },
    },
  ],
});

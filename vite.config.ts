import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'skyline-cloudinary-product-paths',
      transform(code, id) {
        if (id.endsWith('/src/App.tsx')) {
          return code.replace(
            'https://res.cloudinary.com/m2w7btvw/image/upload/f_auto,q_auto/${code}',
            'https://res.cloudinary.com/m2w7btvw/image/upload/f_auto,q_auto/products/${code}'
          );
        }
        return null;
      },
    },
  ],
});

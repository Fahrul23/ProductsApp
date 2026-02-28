import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            'react-native': 'react-native-web',
            'react-native-safe-area-context': path.resolve(__dirname, 'src/polyfills/safe-area-context.js'),
            '@react-native/new-app-screen': path.resolve(__dirname, 'src/polyfills/new-app-screen.js'),
        },
        extensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    optimizeDeps: {
        esbuildOptions: {
            resolveExtensions: ['.web.js', '.web.jsx', '.js', '.jsx', '.ts', '.tsx'],
        },
    },
});

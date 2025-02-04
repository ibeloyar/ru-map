import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: './src/main.ts',
            name: 'ru-map',
            fileName: (format) => `ru-map.${format}.js`,
            formats: ['es', 'umd'],
        },
        outDir: './dist',
    },
    plugins: [
        dts({
            insertTypesEntry: true,
        })
    ],
});
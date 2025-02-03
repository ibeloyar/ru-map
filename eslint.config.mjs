// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        name: 'files-to-lint',
        rules: {
            semi: ['error', 'always'], 
            quotes: [ 'error', 'single' ],
            indent: ['error', 4],
        }
    },
    {
        name: 'files-to-ignore',
        ignores: [
            '**/dist/**', 
            '**/dist-ssr/**', 
            '**/coverage/**', 
            '**/lib/**', 
            '**/*.d.ts',
        ],
    }
);

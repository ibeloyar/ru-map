// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        name: 'files-to-lint',
        rules: {
            indent: ['error', 4],
            semi: ['error', 'always'], 
            quotes: [ 'error', 'single' ],
            'comma-dangle': ['error', {
                'arrays': 'never',
                'objects': 'always',
                'imports': 'never',
                'exports': 'never',
                'functions': 'never',
            }],
            'object-curly-spacing': ['error', 'always'],
        },
    },
    {
        name: 'files-to-ignore',
        ignores: [
            '**/dist/**', 
            '**/dist-ssr/**', 
            '**/coverage/**', 
            '**/lib/**', 
            '**/*.d.ts'
        ],
    }
);

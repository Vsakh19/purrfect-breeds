// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
    { ignores: ['dist/', '.astro/', 'node_modules/'] },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...astro.configs.recommended,
    ...astro.configs['jsx-a11y-recommended'],
    {
        rules: {
            'astro/jsx-a11y/no-redundant-roles': ['error', { ul: ['list'] }],
            'astro/jsx-a11y/no-noninteractive-tabindex': [
                'error',
                { roles: ['tabpanel', 'region'], allowExpressionValues: true },
            ],
        },
    },
    prettier,
);

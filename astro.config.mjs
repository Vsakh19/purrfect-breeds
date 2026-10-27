// @ts-check
import { defineConfig, svgoOptimizer } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    output: 'static',
    scopedStyleStrategy: 'class',
    i18n: {
        locales: ['en'],
        defaultLocale: 'en',
        routing: {
            prefixDefaultLocale: false,
        },
    },
    experimental: {
        svgOptimizer: svgoOptimizer({ plugins: ['preset-default', 'prefixIds'] }),
    },
});

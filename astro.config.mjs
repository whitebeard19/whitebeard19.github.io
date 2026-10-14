// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';

// SITE_URL and BASE_PATH are set by the GitHub Pages workflow (.github/workflows/deploy.yml).
// Locally you can leave them alone. With a custom domain, set SITE_URL to it and BASE_PATH to "/".
const site = process.env.SITE_URL || 'https://example.github.io';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [
    expressiveCode({
      themes: ['github-dark'],
      styleOverrides: {
        borderRadius: '10px',
        borderColor: '#0b0418',
        codeFontFamily: "'JetBrains Mono', ui-monospace, monospace",
        codeFontSize: '14px',
        codeLineHeight: '1.7',
        uiFontFamily: "'JetBrains Mono', ui-monospace, monospace",
        codeBackground: '#150a2a',
        frames: {
          editorTabBarBackground: '#0b0418',
          editorActiveTabBackground: '#150a2a',
          editorActiveTabIndicatorTopColor: '#ffd23f',
          terminalTitlebarBackground: '#0b0418',
          terminalBackground: '#150a2a',
          frameBoxShadowCssValue: 'none',
        },
      },
    }),
    mdx(),
    preact(),
    sitemap(),
  ],
});

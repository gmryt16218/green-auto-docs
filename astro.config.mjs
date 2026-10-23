import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Green Auto India',
      description:
        'India-specific automotive LCA database and impact calculation engine — Techfest 2026–27, Challenge 2, Round 1.',
      customCss: ['katex/dist/katex.min.css'],
      sidebar: [
        { label: 'Problem Understanding', slug: 'problem' },
        { label: 'Scope & System Boundaries', slug: 'scope' },
        { label: 'Methodology & Engine', slug: 'methodology' },
        { label: 'Data Strategy', slug: 'data-strategy' },
        { label: 'Demo Case: 40 kWh Pack', slug: 'demo-case' },
        { label: 'Architecture', slug: 'architecture' },
        { label: 'Innovation', slug: 'innovation' },
        { label: 'Roadmap to Finale', slug: 'roadmap' },
        { label: 'Open Items & Assumptions', slug: 'open-items' },
        { label: 'References', slug: 'references' },
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { throwOnError: false }]],
  },
});

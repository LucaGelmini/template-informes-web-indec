import { defineConfig } from "astro/config";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: { theme: 'dracula' },

      remarkRehype: { footnoteLabel: 'Footnotes' },
      gfm: false
    })],
  output: "static",
  site: "https://uatw2016.indec.gob.ar/ftp/ica_web20/",
  base: "ftp/ica_web20/",
  build: {
    format: "directory"
  }
});
// @ts-nocheck
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

import rehypeMermaid from "rehype-mermaid";
import remarkPlantUML from "remark-plantuml";

export default defineConfig({
  site: "http://raufzer.me/",
  integrations: [react(), mdx()],

  markdown: {
    rehypePlugins: [
      [rehypeMermaid, { strategy: "img-svg" }],
    ],
  },

  image: {
    remotePatterns: [],
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});

// @ts-nocheck
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'http://raufzer.me/',
  integrations: [react(), mdx()],
  image: {
    remotePatterns: [],
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
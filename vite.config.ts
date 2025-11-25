import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const GOODREADS_PROXY_TARGET = "https://www.goodreads.com";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/dev/goodreads": {
        target: GOODREADS_PROXY_TARGET,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/dev\/goodreads/, ""),
        headers: {
          accept: "application/rss+xml, text/xml;q=0.9, */*;q=0.8",
        },
      },
    },
  },
});

import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  // TypeScript compiles to dist/, so Vite outputs production files to build/
  // without removing the JavaScript files currently referenced by the HTML pages.
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        dashboard: resolve(import.meta.dirname, "index.html"),
        transaction: resolve(import.meta.dirname, "transaction.html"),
        category: resolve(import.meta.dirname, "category.html"),
        balance: resolve(import.meta.dirname, "balance.html"),
      },
    },
  },
});

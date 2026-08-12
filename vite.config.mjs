import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  // TypeScript hiện biên dịch vào dist/, nên Vite xuất bản production sang build/
  // để không xóa các file JavaScript mà các trang HTML đang sử dụng.
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

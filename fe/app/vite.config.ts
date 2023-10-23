/* eslint-disable import/no-default-export */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        rewrite: (aPath) => aPath.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "#": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react"],
        },
      },
    },
  },
});

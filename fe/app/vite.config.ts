/* eslint-disable import/no-default-export */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      external: ["#app"],
      output: {
        manualChunks: {
          vendor: ["react"],
        },
      },
    },
  },
});

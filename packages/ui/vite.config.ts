import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "#": path.resolve(__dirname, "./src"),
    },
  },
});

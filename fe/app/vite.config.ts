/* eslint-disable import/no-default-export */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-expect-error @typescript-eslint/ban-ts-comment
  plugins: [react()],
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// // https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});

// vite.config.js
// export default {
//   build: {
//     outDir: "dist",
//   },
// };

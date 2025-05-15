import { defineConfig } from "vite";
import electron from "vite-plugin-electron/simple";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    electron({
      main: {
        entry: "src/main/index.ts",
        vite: {
          build: {
            outDir: "dist-electron", // ← 여기를 지정
            rollupOptions: {
              input: "src/main/index.ts",
              output: {
                // ★ CommonJS 포맷으로 번들링
                format: "cjs",
                // ★ 파일 확장자를 .cjs 로
                entryFileNames: "index.cjs",
              },
            },
          },
          resolve: {
            alias: {
              "@": path.resolve(__dirname, "./src"),
            },
          },
        },
      },
    }),
  ],
});

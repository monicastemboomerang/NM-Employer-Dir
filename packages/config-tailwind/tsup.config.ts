import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["./tailwind.config.ts"],
  format: ["cjs", "esm"],
  external: ["react"],
  dts: true,
  ...options,
}));

import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  bundle: false,
  dts: true,
  entry: ['src/**/*.ts', '!src/**/*.d.ts'],
  format: ['cjs', 'esm'],
  minify: true,
  tsconfig: 'tsconfig.json',
  target: 'esnext',
  splitting: false,
  skipNodeModulesBundle: true,
  sourcemap: true,
  shims: false,
  keepNames: true,
  outDir: 'dist',
});

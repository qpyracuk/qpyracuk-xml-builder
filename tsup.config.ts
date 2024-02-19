import { defineConfig } from 'tsup';

export default defineConfig({
  format: ['cjs', 'esm'],
  entry: ['./src/index.ts'],
  target: 'es2017',
  outDir: 'dist',
  treeshake: true,
  minify: true,
  bundle: true,
  dts: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
  sourcemap: true,
  noExternal: [/./g]
});

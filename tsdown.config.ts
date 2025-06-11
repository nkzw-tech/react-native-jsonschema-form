import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  dts: true,
  format: 'esm',
  // Workaround for broken `jsx` option: https://github.com/rolldown/tsdown/issues/310
  inputOptions: {
    jsx: 'preserve',
    transform: undefined,
  },
  outDir: './lib',
  outputOptions: {
    banner: '/* @jsxImportSource nativewind */',
  },
  target: 'node22',
});

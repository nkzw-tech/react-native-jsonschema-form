import nkzw from '@nkzw/eslint-config';

export default [
  ...nkzw,
  {
    ignores: ['lib/**'],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
    },
  },
  {
    files: ['mocks/**', 'tailwind.config.js'],
    rules: {
      '@typescript-eslint/no-require-imports': 0,
    },
  },
];

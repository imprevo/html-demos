module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-var': 'error',
    'prefer-const': 'error',
  },
  overrides: [
    {
      files: ['*.astro'],
      extends: ['plugin:astro/recommended'],
      parser: 'astro-eslint-parser',
      rules: {},
    },
  ],
};

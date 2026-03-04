module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  globals: {
    describe: 'readonly',
    it: 'readonly',
    test: 'readonly',
    expect: 'readonly',
    beforeEach: 'readonly',
    afterEach: 'readonly',
    beforeAll: 'readonly',
    afterAll: 'readonly',
  },
  plugins: ['react', 'vitest'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  settings: {
    react: {
      version: 'detect',
      jsxRuntime: 'automatic',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
  },
};
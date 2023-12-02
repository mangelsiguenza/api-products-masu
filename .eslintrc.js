module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['import', '@typescript-eslint/eslint-plugin'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    'import/resolver':{
      'typescript': true,
      'node': true,
    },
  },
  rules: {
    'sort-imports': ['error', { 'ignoreDeclarationSort': true }],
    'import/order': ['error', {
      'newlines-between': 'never',
      'alphabetize': {
        'order': 'asc'},
      'groups': ['internal','external', 'builtin', 'index', 'parent', 'sibling', 'type', 'object']
    }],
    'import/no-duplicates': 'error',

    'quotes': ['error', 'single'],

    "@typescript-eslint/no-unused-vars": "error",
    "no-unused-vars": "off",
    'import/newline-after-import':'error',

    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};

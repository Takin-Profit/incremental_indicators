// eslint-disable-next-line import/no-commonjs
module.exports = {
  env: {
    es2022: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:array-func/all',
    'plugin:yaml/recommended',
    'plugin:unicorn/recommended',
    'plugin:sonarjs/recommended',
    'plugin:github/recommended',
    'plugin:promise/recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './tsconfig.eslint.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
    extraFileExtensions: ['.json', 'yaml', 'yml']
  },
  plugins: [
    '@typescript-eslint',
    'array-func',
    'unicorn',
    'sonarjs',
    'github',
    'json-files',
    'yaml',
    'simple-import-sort',
    'eslint-plugin-tsdoc',
    'promise',
    'import',
    'prettier'
  ],
  rules: {
    'unicorn/prevent-abbreviations': 0,
    'prettier/prettier': [
      'error',
      {
        semi: false,
        trailingComma: 'none',
        arrowParens: 'avoid',
        singleQuote: true
      }
    ],
    'tsdoc/syntax': 'warn',
    'filenames/match-regex': 0,
    'filenames/match-exported': 2,
    'unicorn/filename-case': 0
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', 'json']
      }
    }
  }
}

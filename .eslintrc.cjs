const path = require('path')

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, '')],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      typescript: {
        project: path.resolve(__dirname, './tsconfig.json')
      }
    }
  },
  env: {
    node: true
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-target-blank': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',

    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  },
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'never'],
    'import/extensions': ['error', 'ignorePackages', { js: 'always' }],
    'no-underscore-dangle': 'off',
  },
}

module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect', // Automaattisesti tunnistaa käyttämäsi React-version
    },
  },
  ignorePatterns: ['node_modules', 'dist', '.eslintrc.cjs'],
  plugins: ['react-refresh'],
  rules: {
    // Tyylisäännöt
    'indent': ['error', 2], // Kahden välilyönnin sisennys
    'linebreak-style': ['error', 'unix'], // Unix-tyylinen rivinvaihto
    'quotes': ['error', 'single'], // Yksinkertaiset lainausmerkit
    'semi': ['error', 'never'], // Ei puolipisteitä
    'object-curly-spacing': ['error', 'always'], // Aseta välit objektien sulkuihin

    // Yleiset koodisäännöt
    'eqeqeq': 'error', // Pakota === käyttö
    'no-trailing-spaces': 'error', // Ei välilyöntejä rivien loppuun
    'arrow-spacing': ['error', { before: true, after: true }], // Välit nuolifunktioiden ympärille
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Käyttämättömät muuttujat varoituksena
    'no-console': 0, // Sallitaan console.log-debuggaukset

    // React-säännöt
    'react/react-in-jsx-scope': 'off', // Ei tarvita Reactin importtausta (Vite ja JSX-runtime hoitaa tän)
    'react/prop-types': 'off', // PropTypes käytön voi ohittaa (esim. TypeScriptin käyttöön)
    'react-hooks/rules-of-hooks': 'error', // React-hooksien sääntöjen tarkistus
    'react-hooks/exhaustive-deps': 'warn', // Huomauta puuttuvista riippuvuuksista
  },
}

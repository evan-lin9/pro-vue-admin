module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  "parserOptions": {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  rules: {
    'vue/no-use-v-if-with-v-for': 0
  }
}

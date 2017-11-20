const OFF = 0 // eslint-disable-line no-unused-vars
const WARN = 1 // eslint-disable-line no-unused-vars
const ERROR = 2 // eslint-disable-line no-unused-vars

module.exports = {
  extends: [
    'airbnb',
  ],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-console': OFF,
    'no-param-reassign': [ERROR, { props: false }],
    'quote-props': [ERROR, 'consistent-as-needed'],
    'semi': [ERROR, 'never'],
    'react/jsx-filename-extension': OFF,
    'jsx-a11y/accessible-emoji': OFF,
    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/no-static-element-interactions': OFF,
  },
}

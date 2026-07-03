// @ts-check
/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require('eslint/config');
// config inheritance is still not working correctly, so doing it manually here
// see: https://github.com/eslint/eslint/issues/18385
const rootConfig = require('../eslint.config.cjs');

module.exports = [
    ...rootConfig,
    ...defineConfig([
        {
            rules: {
                '@typescript-eslint/no-explicit-any': 'off',
            },
        },
    ]),
];

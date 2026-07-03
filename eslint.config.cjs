// @ts-check
/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig, globalIgnores } = require('eslint/config');

const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const js = require('@eslint/js');
const glob = require('glob');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

module.exports = defineConfig([
    globalIgnores([
        '__mocks__/**',
        'coverage/**',
        '**/dist',
        '**/docs',
        '**/node_modules',
        '**/*.config.js',
    ]),
    {
        extends: compat.extends(
            'prettier',
            'plugin:prettier/recommended',
            'eslint:recommended',
            'plugin:@typescript-eslint/eslint-recommended',
            'plugin:@typescript-eslint/recommended'
        ),

        plugins: {
            // @ts-expect-error type definitions are currently incompatible, but actual data is
            '@typescript-eslint': typescriptEslint,
            'simple-import-sort': simpleImportSort,
        },

        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.commonjs,
            },

            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2020,
                projectService: {
                    allowDefaultProject: [
                        '*.{cjs,js}',
                        'tests/*.{cjs,js}',
                        ...glob.sync('tests/**/*.ts'),
                    ],
                    maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING:
                        Number.MAX_SAFE_INTEGER,
                },
                tsconfigRootDir: __dirname,
            },
            ecmaVersion: 2020,
            sourceType: 'module',
        },

        rules: {
            '@typescript-eslint/no-namespace': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-empty-interface': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    caughtErrors: 'none',
                },
            ],

            // @typescript-eslint/ban-types was removed and is replaced by
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-unsafe-function-type': 'off',
            '@typescript-eslint/no-wrapper-object-types': 'off',
            'no-console': 'off',
            // `cause` option is not supported until es2022, so disable the rule
            // as long as compile target is older than es2022,
            // see: https://eslint.org/docs/latest/rules/preserve-caught-error
            'preserve-caught-error': 'off',

            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                },
            ],

            'simple-import-sort/imports': [
                'warn',
                {
                    groups: [
                        // Node.js builtins.
                        [
                            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|typescript|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
                        ],
                        // Packages.
                        ['markdown-table', '^@?\\w'],
                        // Side effect imports.
                        ['^\\u0000'],
                        // Parent imports.
                        [
                            '^src',
                            '^\\./(?=.*/)(?!/?$)',
                            '^\\.(?!/?$)',
                            '^\\./?$',
                            '^\\.\\.(?!/?$)',
                            '^\\.\\./?$',
                        ],
                    ],
                },
            ],
        },
    },
]);

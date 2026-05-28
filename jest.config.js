//@ts-check

//@ts-ignore ts(2306) index.d.ts is not a module
require('require-json5').replace();
const baseTsConfig = require('./tsconfig.json');

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.[jt]s$': 'ts-jest',
        '^.+\\.md$': '<rootDir>/fileTransformer.js',
    },
    transformIgnorePatterns: ['node_modules/(?!(strip-ansi|ansi-regex)/)'],
    testMatch: ['**/*.(test|spec).ts'],
    globals: {
        'ts-jest': {
            babelConfig: true,
            tsconfig: {
                ...baseTsConfig.compilerOptions,
                //HACK: override rootDir to work around a bug in ts-jest
                //see: https://github.com/kulshekhar/ts-jest/issues/4575
                rootDir: '.',
            },
        },
    },
    collectCoverageFrom: ['src/**/{!(index.ts),}.ts'],
    coveragePathIgnorePatterns: ['/node_modules/'],
};

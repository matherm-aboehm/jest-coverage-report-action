//@ts-check
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
        },
    },
    collectCoverageFrom: ['src/**/{!(index.ts),}.ts'],
    coveragePathIgnorePatterns: ['/node_modules/'],
};

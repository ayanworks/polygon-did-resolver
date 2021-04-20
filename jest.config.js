module.exports = {
    clearMocks: true,
    verbose: true,
    testEnvironment: "node",
    // testMatch: [
    //     "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"
    // ],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: [
        "/node_modules/", "\\.pnp\\.[^\\\/]+$"
    ],
    globals: {
        Uint8Array: Uint8Array,
        ArrayBuffer: ArrayBuffer
    }
};
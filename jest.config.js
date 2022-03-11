module.exports = {
    collectCoverageFrom: [
        "src/**/**.{js,jsx,ts,tsx}",
        "!bin/**",
        "!node_modules/**",
        "!src/app.ts",
        "!src/configuration.ts",
        "!src/server.ts",
        "!src/middleware/**",
        "!src/routes/routes.ts"
    ],
    moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
    preset: "ts-jest",
    roots: [
        "<rootDir>"
    ],
    setupFilesAfterEnv: ["./jest.config.js"],
    testEnvironment: "node",
    testMatch: ["**/src/**/*.test.[jt]s?(x)"],
    testPathIgnorePatterns: [
        "<rootDir>/bin/",
        "<rootDir>/dist/",
        "<rootDir>/node_modules/",
        "<rootDir>/lib/"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    }
};
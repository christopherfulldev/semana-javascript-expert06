"use strict";

const defaultTestConfig = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "text",
    "lcov"
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    },
  },
  maxWorkers: "50%",
  watchPathIgnorePatterns: [
    "/node_modules/"
  ],
};

const backEndConfig = {
      ...defaultTestConfig,
      testEnvironment: "node",
      displayName: "backend",
      collectCoverageFrom: [
        "server/",
        "!server/index",
      ],
      transformIgnorePatterns: [
        "node_modules",
        "public",
      ],
      testMatch: [
        "**/tests/**/server/**/*.test.js",
      ],
    };

const frontEndConfig = {
      ...defaultTestConfig,
      testEnvironment: "jsdom",
      displayName: "frontend",
      collectCoverageFrom: [
        "public/",
      ],
      transformIgnorePatterns: [
        "node_modules",
        "server",
      ],
      testMatch: [
        "**/tests/**/public/**/*.test.js",
      ],
    };

const testModulesConfig = {
  projects:[
    frontEndConfig,
    backEndConfig,
  ]
}


module.exports = testModulesConfig;
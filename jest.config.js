'use strict';

const defaultTestConfig = {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: [
    'text',
    'lcov'
  ],
  coverageTreshold: {
    global: {
      branch: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  maxWorkers: '50%',
  wathPathIgnorePatterns: [
    'node_modules'
  ]
};

module.exports = {
  projects: [
    {
      ...defaultTestConfig
    },

    {
      testEnvironment: 'node',
      displayName: 'backEnd',
      collectCoverageFrom: [
        'server/',
        '!server/index'
      ],
      tranformIgnorePatterns: [
        'node_modules',
        'public'
      ],
      testMatch: [
        '**/tests/**/server/**/*.test.js',
      ]
    }
  ]
};
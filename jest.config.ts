// jest.config.ts
import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.(ts)?$': 'ts-jest',
  },
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['.*__mocks__.*'],
  setupFiles: ['<rootDir>/test-setup.js'],
  setupFilesAfterEnv: [],
  coveragePathIgnorePatterns: ['/node_modules/'],
  testPathIgnorePatterns: ['/.history/'],
  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts)?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 90,
      functions: 80,
      lines: 80,
    },
  },
};
export default config;

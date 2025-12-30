module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/**/__tests__/**'
  ],
  coverageThreshold: {
    'src/store/portfolios/actions.ts': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    },
    'src/store/portfolios/reducer.ts': {
      branches: 75,
      functions: 100,
      lines: 100,
      statements: 100
    },
    'src/store/portfolios/saga.ts': {
      branches: 50,
      functions: 100,
      lines: 100,
      statements: 100
    },
    'src/store/portfolios/selectors.ts': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    },
    'src/store/portfolios/types.ts': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react',
        esModuleInterop: true
      }
    }]
  }
};


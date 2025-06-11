export default {
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  transform: {
    '\\.(j|t)sx?$': ['<rootDir>/jest-preprocessor.js'],
  },
  transformIgnorePatterns: [],
};

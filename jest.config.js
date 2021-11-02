module.exports = {
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
};

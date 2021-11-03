module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    'src/*/.+\\.(j|t)sx?$': '@vue/cli-plugin-babel'
  }
};

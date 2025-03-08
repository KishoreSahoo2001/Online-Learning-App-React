const { override, addBabelPreset, addBabelPlugin } = require('customize-cra');

module.exports = {
  webpack: function (config, env) {
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/axios/,
      loader: 'babel-loader',
    });
    return config;
  },
  jest: function (config) {
    return {
      ...config,
      transform: {
        "^.+\\.[tj]sx?$": "babel-jest",
      },
      transformIgnorePatterns: [
        '/node_modules/(?!axios)/',
      ],
      moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
      },
      reporters: [
        "default",
        ["jest-sonar", {
          outputDirectory: "coverage",
          outputName: "test-reporter.xml"
        }]
      ]
    };
  },
};
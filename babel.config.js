module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-private-methods',
    '@babel/plugin-proposal-class-properties',
  ]
};
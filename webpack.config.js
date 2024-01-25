const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  // ... other webpack configurations
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })]
  }
};
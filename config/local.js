module.exports = {
  API_PATH: 'https://baseline-sails-api.herokuapp.com',
  WEBPACK: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ],
    devtool: 'source-map'
  }
};

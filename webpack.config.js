module.exports = {
  mode: "development",
  entry: {
    react: "./src/index.js",
  },
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "[name]Bundle.js",
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    static: "./",
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

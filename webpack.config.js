module.exports = {
  output: {
    filename: "boardy.js",
    globalObject: "this",
    library: {
      name: "Boardy",
      type: "umd",
    },
    libraryExport: "default",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  // devtool: "source-map",
  // optimization: {
  //   minimize: false,
  // },
};

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function (env, argv) {
  const plugins = [];

  if (argv.mode === "development") {
    plugins.push(
      new HtmlWebpackPlugin({
        template: "index.html", // TODO: only for dev mode!
      })
    );
  }

  return {
    output: {
      publicPath: "/dist/",
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
    devServer: {
      static: ".",
    },
    // optimization: {
    //   minimize: false,
    // },
    plugins: plugins,
  };
};

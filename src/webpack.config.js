const HTMLWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js"
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: "Code Splitting"
    })
  ],
  output: {
    filename: "App.bundle.js"
  }
};

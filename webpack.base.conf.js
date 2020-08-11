module.exports = {
  module: {
    rules: [
      {
        test: /\.s[a|c]ss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
}
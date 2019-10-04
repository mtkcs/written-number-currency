const path = require("path");
const PROD = process.env.NODE_ENV === "production";

module.exports = {
  mode: PROD ? "production" : "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: PROD
      ? "written-number-currency.min.js"
      : "written-number-currency.js",
    library: "writtenNumberCurrency",
    libraryTarget: "umd"
  }
};

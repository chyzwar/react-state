import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const config: webpack.Configuration = {
  /**
   * Webpack mode
   */
  mode: "development",
  /**
   * Recommeded devtool for ts-loader
   */
  devtool: "inline-source-map",
  /**
   * Application Entry points the application.
   *
   * @see https://webpack.js.org/configuration/entry-context/#entry
   */
  entry: {
    /**
     * Application main entry point
     */
    main: "./src/main.tsx",
  },
  resolve: {
    /**
     * Roots for module resolution
     *
     * @see https://webpack.js.org/configuration/resolve/#resolve-modules
     */
    modules: [
      path.resolve("node_modules"),
      path.resolve("../node_modules"),
      path.resolve("../../node_modules"),
      path.resolve("../../../../node_modules"),
    ],
    /**
     * An array of extensions that should be used to resolve modules.
     *
     * @see https://webpack.js.org/configuration/resolve/#resolve-extensions
     */
    extensions: [".ts", ".tsx", ".js"],
  },
  target: "web",
  module: {
    rules: [
      {
        test: /(\.tsx|\.ts)$/,
        use: [
          { loader: "ts-loader" },
        ],
      },
    ],
  },
  plugins: [
    /**
     * HtmlWebpackPlugin configuration
     *
     * @see https://webpack.js.org/plugins/html-webpack-plugin/
     */
    new HtmlWebpackPlugin({
      title: "React state example",
      template: "src/index.html",
      filename: "index.html",
      minify: {
        collapseWhitespace: false,
        removeComments: false,
      },
    }),
  ],
};

export default config;

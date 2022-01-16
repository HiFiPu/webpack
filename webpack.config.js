// 待优化.......
const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin").default;
// const WebpackDevServer = require('webpack-dev-server');
const { VueLoaderPlugin } = require("vue-loader");
const toml = require("toml");
const yaml = require("yamljs");
const json5 = require("json5");
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        minRemainingSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
    extensions: [".tsx", ".ts", ".js", ".vue"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.toml$/i,
        type: "json",
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: "json",
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: "json",
        parser: {
          parse: json5.parse,
        },
      },
      {
        test: /\.(mp4|ogg|mp3|wav)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1024,
            fallback: {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
              },
            },
          },
        },
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader?cacheDirectory",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      title: "Vue3",
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new VueLoaderPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(__dirname, "./vendors.manifest.json"),
      scope: 'xyz',
      sourceType: 'commonjs2',
    }),
  ],
  performance: {
    hints: 'warning',
    // 入口起点的最大体积
    maxEntrypointSize: 50000000,
    // 生成文件的最大体积
    maxAssetSize: 30000000,
    // 只给出 js 文件的性能提示
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js')
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    historyApiFallback: true ,
    compress: true,
    port: 9000,
    open: true,
    hot: true,
    // host: "0.0.0.0",
  },
};

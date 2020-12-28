// eslint-disable-next-line @typescript-eslint/no-var-requires
const merge = require("webpack-merge").default;
const tsImportPluginFactory = require("ts-import-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            hack: `true; @import "src/assets/theme.less";`,
          },
        },
      },
    },
  },
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(
        new CompressionPlugin({
          test: /\.(js|css)$/,
          algorithm: "gzip"
        })
      );
      //压缩混淆
      config.optimization = {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            parallel: true,
            cache: true,
            // https://github.com/terser/terser#minify-options
            terserOptions: {
              compress: {
                drop_console: true
              }
            }
          })
        ],
        runtimeChunk: "single",
        // 分片，防止chunk过大
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace("@", "")}`;
              }
            }
          }
        }
      };
    }
  },
  chainWebpack: (config) => {
    // 按需加载vant组件
    const configTsLoader = (rule) => {
      rule.use("ts-loader").tap((options) => {
        options = merge(options,  {
            getCustomTransformers: () => ({
              before: [
                tsImportPluginFactory({
                  libraryDirectory: "es",
                  libraryName: "vant",
                  style: (name) => {
                    console.log(name)
                    if (name === "vant/es/col") return `${name}/style`;
                    return `${name}/style/less`;
                  },
                }),
              ],
            }),
            compilerOptions: {
              module: "es2015",
            },
          })  
          return options
      })
    };
    configTsLoader(config.module.rule("ts"));
    configTsLoader(config.module.rule("tsx"));
  },
  devServer: {
    proxy: {
      "/apiXj": {
        target: "https://103.219.176.60/",
        changeOrigin: true,
        pathRewrite: {
          "^/apiXj/": "",
        },
      },
    },
  },
};

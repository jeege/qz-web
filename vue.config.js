// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsImportPluginFactory = require("ts-import-plugin");
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
  chainWebpack: (config) => {
    // 按需加载vant组件
    const configTsLoader = (rule) => {
      rule.use("ts-loader").tap((options) =>
        Object.assign(options, {
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryDirectory: "es",
                libraryName: "vant",
                style: (name) => {
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
      );
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

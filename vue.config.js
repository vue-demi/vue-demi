// 正式环境
const IS_RELEASE = process.env.VUE_APP_CURRENTMODE === 'release';
module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
  css: {
    sourceMap: !IS_RELEASE,
  },
  productionSourceMap: !IS_RELEASE,
  devServer: {
    open: false,
    host: 'dev.10jqka.com.cn',
    port: 8080,
    https: true,
  },
};

// 正式环境
/* eslint-disable camelcase */
const path = require('path');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');

// 正式环境
const IS_RELEASE = process.env.VUE_APP_CURRENTMODE === 'release';

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
  // 正式环境关掉 sourceMap
  css: {
    sourceMap: !IS_RELEASE,
  },
  productionSourceMap: !IS_RELEASE,
  lintOnSave: false,
  // 链式 webpack 配置
  chainWebpack: config => {
    // 小文件转换为 base64
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options =>
        Object.assign(options, {
          limit: 10240,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]',
            },
          },
        })
      );
  },
  // webpack 配置
  configureWebpack: config => {
    // enhanced-resolve 处理依赖模块路径解析
    Object.assign(config.resolve, {
      alias: {
        '@': resolve('src'),
        _c: resolve('src/components'),
        _v: resolve('src/views'),
      },
      extensions: ['.ts', '.vue', '.less', '.json', '.js'],
      mainFields: ['browser', 'module', 'main'],
    });
    // webpack 优化项
    config.optimization = {
      minimizer: [
        new TerserJSPlugin({
          terserOptions: {
            compress: {
              dead_code: true,
              drop_debugger: IS_RELEASE,
              drop_console: IS_RELEASE,
            },
          },
        }),
      ],
    };
    // 将变量注入每个模块
    config.plugins.push(
      new webpack.ProvidePlugin({
        // 全局配置项
        _Global: [resolve('./src/config/index.ts'), 'default'],
        // 工具库
        _t: [resolve('./src/lib/tools.ts'), 'default'],
      })
    );
    config.externals = [
      {
        vue: 'Vue',
      },
    ];
  },
  devServer: {
    open: false,
    host: 'dev.10jqka.com.cn',
    port: 8080,
    https: true,
    // 接口代理配置
    // proxy: {
    //   '/api': {
    //     target: 'https://testm.10jqka.com.cn',
    //     ws: false,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': '',
    //     },
    //   },
    // },
  },
};

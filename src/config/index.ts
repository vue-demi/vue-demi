/**
 * @description: 全局变量
 * @param {String} str
 */
// 环境域名
const envHost: Record<string, string> = {
  // 对应proxy
  dev: '/api',
  //对应测试环境主域名
  test: '//testm.10jqka.com.cn',
  //对应正式环境主域名
  release: '',
};
const BASE_URL_API = envHost[process.env.VUE_APP_CURRENTMODE || 'release'];

// 相同域名接口申明(自动拼接域名前缀)
const interfaceApi: Record<string, string> = {
  interfaceDemo: '/interfaceDemo',
};
Object.keys(interfaceApi).forEach(key => (interfaceApi[key] = BASE_URL_API + interfaceApi[key]));

// 不同域名接口申明
const diffHostInterface: Record<string, any> = {
  //对应开发环境主域名
  dev: {},
  //对应测试环境主域名
  test: {},
  //对应正式环境主域名
  release: {},
};
export default {
  stat: {
    pageId: '',
    // eslint-disable-next-line camelcase
    url_ver: '',
  },
  api: {
    ...interfaceApi,
    // 其余域名自行填充
    ...diffHostInterface[process.env.VUE_APP_CURRENTMODE || 'release'],
  },

  url: {
    // 续费页面
    renewalLink: '',
    // 购买页
    bugPage: '',
    // 功能介绍页面
    productDescLink: '',
  },
};

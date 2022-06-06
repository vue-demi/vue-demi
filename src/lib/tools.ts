/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-invalid-this */
/* eslint-disable prefer-rest-params */
class DatePlus extends Date {
  constructor(args: string | number | Date) {
    args ? super(args) : super();
  }
  Format(fmt = 'yyyy-MM-dd hh:mm:ss') {
    const quarterlyMonths = 3;
    const o: Record<string, number> = {
      //月份
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'h+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      'q+': Math.floor((this.getMonth() + quarterlyMonths) / quarterlyMonths),
      S: this.getMilliseconds(),
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        `${this.getFullYear()}`.substr(quarterlyMonths + 1 - RegExp.$1.length)
      );
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? '' + o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
        );
      }
    }
    return fmt;
  }
}

/**
 * @desc   判断安卓系统版本号
 * @return {String} 如4.3.2或者9.0
 */
function getGphoneVersion() {
  const ua = navigator.userAgent.toLowerCase();
  let version = null;

  if (ua.indexOf('android') > 0) {
    const reg = /android [\d._]+/gi;
    const vInfo = ua.match(reg);
    version = `${vInfo}`.replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.');
  }

  return version;
}

/**
 * @desc   判断苹果系统版本号
 * @return {String} 如9.3.2或者9.0
 */
function getIphoneVersion() {
  const ua = navigator.userAgent.toLowerCase();
  let version = null;

  if (ua.indexOf('like mac os x') > 0) {
    const reg = /os [\d._]+/gi;
    const vInfo = ua.match(reg);
    version = `${vInfo}`.replace(/[^0-9|_.]/gi, '').replace(/_/gi, '.');
  }

  return version;
}

/**
 * @description: 获取系统信息
 * @return {Object} sys: 手机系统    version: 系统版本号
 */
function getOS() {
  const SYS = /(iphone)|(mac)|(ipad)/gi.test(navigator.userAgent) ? 'iphone' : 'gphone';
  return {
    sys: SYS,
    version: SYS === 'iphone' ? getIphoneVersion() : getGphoneVersion(),
  };
}

/**
 * @description: 设置页面标题
 * @param {String} str
 */
function setTitle(str: string) {
  document.title = str;

  if (/hexin/gi.test(navigator.userAgent)) {
    if (navigator.userAgent.toLowerCase().indexOf('android') > 0) {
      window.callNativeHandler('changeWebViewTitle', {
        title: str,
        url: '',
      });
    } else {
      window.callNativeHandler('updateTitleAutomatically');
    }
  }
}

/**
 * @description: 安卓单页应用调用协议解决页面返回 bug
 */
function androidCanBackProtocol() {
  if (/hexin/gi.test(navigator.userAgent) && getOS().sys === 'gphone') {
    const data = {
      method: 'setBrowserField',
      params: {
        isUseDefaultBack: 'true',
      },
    };
    window.callNativeHandler('notifyWebHandleEvent', JSON.stringify(data));
  }
}

/**
 * @description: 动态加载 js 脚本文件
 * @param {String} url
 * @param {Function} nextFn
 */
function loadJs(url: string, nextFn: { (): void; (): any }) {
  const body = document.getElementsByTagName('body')[0];
  const jsNode = document.createElement('script');
  jsNode.setAttribute('type', 'text/javascript');
  jsNode.setAttribute('src', url);

  jsNode.onload = function () {
    nextFn && nextFn();
  };

  body.appendChild(jsNode);
}

/**
 * @description: 验证登录（包含微信授权登录）
 * @param {Function} nextFn
 * 依赖loadJs
 */
function checkLogin(nextFn: () => any) {
  if (window.getAppVersion()) {
    if (window.getAccount()) {
      typeof nextFn === 'function' && nextFn();
    } else {
      window.location.href = 'http://eqhexin/changeUser';
    }
  } else {
    if (window.getUserid()) {
      typeof nextFn === 'function' && nextFn();
    } else {
      if (window.wechatLogin) {
        window.wechatLogin(encodeURIComponent(window.location.href));
      } else {
        loadJs('https://upass.10jqka.com.cn/asset/wechatlogin/js/checkwechat.js', function () {
          window.wechatLogin(encodeURIComponent(window.location.href));
        });
      }
    }
  }
}

/**
 * 跳转客户端股票分时页
 * @param {string | number} stockCode 股票代码
 * @param {string | number} marketId 市场id
 */
function jumpToFenShi(stockCode: string, marketId: string) {
  location.href = `client://client.html?action=ymtz^webid=2205^stockcode=${stockCode}^marketid=${marketId}`;
}

//消抖
function debounce(fn: { apply: (arg0: any, arg1: IArguments) => void }, delay: number | undefined) {
  let timer: string | number | NodeJS.Timeout | null | undefined = null;
  return function () {
    const args = arguments;
    // @ts-ignore
    const context = this;
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  };
}
/**
 * 调用 2804 webview 打开新页面
 * @param {string} url 跳转地址
 */
function jumpBy2804(url: string) {
  if (!url || typeof url !== 'string') {
    return;
  }
  if (window.getAppVersion() && url.indexOf('client.html') === -1) {
    !url.startsWith('http') && (url = location.protocol + url);
    location.href = `client://client.html?action=ymtz^webid=2804^mode=new^url=${url}`;
  } else {
    location.href = url;
  }
}

export default {
  DatePlus,
  getOS,
  setTitle,
  androidCanBackProtocol,
  checkLogin,
  jumpToFenShi,
  jumpBy2804,
  debounce,
};

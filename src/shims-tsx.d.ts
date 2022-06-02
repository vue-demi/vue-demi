import Vue, { VNode } from 'vue';

type AppFunction = () => stirng;
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
  interface Window {
    hxmui?: any;
    wechatLogin?: any;
    callNativeHandler: any;
    getAppVersion: AppFunction;
    getAccount: AppFunction;
    getUserid: AppFunction;
  }
}

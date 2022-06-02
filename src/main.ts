import Vue from 'vue';
import App from './App.vue';
import router from './router/index.ts';
import '@/assets/styles/reset.css';

// 注册全局组件
Vue.use(window.hxmui, { projectName: 'projectName' });

Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

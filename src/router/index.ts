import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes.ts';

Vue.use(Router);

const router = new Router({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return (
      savedPosition || {
        x: 0,
        y: 0,
      }
    );
  },
});

router.beforeEach((to, from, next) => {
  if (
    _t.getOS().sys === 'iphone' ||
    (_t.getOS().sys === 'gphone' && _t.getOS().version.split('.')[0] >= 5)
  ) {
    to.meta.title && _t.setTitle(to.meta.title);
  }
  _t.androidCanBackProtocol();
  next();
});

export default router;

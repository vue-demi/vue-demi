import Home from '_v/Home.vue';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      // config current page title
      title: '',
    },
  },
  {
    path: '*',
    redirect: '/',
  },
];

# vue-demi-cli

## 项目目录

```
├── public
├── src
│   ├── apis          # 接口配置
│   │   ├── index.ts  # 定义接口调用方法
│   │   └── http.ts   # axios 配置
│   ├── assets      # 静态资源
│   │   └── images
│   │   └── styles
│   │       ├── reset.less       # 重置浏览器默认样式
│   │       ├── common.less      # 公共样式
│   ├── components  # 组件
│   │   ├── common  # 公共组件
│   │   └── ...     # 其他组件
│   ├── config      # 配置文件 接口地址 跳转页面地址
│   │   └── index.ts            # 公共配置
│   ├── lib         # 工具库
│   │   ├── tools.ts   # 全局公共方法
│   │   ├── filters.ts # 过滤器方法
│   │   └── ...        # 其他工具
│   ├── router      # vue router 配置
│   │   ├── index.ts   # 导出路由入口
│   │   └── routes.ts  # 路由表
│   └── views       # 页面
│       ├── home.vue   # 首页
│       └── ...        # 其他页面
├── App.vue             # 根组件
├── main.ts             # 入口文件
├── .browserslistrc     # 浏览器兼容范围
├── .env.dev            # 开发环境变量
├── .env.test           # 测试/预发布环境变量
├── .env.release        # 正式环境变量
├── babel.config.js     # babel 配置文件
├── postcss.config.js   # postcss 配置文件
└── vue.config.js       # vue-cli 配置文件
```

## 全局设置

### 全局 js 方法

1. 全局配置，文件地址：`src/config/index.ts`（调用变量 `_Global` 获取，包括埋点，跳转地址，接口地址）
2. 全局方法，文件地址：`src/lib/tools.ts`（调用变量 `_t` 获取，包括分享，数据校验，浏览器环境监测等工具方法）
3. 全局埋点方法，文件地址：`src/lib/stat.ts`（调用变量 `_s` 获取）

### 全局 css 样式

1. 公共样式，在 `src/assets/styles/index.less` 中统一后在 main.js 中引入全局（包括字体，动画，iphoneX 适配等）
2. 全局混合，在 `vue.config.js` 中将 `src/assets/styles/var.less` 及 `src/assets/styles/mixins.less` 注册到全局（包括各种颜色变量等）

## 项目设置与构建

```
npm install
```

### 开发环境下编译并热重载

```
npm run serve
```

### 预发布/测试环境构建

```
npm run build-test
```

### 正式生产环境构建

```
npm run build
```

## 更新记录

|    jira     | 描述 |  时间   | 开发 |
| :---------: | :--: | :-----: | :--: |
| SJCGBS-xxxx | xxxx | xxxx-xx | xxx  |

/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: '主页', icon: 'smile', component: './Welcome' },
  { path: '/invoke', name: '接口调用', layout: 'top', icon: 'crown', component: './Invoke' },
  { path: '/search', name: '中台搜索', icon: 'crown', exact: false, component: './Search' },
  { path: '/analysis', name: 'Excel分析', icon: 'crown', exact: false, component: './Analysis' },
  {
    path: '/admin',
    name: '业务管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin/interface', name: '接口管理', icon: 'smile', component: './Admin/Interface' },
      { path: '/admin/user', name: '用户管理', icon: 'smile', component: './Admin/User' },
      { path: '/admin/analysis', name: '接口分析', icon: 'smile', component: './Admin/Analysis' },
    ],
  },
  {
    path: '/system',
    name: '系统管理',
    access: 'canAdmin',
    icon: 'smile',
    routes: [
      { path: '/system', redirect: '/system/dict' },
      { path: '/system/dict', name: '字典管理', icon: 'crown', component: './System/Dict' },
      { path: '/system/config', name: '参数配置', icon: 'crown', component: './System/Config' },
      { path: '/system/job', name: '定时任务', icon: 'crown', component: './System/Job' },
    ],
  },
  {
    path: '/person',
    name: '我的',
    icon: 'smile',
    routes: [
      { path: '/person/center', name: '个人中心', icon: 'smile', component: './User/Center' },
      { path: '/person/setting', name: '个人设置', icon: 'smile', component: './User/Setting' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];

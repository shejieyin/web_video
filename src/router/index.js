import Vue from 'vue'
import Router from 'vue-router'
import {
  isMobileFlag
} from "@/assets/utils"
import axios from "axios"
import store from "@/vuex/store"

Vue.use(Router)

const dir = isMobileFlag() ? 'pages/MC/' : 'pages/PC/'

const router = new Router({
  routes: [{
    path: '/',
    name: 'Layout',
    component: resolve => require([`@/${dir}Layout/Layout`], resolve),
    children: [
      //首页
      {
        path: '/',
        name: 'Index',
        component: resolve => require([`@/${dir}Index/Index`], resolve)
      }, {
        path: '/login',
        alias: '/register',
        name: 'Wrapper',
        component: resolve => require([`@/${dir}Login/Wrapper`], resolve),
        //登录页
        children: [{
            path: '/login',
            name: 'Login',
            component: resolve => require([`@/${dir}Login/Login`], resolve)
          },
          //注册页
          {
            path: '/register',
            name: 'Register',
            component: resolve => require([`@/${dir}Login/Register`], resolve)
          }
        ]
      },
      //视频列表页
      {
        path: '/video/list/:tag',
        name: 'VideoList',
        component: resolve => require([`@/${dir}Video/VideoList`], resolve)
      },
      //视频搜索页
      {
        path: '/video/search/:keyword',
        name: 'VideoList',
        component: resolve => require([`@/${dir}Video/VideoList`], resolve)
      },
      //视频详情页
      {
        path: '/video/detail/:id',
        name: 'VideoDetail',
        component: resolve => require([`@/${dir}Video/VideoDetail`], resolve)
      },
      //视频发布页
      {
        path: '/video/publish',
        name: 'VideoPublish',
        component: resolve => require([`@/${dir}Video/VideoPublish`], resolve)
      },
      //视频编辑页
      {
        path: '/video/edit/:id',
        name: 'VideoPublish',
        component: resolve => require([`@/${dir}Video/VideoPublish`], resolve)
      },
      //作品列表页
      {
        path: '/home/admin',
        name: 'Admin',
        component: resolve => require([`@/${dir}Home/Admin`], resolve)
      },
      //个人资料页
      {
        path: '/home/info',
        name: 'Info',
        component: resolve => require([`@/${dir}Home/Info`], resolve)
      },
      //数据中心页
      {
        path: '/home/data',
        name: 'Data',
        component: resolve => require([`@/${dir}Home/Data`], resolve)
      },
      //消息通知页
      {
        path: '/home/message/:id',
        name: 'Message',
        component: resolve => require([`@/${dir}Home/Message`], resolve)
      },
      //个人中心页
      {
        path: '/home/:id',
        name: 'Home',
        component: resolve => require([`@/${dir}Home/Home`], resolve)
      },
       //直播中心 用于做发起直播的相关配置
       {
        path:'/Online/index',
        name: 'OnlineIndex',
        meta: {
          requiredAuth: true
        },
        component:resolve=>require([`@/${dir}Home/OnlineIndex`], resolve)
      },
      //直播列表页 展示当前做所有的直播
      {
        path: '/video/OnlineList/',
        name: 'OnlineList',
        meta: {
          requiredAuth: true
        },
        component: resolve => require([`@/${dir}Video/OnlineList`], resolve)
      },
      //直播现场 点击直播列表某一直播进入 的详情页面
      {
        path: '/video/online/',
        name: 'online',
        meta: {
          requiredAuth: true
        },
        component: resolve => require([`@/${dir}Video/online`], resolve)
      },
      //直播数据中心
      {
        path: '/video/onlineRoom/',
        name: 'onlineRoom',
        meta: {
          requiredAuth: true
        },
        component:resolve=>require([`@/${dir}Home/OnlineRoom`], resolve)
      },
    ]
  }]
})

// 判断是否需要登录权限 以及是否登录
// router.beforeEach((to, from, next) => {
//   console.log('现在是进行路由判断环节')
//   //获取请求token
//   if (!store.getters.token) {
//     axios.get(store.state.host + "get_csrf").then((res) => {
//       console.log(res.data)
//       store.dispatch("CHANGE_TOKEN", res.data.csrf_token)
//     });
//   }
//   if (to.matched.some(route => route.meta.requiredAuth)) { // 判断是否需要登录权限
//     if (sessionStorage.getItem('user')) { // 判断是否登录
//       next()
//     } else { // 没登录则跳转到登录界面
//       next({
//         path: '/login',
//         query: {
//           redirect: to.fullPath
//         }
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router;

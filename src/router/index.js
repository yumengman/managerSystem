import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/layout/home'
import contentMain from '@/components/layout/contentMain'
import index from '@/page/index'
import slidePath from './slidePath.js'
import login from '@/page/login'
Vue.use(Router)


//默认不需要权限的页面
export const constantRouterMap = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:slidePath
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  }
]
export default new Router({
  routes: constantRouterMap
      // [
      // {
      //   path: '/',
      //   name: 'Home',
      //   component: Home,
      //   children:slidePath
      // },
      // {
      //   path: '/login',
      //   name: 'login',
      //   component: login,
      // }
})
//异步路由（需要权限的页面）
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: index,
    meta: {
        title: '系统首页',
        icon: 'el-icon-s-home',
    },
    noDropdown:true,
  },
  {
    path:'/user',
    name:'user',
    meta:{
      title:'用户信息',
      icon:'el-icon-user-solid'
    },
    component: contentMain,
    children:[
      {
        path: 'userinfo',
        name:'userinfo',
        meta: {
            title: '个人信息',
            icon: 'el-icon-user',
        },
        //component:userinfo
        component: () => import('@/page/user/userinfo'), 
      },{
        path: 'changePwd',
        name:'changePwd',
        meta: {
            title: '修改密码',
            icon: 'el-icon-user',                    
        },
        //component:changePwd
        component: () => import('@/page/user/changePwd'), 
      },
    ]
  },

  {
    path: '/goodsManager',
    name: 'goodsManager',
    component:  contentMain,
    meta: {
        title: '商品管理',
        icon: 'el-icon-menu',
    },

  children:[
    {
      path: 'goodsMessage',
      name:'goodsMessage',
      meta: {
          title: '商品信息',
          icon: 'el-icon-menu', 
      },
      //component:goodsMessage
      component: () => import('@/page/goodsManager/goodsMessage'), 
    },{
      path: 'orderMessage',
      name:'orderMessage',
      meta: {
          title: '订单信息',
          icon: 'el-icon-menu',  
      },
      //component:orderMessage
      component: () => import('@/page/goodsManager/orderMessage'), 
    }
  ]
},

{
  path: '/statistical',
  name: 'statistical',
  component:  contentMain,
  meta: {
      title: '统计报表',
      icon: 'el-icon-s-data',
  },
  children: [
    {
      path: 'dataStatistical',
      name:'dataStatistical',
      meta: {
          title: '数据统计',
          icon: ' ',
          
      },
      //component:dataStatistical
      component: () => import('@/page/statistical/dataStatistical'), 
    },{
      path: 'scoreStatistical',
      name: 'scoreStatistical',
      meta: {
          title: '得分统计',
          icon: ' ',
          
      },
      //component:scoreStatistical
      component: () => import('@/page/statistical/scoreStatistical'), 
    },
] 
}
]

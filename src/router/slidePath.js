import Home from '@/components/layout/home'
import contentMain from '@/components/layout/contentMain'
import index from '@/page/index'

import userinfo from '@/page/user/userinfo'
import changePwd from '@/page/user/changePwd'
import goodsMessage from '@/page/goodsManager/goodsMessage'
import orderMessage from '@/page/goodsManager/orderMessage'
import dataStatistical from '@/page/statistical/dataStatistical'
import scoreStatistical from '@/page/statistical/scoreStatistical'

export default [
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


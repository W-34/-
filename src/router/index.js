import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
  {
    // 待替换为登录界面
    path:'/',
    name:"home",
    redirect: '/login'
  },
  {
    // 待替换为登录界面
    path:'/login',
    name:"login",
    component:()=>import('../views/login/LoginView.vue')
  },
  // 管理员界面
  {
    path:'/master',
    name:"master-main",
    component:()=>import('../views/master/MasterView.vue')
  },
  {
    path:'/master/model-manage',
    name:"master-model_manage",
    component:()=>import('../views/master/ModelManage.vue')
  },
  {
    path:'/master/trade',
    name:"master-trade",
    component:()=>import('../views/master/TradeView.vue')
  },
  {
    path:'/master/check',
    name:"master-check",
    component:()=>import('../views/master/ForChecking.vue')
  },
  // 银行柜员界面
  {
    path:'/worker',
    name:"worker-main",
    component:()=>import('../views/worker/WorkersView.vue')
  },
  {
    path:'/worker/work',
    name:"worker-work",
    component:()=>import('../views/worker/WorkView.vue')
  },
  {
    path:'/worker/add',
    name:"worker-add",
    component:()=>import('../views/worker/AddView.vue')
  },
  // 用户界面
  {
    path:'/user',
    name:"user-main",
    component:()=>import('../views/user/UserView.vue')
  },
  {
    path:'/user/trade',
    name:"user-trade",
    component:()=>import('../views/user/TradesView.vue')
  },
  {
    path:'/user/card',
    name:"user-card",
    component:()=>import('../views/user/CardView.vue')
  }
]

const router = new VueRouter({
  // mode: 'hash',
  // base: process.env.BASE_URL,
  routes
})

export default router

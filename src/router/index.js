import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import home from '@/views/home/home'

const login = ()=> import('@/views/login/login.vue');
const my = ()=> import('@/views/my/my.vue');
const videos = ()=> import('@/views/videos/videos.vue');
const friend = ()=> import('@/views/friend/friend.vue');
const account = ()=> import('@/views/account/account.vue');
const records = ()=> import('@/views/my/records/records.vue');
//todolist
const search = ()=> import('@/views/search/search.vue');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/my',
      name: 'my',
      component: my,
      children : [
        {
          path: 'records',
          name: 'records',
          component: records,
        }
      ]
    },
    {
      path: '/videos',
      name: 'videos',
      component: videos
    },
    {
      path: '/friend',
      name: 'friend',
      component: friend
    },
    {
      path: '/account',
      name: 'account',
      component: account
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '*',
      redirect: '/home' //所以未定义的路由都重定向至home
    }
  ]
})

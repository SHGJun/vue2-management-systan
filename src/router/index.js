import Vue from 'vue';
import VueRouter from 'vue-router'
import MainLayout from '@/layout/MainLayout.vue'
// import HomePage from '@/views/Home/HomePage.vue'
// import { getLocalStorage } from '@/utils';
import LoginPage from '@/views/Login/LoginPage.vue'
import TestPage from '@/views/test/TestPage.vue'

Vue.use(VueRouter)

const routes = [
    // 首页
    {
        path:'/',
        name:'layout',
        // component:HomePage
        component:MainLayout
    },
    // 登录页面
    {
        path:'/login',
        name:'login',
        component:LoginPage
    },
    // 测试页面
    {
        path:'/test',
        name:'test',
        component:TestPage
    } 
]

const router = new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes
})

// 路由守卫
// router.beforeEach((to,form,next)=>{

//      校验token是否存在
//      const token = getLocalStorage('token');
//     if(to.path=='login' && token){
//         next('/');
//         return;
//     }
//     if(to.path!=='/login'&&!token){
//         next('/login');
//         return;
//     }
//     next();
// })

export default router;
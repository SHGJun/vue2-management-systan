import Vue from 'vue';
import VueRouter from 'vue-router'
import MainLayout from '@/layout/MainLayout.vue'
import HomePage from '@/views/Home/HomePage.vue'
import { getLocalStorage } from '@/utils';
import LoginPage from '@/views/Login/LoginPage.vue'
import TestPage from '@/views/test/TestPage.vue'
import MapPage from '@/views/Map/MapPage.vue'
import ChartPage from '@/views/Chart/ChartPage.vue'
import errPage from '@/views/errPage.vue'

Vue.use(VueRouter)

const routes = [
    // 首页
    {
        path:'/',
        redirect:'/home',
        name:'layout',
        component:MainLayout,
        children:[
            {
                name:'home',
                path:'/home',
                component:HomePage,
                meta:{
                    titles:['首页']
                }
            },
            {
                name:'chart',
                path:'/chart',
                component:ChartPage,
                meta:{
                    titles:['图表']
                }
            },
            {
                name:'map',
                path:'/map',
                component:MapPage,
                meta:{
                    titles:['地图']
                }
            },
            
        ]
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
    },
    {
        path:'*',
        component:errPage
    }
]

const router = new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes
})

// 路由守卫
router.beforeEach((to,form,next)=>{

    //  校验token是否存在
     const token = getLocalStorage('shg_token');
    if(to.path=='/login' && token){
        next('/');
        return;
    }
    if(to.path!=='/login'&&!token){
        next('/login');
        return;
    }
    next();
})

export default router;
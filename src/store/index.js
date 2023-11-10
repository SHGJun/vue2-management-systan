import Vue from 'vue';
import Vuex from 'vuex';
import navCollapse from './modules/navCollapse';
import user from './modules/user';
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{},
    mutations:{},
    actions:{},
    getters:{},
    modules:{
        user,
        navCollapse,
    }
})

export default store;
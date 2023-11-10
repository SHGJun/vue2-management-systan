import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
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
    },
    plugins:[createPersistedState({
        key:'user_info',
        storage: window.sessionStorage,
    })]
})

export default store;
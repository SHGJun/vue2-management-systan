import Vue from 'vue';
import Vuex from 'vuex';
import navCollapse from './navCollapse'
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{},
    mutations:{},
    actions:{},
    getters:{},
    modules:{
        navCollapse,
    }
})

export default store;
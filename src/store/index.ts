import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);// 把 store 绑到 Vue.prototype.$store = store

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increament(state, n: number) {
            state.count += n;
        }
    },
});

export default store;

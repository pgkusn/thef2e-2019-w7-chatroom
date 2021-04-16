import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        name: localStorage.getItem('chartName') || '匿名',
    },
    mutations: {
        updateName(state, payload) {
            state.name = payload;
        }
    },
})

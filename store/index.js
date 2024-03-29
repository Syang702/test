import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import user from "./modules/user.js";

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        user,
    },
});

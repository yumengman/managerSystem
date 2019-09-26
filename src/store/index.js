import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import permission from './modules/permission'
import menu from './modules/menu'
import count from './modules/count'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        permission,
        menu,
        count,
        user
    }
})
export default store

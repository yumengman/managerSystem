import { removeToken } from '@/utils/auth'
const user = {
  state: {
    avatar: '',
    roles: [],
    users:[],
  },

  mutations: {

  },

  actions: {
    // 前端 登出
    FedLogOut({  }) {
      return new Promise(resolve => {
        removeToken()
        resolve()
      })
    }
  }
}

export default user

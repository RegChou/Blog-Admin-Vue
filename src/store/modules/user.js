import storage from 'store'
import { login, getInfo, logout, socialLogin } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import notification from 'ant-design-vue/es/notification'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const { data } = response
          if (data === undefined) {
            notification['error']({
              message: '错误',
              description: response.message,
              duration: 4
            })
            reject(response.message)
          } else {
            commit('SET_TOKEN', data.token)
            storage.set(ACCESS_TOKEN, data.token, 7 * 24 * 60 * 60 * 1000)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    socialLogin ({ commit }, params) {
      console.log(params)
      return new Promise((resolve, reject) => {
        socialLogin(params).then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          storage.set(ACCESS_TOKEN, data.token, 7 * 24 * 60 * 60 * 1000)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const { data } = response
          const { roles, name, avatar } = data
          if (!roles || roles.length <= 0) {
            reject(new Error('getInfo: roles must be a non-null array!'))
          }

          commit('SET_INFO', data)
          commit('SET_ROLES', roles)
          commit('SET_AVATAR', avatar)

          commit('SET_NAME', { name: name, welcome: welcome() })
          commit('SET_AVATAR', avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
        })
      })
    }
  }
}

export default user

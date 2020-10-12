import axios from 'axios'

export default {
  state: {
    dataUsers: [],
    page: 1,
    limit: 5,
    search: '',
    totalData: null
  },
  mutations: {
    setDataUser(state, payload) {
      state.dataUsers = payload.data
      state.dataUsers.map(value => {
        value.user_created_at = value.user_created_at.slice(0, 10)
        value.user_updated_at = value.user_updated_at.slice(0, 10)
      })
      state.totalData = payload.pagination.totalData
    },
    setLimitUser(state, payload) {
      state.limit = payload
    },
    setPageUser(state, payload) {
      state.page = payload
    }
  },
  actions: {
    getUsers(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `http://127.0.0.1:3000/users?page=${context.state.page}&limit=100`
          )
          .then(response => {
            context.commit('setDataUser', response.data)
            resolve(response.data)
          })
          .catch(error => reject(error.response))
      })
    },
    patchUsers(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`http://127.0.0.1:3000/users/edit/${payload.id}`, payload.form)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getDataUser(state) {
      return state.dataUsers
    },
    getLimitUser(state) {
      return state.limit
    },
    getPageUser(state) {
      return state.page
    },
    getTotalDataUser(state) {
      return state.totalData
    }
  }
}

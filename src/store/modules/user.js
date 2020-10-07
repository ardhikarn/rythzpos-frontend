import axios from 'axios'

export default {
  state: {
    dataUser: [],
    page: 1,
    limit: 5,
    search: '',
    sort: 'user_id',
    totalData: null
  },
  mutations: {
    setDataUser(state, payload) {
      state.dataUser = payload.data
      state.dataUser.map(value => {
        value.user_created_at = value.user_created_at.slice(0, 10)
        value.user_updated_at = value.user_updated_at.slice(0, 10)
      })
      state.totalData = payload.pagination.totalData
    },
    setLimitUser(state, payload) {
      state.limit = payload
    },
    sortUser(state, payload) {
      state.sort = payload
    },
    setPageUser(state, payload) {
      state.page = payload
    }
  },
  actions: {
    getAllUser(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `http://127.0.0.1:3000/users?page=${context.state.page}&limit=${context.state.limit}&sort=${context.state.sort}`
          )
          .then(response => {
            context.commit('setDataUser', response.data)
            resolve(response.data)
          })
          .catch(error => reject(error.response))
      })
    }
  },
  getters: {
    getDataUser(state) {
      return state.dataUser
    },
    getLimitUser(state) {
      return state.limit
    },
    getTotalDataUser(state) {
      return state.totalData
    }
  }
}

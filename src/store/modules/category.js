import axios from 'axios'

export default {
  state: {
    itemCategory: []
  },
  mutations: {
    setCategory(state, payload) {
      state.itemCategory = payload
      state.itemCategory.map(value => {
        value.category_created_at = value.category_created_at.slice(0, 10)
        value.category_updated_at = value.category_updated_at.slice(0, 10)
      })
    },
    clearHistory(state) {
      state.itemCategory = []
    }
  },
  actions: {
    getCategory(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}category`)
          .then(response => {
            context.commit('setCategory', response.data.data)
            resolve(response.data)
          })
          .catch(error => reject(error.response))
      })
    },
    postCategory(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}category`, payload)
          .then(response => {
            context.commit('clearHistory')
            resolve(response.data)
          })
          .catch(error => reject(error.response))
      })
    },
    patchCategory(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_URL}category/${payload.category_id}`,
            payload.formCategory
          )
          .then(response => {
            context.commit('clearHistory')
            resolve(response.data)
          })
          .catch(error => reject(error.response))
      })
    },
    deleteCategory(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_URL}category/${payload}`)
          .then(response => {
            context.commit('clearHistory')
            resolve(response.data)
          })
          .catch(error => reject(error.response))
      })
    }
  },
  getters: {
    getItemCategory(state) {
      return state.itemCategory
    }
  }
}

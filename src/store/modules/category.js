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
      axios
        .get('http://127.0.0.1:3000/category')
        .then(response => context.commit('setCategory', response.data.data))
        .catch(error => console.log(error.response))
    },
    postCategory(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/category', payload)
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
            `http://127.0.0.1:3000/category/${payload.category_id}`,
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
          .delete(`http://127.0.0.1:3000/category/${payload}`)
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

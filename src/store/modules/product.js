import axios from 'axios'

export default {
  state: {
    products: [],
    page: 1,
    limit: 6,
    search: '',
    sort: 'product_name',
    totalData: null
  },
  mutations: {
    setProduct(state, payload) {
      state.products = payload.data
      state.totalData = payload.pagination.totalData
    },
    setSearchResult(state, payload) {
      state.products = payload
    },
    sortProduct(state, payload) {
      state.sort = payload
    },
    setPage(state, payload) {
      state.page = payload
    }
  },
  actions: {
    getProducts(context, payload) {
      axios
        .get(
          `http://127.0.0.1:3000/product?page=${context.state.page}&limit=${context.state.limit}&sort=${context.state.sort}`
        )
        .then(response => {
          context.commit('setProduct', response.data)
        })
        .catch(error => error)
    },
    searchProducts(context, payload) {
      axios
        .get(`http://127.0.0.1:3000/product/search?search=${payload}`)
        .then(response => {
          context.commit('setSearchResult', response.data.data.searchResult)
          context.commit('sortProduct', 'product_id')
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    postProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3000/product', payload)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    patchProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `http://127.0.0.1:3000/product/${payload.product_id}`,
            payload.form
          )
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    deleteProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`http://127.0.0.1:3000/product/${payload}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  getters: {
    getLimit(state) {
      return state.limit
    },
    getPage2(state) {
      return state.page
    },
    getTotalData(state) {
      return state.totalData
    },
    getProduct2(state) {
      return state.products
    },
    getProductId(state) {
      return state.product_id
    }
  }
}

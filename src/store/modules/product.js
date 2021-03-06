import axios from 'axios'

export default {
  state: {
    products: [],
    page: 1,
    limit: 5,
    search: '',
    sort: 'product_id',
    totalData: null,
    cart: [],
    invoice: ''
  },
  mutations: {
    setProduct(state, payload) {
      state.products = payload.data
      state.totalData = payload.pagination.totalData
    },
    setLimit(state, payload) {
      state.limit = payload
    },
    setSearchResult(state, payload) {
      state.products = payload
    },
    sortProduct(state, payload) {
      state.sort = payload
    },
    setPage(state, payload) {
      state.page = payload
    },
    addToCart(state, payload) {
      const addItemToCart = {
        product_id: payload.product_id,
        product_name: payload.product_name,
        product_price: payload.product_price,
        product_image: payload.product_image,
        product_qty: 1
      }
      const fixedData = [...state.cart, addItemToCart]
      const addedItem = fixedData.find(
        item => item.product_id === payload.product_id
      )
      const existItem = state.cart.find(
        item => item.product_id === payload.product_id
      )
      if (existItem) {
        addedItem.product_total = payload.product_price * payload.qty
        addedItem.purchase_qty += 1
      } else {
        state.cart = [...state.cart, addItemToCart]
      }
    },
    removeCart(state, payload) {
      return state.cart.splice(
        state.cart.findIndex(value => value.product_id === payload.product_id),
        1
      )
    },
    incrementQty(state, payload) {
      const findId = state.cart.find(
        value => value.product_id === payload.product_id
      )
      findId.product_qty += 1
    },
    decrementQty(state, payload) {
      const findId = state.cart.find(
        value => value.product_id === payload.product_id
      )
      findId.product_qty -= 1
    },
    cancelOrder(state) {
      state.cart = []
    },
    setInvoice(state, payload) {
      state.invoice = payload
    }
  },
  actions: {
    getProducts(context, payload) {
      axios
        .get(
          `${process.env.VUE_APP_URL}product?page=${context.state.page}&limit=${context.state.limit}&sort=${context.state.sort}`
        )
        .then(response => {
          context.commit('setProduct', response.data)
        })
        .catch(error => error)
    },
    searchProducts(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}product/search?search=${payload}`)
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
          .post(`${process.env.VUE_APP_URL}product`, payload)
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
            `${process.env.VUE_APP_URL}product/${payload.product_id}`,
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
          .delete(`${process.env.VUE_APP_URL}product/${payload}`)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    postOrders(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}order`, payload)
          .then(response => {
            context.commit('setInvoice', response.data.data.invoice)
            resolve(response.data)
          })
          .catch(error => reject(error.response))
      })
    }
  },
  getters: {
    getLimit(state) {
      return state.limit
    },
    getPage(state) {
      return state.page
    },
    getTotalData(state) {
      return state.totalData
    },
    getProduct(state) {
      return state.products
    },
    getProductId(state) {
      return state.product_id
    },
    getCart(state) {
      return state.cart
    },
    getInvoice(state) {
      return state.invoice
    }
  }
}

import axios from 'axios'

export default {
  state: {
    todayIncome: 0
  },
  mutations: {
    setTodayIncome(state, payload) {
      state.todayIncome = payload.data[0].total_income
    }
  },
  actions: {
    getHistoryTodayIncome(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}history/todayincome`)
          .then(response => {
            context.commit('setTodayIncome', response.data)
            resolve(response.data)
          })
          .catch(error => reject(error.response))
      })
    }
  },
  getters: {}
}

import axios from 'axios'

export default {
  state: {
    // Data Card
    todayIncome: 0,
    qtyOrdersWeek: 0,
    yearsIncome: 0,

    // Data Chart
    dataChart: [],

    // Data Table
    dataAllHistory: [],
    periodOfTime: ''
  },
  mutations: {
    setTodayIncome(state, payload) {
      state.todayIncome = payload.data[0].total_income
    },
    setQtyOrdersWeek(state, payload) {
      state.qtyOrdersWeek = payload.data[0].orders
    },
    setYearsIncome(state, payload) {
      state.yearsIncome = payload.data[0].yearsIncome
    },
    setDataChartMonth(state, payload) {
      const addChart = payload.data
      for (let i = 0; i < addChart.length; i++) {
        state.dataChart.push([addChart[i].date, addChart[i].total])
      }
    },
    setAllHistory(state, payload) {
      payload.map(value => {
        const setData = {
          Invoices: `#${value.history_invoice}`,
          Cashier: value.user_name,
          Date: value.history_created_at.slice(0, 10),
          Orders: value.orders
            .map(item => item.product_name.concat(` ${item.order_qty}x`))
            .join(', '),
          Amount: `Rp. ${value.history_subtotal}`
        }
        state.dataAllHistory = [...state.dataAllHistory, setData]
      })
    },
    setPeriodOfTime(state, payload) {
      state.periodOfTime = payload
    },
    setClearDataHistory(state) {
      state.dataAllHistory = []
    },
    setDataTable(state, payload) {
      payload.map(value => {
        const setData2 = {
          Invoices: `#${value.history_invoice}`,
          Cashier: value.user_name,
          Date: value.history_created_at.slice(0, 10),
          Orders: value.orders
            .map(item => item.product_name.concat(` ${item.order_qty}x`))
            .join(', '),
          Amount: `Rp. ${value.history_subtotal}`
        }
        state.dataAllHistory = [...state.dataAllHistory, setData2]
      })
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
    },
    getCountHistoryWeek(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}history/countWeek`)
          .then(response => {
            context.commit('setQtyOrdersWeek', response.data)
            resolve(response.data)
          })
          .catch(error => reject(error.response))
      })
    },
    getHistoryYearsIncome(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}history/yearsIncome`)
          .then(response => {
            context.commit('setYearsIncome', response.data)
            resolve(response.data)
          })
          .catch(error => reject(error.response))
      })
    },
    getHistoryChartThisMonth(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}history/chartThisMonth`)
          .then(response => {
            context.commit('setDataChartMonth', response.data)
            resolve(response.data)
          })
          .catch(error => reject(error.response))
      })
    },
    getAllDataHistory(context, payload) {
      context.commit('setClearDataHistory')
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}history`)
          .then(response => {
            context.commit('setAllHistory', response.data.data.result)
            context.commit('setPeriodOfTime', 'All Time')
            resolve(response.data)
          })
          .catch(error => reject(error.response))
      })
    },
    getDataTables(context, payload) {
      context.commit('setClearDataHistory')
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}history/${payload}`)
          .then(response => {
            context.commit('setDataTable', response.data.data)
            if (payload === 'today') {
              context.commit('setPeriodOfTime', 'Today')
            } else if (payload === 'week') {
              context.commit('setPeriodOfTime', 'This Week')
            } else if (payload === 'month') {
              context.commit('setPeriodOfTime', 'This Month')
            }
            resolve(response.data)
          })
          .catch(error => reject(error.response))
      })
    }
  },
  getters: {
    getTodayIncome(state) {
      return state.todayIncome
    },
    getQtyOrdersWeek(state) {
      return state.qtyOrdersWeek
    },
    getYearsIncome(state) {
      return state.yearsIncome
    },
    getDataChart(state) {
      return state.dataChart
    },
    getAllHistory(state) {
      return state.dataAllHistory
    },
    getPeriodOfTime(state) {
      return state.periodOfTime
    }
  }
}

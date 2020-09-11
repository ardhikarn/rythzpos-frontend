<template>
  <div class="about">
    <b-container fluid>
      <b-row align="center" class="header">
        <b-col sm="1" cols="2" class="align-self-center py-4">
          <b-button v-b-toggle.my-sidebar class="fas fa-bars"></b-button>
          <NavSide @showModal1="showModal" />
        </b-col>
        <b-col sm="11" cols="10" class="cart py-4">History</b-col>
      </b-row>
      <b-row style="height:100%;" class="my-5">
        <b-col xl="4" lg="4" md="4" sm="6" cols="12" class="mb-3">
          <b-card class="today-income py-4">
            <h5 class="mb-1">Today's Income</h5>
            <h3 class>
              <strong>Rp. {{todayIncome}}</strong>
            </h3>
            <h5>+2% Yesterday</h5>
          </b-card>
        </b-col>
        <b-col xl="4" lg="4" md="4" sm="6" cols="12" class="mb-3">
          <b-card class="orders-week py-4">
            <h5 class="mb-1">Orders</h5>
            <h3 class>
              <strong>{{qtyOrdersWeek}}</strong>
            </h3>
            <h5>+5% Last Week</h5>
          </b-card>
        </b-col>
        <b-col xl="4" lg="4" md="4" sm="12" cols="12" class="mb-3">
          <b-card class="years-income py-4">
            <h5 class="mb-1">This Years Income</h5>
            <h3 class>
              <strong>Rp. {{yearsIncome}}</strong>
            </h3>
            <h5>+10% Last Year</h5>
          </b-card>
        </b-col>

        <!-- CHART -->
        <b-col xl="12" class="my-5">
          <b-row class="chart mx-0">
            <b-col xl="6" class>
              <h4 class="m-2">
                <strong>Revenue</strong>
              </h4>
            </b-col>
            <b-col xl="6" class="text-right">
              <b-dropdown size="sm" id="dropdown-dropleft" dropleft :text="month" class="m-2">
                <b-dropdown-item @click="getHistoryChartThisMonth()">This Month</b-dropdown-item>
              </b-dropdown>
            </b-col>
            <b-col xl="12">
              <line-chart class="p-4" :data="dataChart" />
            </b-col>
          </b-row>
        </b-col>

        <!-- TABLE HISTORY -->
        <b-col xl="12" class="my-5">
          <b-row class="chart mx-0">
            <b-col xl="6" class="my-1">
              <h4>
                <strong>Recent Order</strong>
              </h4>
            </b-col>
            <b-col xl="6" class="text-right my-1">
              <b-dropdown dropleft :text="periodOfTime">
                <b-dropdown-item @click="getAllHistory()">All Time</b-dropdown-item>
                <b-dropdown-item @click="getHistoryToday()">Today</b-dropdown-item>
                <b-dropdown-item @click="getHistoryWeek()">This Week</b-dropdown-item>
                <b-dropdown-item @click="getHistoryMonth()">This Month</b-dropdown-item>
              </b-dropdown>
            </b-col>
            <div style="width: 100%">
              <b-table
                striped
                hover
                :items="dataRecentOrder"
                :per-page="limit"
                :current-page="currentPage"
                style="text-align: center"
              ></b-table>
            </div>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import NavSide from '../components/_base/NavSide'

export default {
  name: 'History',
  components: {
    NavSide
  },
  data() {
    return {
      // CARD INCOME, ORDERS
      todayIncome: 0,
      qtyOrdersWeek: 0,
      yearsIncome: 0,

      // CHART
      month: 'month',
      dataChart: [],

      // TABEL HISTORY RECENT ORDER
      history: [],
      cashier: 'Cashier 1',
      dataRecentOrder: [],
      limit: 10,
      currentPage: 1,
      periodOfTime: 'Period of Time'
    }
  },
  created() {
    this.getAllHistory()
    this.getHistoryTodayIncome()
    this.getCountHistoryWeek()
    this.getHistoryYearsIncome()
  },
  methods: {
    // TODAY INCOME
    getHistoryTodayIncome() {
      axios
        .get('http://127.0.0.1:3000/history/todayincome')
        .then((response) => {
          this.todayIncome = response.data.data[0].total_income
        })
        .catch((error) => console.log(error))
    },
    // ORDERS WEEK
    getCountHistoryWeek() {
      axios
        .get('http://127.0.0.1:3000/history/countWeek')
        .then((response) => {
          this.qtyOrdersWeek = response.data.data[0].orders
        })
        .catch((error) => console.log(error))
    },
    // YEARS INCOME
    getHistoryYearsIncome() {
      axios
        .get('http://127.0.0.1:3000/history/yearsIncome')
        .then((response) => {
          this.yearsIncome = response.data.data[0].yearsIncome
        })
        .catch((error) => console.log(error))
    },

    // CHART THIS MONTH
    getHistoryChartThisMonth() {
      axios
        .get('http://127.0.0.1:3000/history/chartThisMonth')
        .then((response) => {
          const addChart = response.data.data
          for (let i = 0; i < addChart.length; i++) {
            this.dataChart.push([addChart[i].date, addChart[i].total])
          }
          this.month = 'This Month'
          this.$router.push('?chart=this-month')
        })
        .catch((error) => console.log(error))
    },

    // GET FOR TABLE RECENT ORDER
    getAllHistory() {
      axios
        .get('http://127.0.0.1:3000/history')
        .then((response) => {
          this.history = response.data.data
          this.history.map((value) => {
            const addDataRecentOrder = {
              Invoices: `#${value.history_invoice}`,
              Cashier: this.cashier,
              Date: value.history_created_at.slice(0, 10),
              Orders: value.orders
                .map((item) => item.product_name.concat(` ${item.order_qty}x`))
                .join(', '),
              Amount: `Rp. ${value.history_subtotal}`
            }
            this.dataRecentOrder = [...this.dataRecentOrder, addDataRecentOrder]
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getHistoryToday() {
      this.dataRecentOrder = []
      axios
        .get('http://127.0.0.1:3000/history/today')
        .then((response) => {
          this.history = response.data.data
          this.history.map((value) => {
            const addDataRecentOrder = {
              Invoices: `#${value.history_invoice}`,
              Cashier: this.cashier,
              Date: value.history_created_at.slice(0, 10),
              Orders: value.orders
                .map((item) => item.product_name.concat(` ${item.order_qty}x`))
                .join(', '),
              Amount: `Rp. ${value.history_subtotal}`
            }
            this.dataRecentOrder = [...this.dataRecentOrder, addDataRecentOrder]
          })
          this.periodOfTime = 'Today'
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getHistoryWeek() {
      this.dataRecentOrder = []
      axios
        .get('http://127.0.0.1:3000/history/week')
        .then((response) => {
          this.history = response.data.data
          this.history.map((value) => {
            const addDataRecentOrder = {
              Invoices: `#${value.history_invoice}`,
              Cashier: this.cashier,
              Date: value.history_created_at.slice(0, 10),
              Orders: value.orders
                .map((item) => item.product_name.concat(` ${item.order_qty}x`))
                .join(', '),
              Amount: `Rp. ${value.history_subtotal}`
            }
            this.dataRecentOrder = [...this.dataRecentOrder, addDataRecentOrder]
          })
          this.periodOfTime = 'This Week'
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getHistoryMonth() {
      this.dataRecentOrder = []
      axios
        .get('http://127.0.0.1:3000/history/month')
        .then((response) => {
          this.history = response.data.data
          this.history.map((value) => {
            const addDataRecentOrder = {
              Invoices: `#${value.history_invoice}`,
              Cashier: this.cashier,
              Date: value.history_created_at.slice(0, 10),
              Orders: value.orders
                .map((item) => item.product_name.concat(` ${item.order_qty}x`))
                .join(', '),
              Amount: `Rp. ${value.history_subtotal}`
            }
            this.dataRecentOrder = [...this.dataRecentOrder, addDataRecentOrder]
          })
          this.periodOfTime = 'This Month'
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<template>
  <div class="about">
    <b-container fluid>
      <b-row align="center" class="header">
        <b-col xl="1" lg="1" cols="2" class="fas fa-bars align-self-center"></b-col>
        <b-col xl="11" class="cart py-4">History</b-col>
      </b-row>
      <b-row style="height:100%;">
        <b-col xl="1" class="navside" align="center">
          <a href="/home">
            <img src="../assets/img-nav/fork.png" alt="Menu" class="my-5" />
          </a>
          <img src="../assets/img-nav/clipboard.png" alt="History" class="my-5" />
          <img src="../assets/img-nav/add.png" alt="Add Menu" class="my-5" @click="showModal()" />
        </b-col>
        <b-col xl="11" class="main-history">
          <b-row class="my-5">
            <b-col xl="4">
              <b-card class="today-income py-4">
                <h5 class="mb-1">Today's Income</h5>
                <h3 class>
                  <strong>Rp. 1.000.000</strong>
                </h3>
                <h5>+2% Yesterday</h5>
              </b-card>
            </b-col>
            <b-col xl="4">
              <b-card class="orders-week py-4">
                <h5 class="mb-1">Orders</h5>
                <h3 class>
                  <strong>3.270</strong>
                </h3>
                <h5>+5% Last Week</h5>
              </b-card>
            </b-col>
            <b-col xl="4" class="mb-5">
              <b-card class="years-income py-4">
                <h5 class="mb-1">This Years Income</h5>
                <h3 class>
                  <strong>Rp. 1.000.000.000.000</strong>
                </h3>
                <h5>+10% Last Year</h5>
              </b-card>
            </b-col>

            <!-- CHART -->
            <b-col xl="12" class="my-5">
              <b-row class="chart mx-0">
                <b-col xl="6" class>
                  <h4 class="m-2">Revenue</h4>
                </b-col>
                <b-col xl="6" class="text-right">
                  <b-dropdown size="sm" id="dropdown-dropleft" dropleft text="Month" class="m-2">
                    <b-dropdown-item>January</b-dropdown-item>
                    <b-dropdown-item>February</b-dropdown-item>
                    <b-dropdown-item>March</b-dropdown-item>
                    <b-dropdown-item>April</b-dropdown-item>
                    <b-dropdown-item>May</b-dropdown-item>
                    <b-dropdown-item>June</b-dropdown-item>
                    <b-dropdown-item>July</b-dropdown-item>
                    <b-dropdown-item>August</b-dropdown-item>
                    <b-dropdown-item>September</b-dropdown-item>
                    <b-dropdown-item>October</b-dropdown-item>
                    <b-dropdown-item>November</b-dropdown-item>
                    <b-dropdown-item>December</b-dropdown-item>
                  </b-dropdown>
                </b-col>
                <b-col xl="12">
                  <line-chart
                    class="p-4"
                    :data="
                      (dataChart = [
                        {
                          name: 'This Month',
                          data: {
                            '2017-01-01': 4,
                            '2017-01-02': 12,
                            '2017-01-03': 2,
                            '2017-01-04': 10
                          }
                        },
                        {
                          name: 'Last Month',
                          data: {
                            '2017-01-01': 15,
                            '2017-01-02': 3,
                            '2017-01-03': 9,
                            '2017-01-04': 7
                          }
                        }
                      ])
                    "
                  />
                </b-col>
              </b-row>
            </b-col>

            <!-- TABLE HISTORY -->
            <b-col xl="12" class="my-5">
              <b-row class="chart mx-0">
                <b-col xl="6" class="my-1">Recent Order</b-col>
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
                    id="my-table"
                    striped
                    hover
                    :items="dataRecentOrder"
                    :per-page="limit"
                    :current-page="currentPage"
                    style="text-align: center"
                  ></b-table>
                  <!-- <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    align="center"
                    aria-controls="my-table"
                  ></b-pagination>-->
                </div>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'History',
  data() {
    return {
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
  },
  methods: {
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

<template>
  <div class="about">
    <b-container fluid>
      <Header title="History" />
      <b-row style="height: 100%" class="my-5">
        <b-col xl="4" lg="4" md="4" sm="6" cols="12" class="mb-3">
          <b-card class="today-income py-4">
            <h5 class="mb-1">Today's Income</h5>
            <h3 class>
              <strong>Rp. {{ todayIncome }}</strong>
            </h3>
            <h5>+2% Yesterday</h5>
          </b-card>
        </b-col>
        <b-col xl="4" lg="4" md="4" sm="6" cols="12" class="mb-3">
          <b-card class="orders-week py-4">
            <h5 class="mb-1">Orders</h5>
            <h3 class>
              <strong>{{ qtyOrdersWeek }}</strong>
            </h3>
            <h5>+5% Last Week</h5>
          </b-card>
        </b-col>
        <b-col xl="4" lg="4" md="4" sm="12" cols="12" class="mb-3">
          <b-card class="years-income py-4">
            <h5 class="mb-1">This Years Income</h5>
            <h3 class>
              <strong>Rp. {{ yearsIncome }}</strong>
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
              <b-dropdown
                size="sm"
                id="dropdown-dropleft"
                dropleft
                :text="periodeOfChart"
                class="m-2"
              >
                <b-dropdown-item @click="chartToday">Today</b-dropdown-item>
                <b-dropdown-item @click="chartThisMonth">
                  This Month
                </b-dropdown-item>
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
                <b-dropdown-item @click="allTime"> All Time </b-dropdown-item>
                <b-dropdown-item @click="getDataTables('today')">
                  Today
                </b-dropdown-item>
                <b-dropdown-item @click="getDataTables('week')">
                  This Week
                </b-dropdown-item>
                <b-dropdown-item @click="getDataTables('month')">
                  This Month
                </b-dropdown-item>
              </b-dropdown>
            </b-col>
            <div style="width: 100%">
              <b-table
                responsive
                striped
                hover
                :items="AllHistory"
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
import Header from '@/components/Header'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'History',
  components: {
    Header
  },
  data() {
    return {
      // CHART
      periodeOfChart: 'Today',

      // TABEL HISTORY RECENT ORDER
      history: [],
      cashier: 'Cashier 1',
      // dataRecentOrder: [],
      limit: 5,
      currentPage: 1,
      period: ''
    }
  },
  created() {
    this.getAllDataHistory()
    this.getHistoryTodayIncome()
    this.getCountHistoryWeek()
    this.getHistoryYearsIncome()
  },
  computed: {
    ...mapGetters({
      todayIncome: 'getTodayIncome',
      qtyOrdersWeek: 'getQtyOrdersWeek',
      yearsIncome: 'getYearsIncome',
      dataChart: 'getDataChart',
      AllHistory: 'getAllHistory',
      periodOfTime: 'getPeriodOfTime'
    })
  },
  methods: {
    ...mapActions([
      'getHistoryTodayIncome',
      'getCountHistoryWeek',
      'getHistoryYearsIncome',
      'getHistoryChartThisMonth',
      'getAllDataHistory',
      'getDataTables'
    ]),
    ...mapMutations(['setClearDataHistory']),
    chartThisMonth() {
      this.getHistoryChartThisMonth()
      this.periodeOfChart = 'This Month'
      this.$router.push('?chart=this-month')
    },
    chartToday() {
      this.periodeOfChart = 'Today'
      this.$router.push('')
    },
    allTime() {
      this.setClearDataHistory([])
      this.getAllDataHistory()
    }
  }
}
</script>

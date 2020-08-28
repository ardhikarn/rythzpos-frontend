<template>
  <div class="about">
    <b-container fluid>
      <b-row align="center" class="header">
        <b-col xl="1" lg="1" cols="2" class="fas fa-bars align-self-center">
        </b-col>
        <b-col xl="11" class="cart py-4">
          History
        </b-col>
      </b-row>
      <b-row style="height:100%;">
        <b-col xl="1" class="navside" align="center">
          <a href="/"
            ><img src="../assets/img-nav/fork.png" alt="Menu" class="my-5"
          /></a>
          <img
            src="../assets/img-nav/clipboard.png"
            alt="History"
            class="my-5"
          />
          <img
            src="../assets/img-nav/add.png"
            alt="Add Menu"
            class="my-5"
            @click="showModal()"
          />
        </b-col>
        <b-col xl="11" class="main-history">
          <b-row class="my-5">
            <b-col xl="4">
              <b-card class="today-income py-4">
                <h5 class="mb-1">Today's Income</h5>
                <h3 class><strong>Rp. 1.000.000</strong></h3>
                <h5>+2% Yesterday</h5>
              </b-card>
            </b-col>
            <b-col xl="4">
              <b-card class="orders-week py-4">
                <h5 class="mb-1">Orders</h5>
                <h3 class><strong>3.270</strong></h3>
                <h5>+5% Last Week</h5>
              </b-card>
            </b-col>
            <b-col xl="4" class="mb-5">
              <b-card class="years-income py-4">
                <h5 class="mb-1">This Years Income</h5>
                <h3 class><strong>Rp. 1.000.000.000.000</strong></h3>
                <h5>+10% Last Year</h5>
              </b-card>
            </b-col>

            <!-- CHART -->
            <b-col xl="12" class="my-5">
              <b-row class="chart mx-0">
                <b-col xl="6" class="my-1">Revenue</b-col>
                <b-col xl="6" class="text-right my-1">Month</b-col>
                <b-col xl="12"
                  ><line-chart
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
                /></b-col>
              </b-row>
            </b-col>

            <!-- TABLE HISTORY -->
            <b-col xl="12" class="my-5">
              <b-row class="chart mx-0">
                <b-col xl="6" class="my-1">Recent Order</b-col>
                <b-col xl="6" class="text-right my-1">Today</b-col>
                <b-col xl="12">Today</b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'History',
  data() {
    return {}
  }
}
</script>

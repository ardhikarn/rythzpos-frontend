<template>
  <div>
    <b-nav class="nav-header">
      <b-container fluid class="bv-example-row font-weight-bold">
        <b-row align="center">
          <b-col xl="8" class="nav-foodItems py-4">
            <b-row>
              <b-col xl="1" cols="2" class>
                <span class="fas fa-bars"></span>
              </b-col>
              <b-col xl="10" cols="8" class="foodItems">Food Items</b-col>
              <b-col xl="1" cols="2" class="col-search">
                <b-icon icon="search" class="search py-auto"></b-icon>
              </b-col>
            </b-row>
          </b-col>
          <b-col xl="4" class="cart py-4">Cart</b-col>
        </b-row>
      </b-container>
    </b-nav>
    <div class="content">
      <b-container fluid class="bv-example-row font-weight-bold">
        <b-row align="center">
          <b-col xl="8" class>
            <b-row>
              <b-col xl="1" lg="1" md="1" class="navside px-1">
                <NavSide />
              </b-col>
              <b-col xl="11" lg="11" md="11" class="main-product">
                <b-container class="bv-example-row my-4">
                  <CardItem />
                </b-container>
              </b-col>
            </b-row>
          </b-col>
          <b-col xl="4">Cart</b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import CardItem from '../components/_base/CardItem'
import NavSide from '../components/_base/NavSide'

export default {
  name: 'Home',
  components: {
    CardItem,
    NavSide
  }
}
</script>

<style src="../assets/css/style.css">
</style>

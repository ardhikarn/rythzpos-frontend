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
        <b-row>
          <b-col xl="8">
            <b-row style="height:100%;">
              <NavSide />
              <CardItem />
            </b-row>
          </b-col>
          <b-col xl="4">
            <div>
              <div class="mt-5" v-if="isShow">
                <img src="../assets/img-product/food.png" alt="cart-empty" />
                <h4 class="mb-0">Your cart is empty</h4>
                <p>Please add some items from the menu</p>
              </div>
              <ListOrder />
              <hr />
              <div class="total-order-price">
                <b-row>
                  <b-col xl="6">
                    <h4>Total</h4>
                    *Belum termasuk ppn
                  </b-col>
                  <b-col class="text-right">
                    Rp. 105.000
                  </b-col>
                </b-row>
              </div>
              <div class="button-checkout">
                <b-button
                  class="text-white my-3 py-2"
                  style="width: 100%;"
                  variant="danger"
                  data-toggle="modal"
                  data-target="#checkout"
                >
                  Checkout
                </b-button>
                <b-button class="text-white py-2" style="width: 100%;">
                  Cancel
                </b-button>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import CardItem from '../components/_base/CardItem'
import NavSide from '../components/_base/NavSide'
import ListOrder from '../components/_base/ListOrder'

export default {
  name: 'Home',
  components: {
    CardItem,
    NavSide,
    ListOrder
  },
  data() {
    return {
      isShow: false
    }
  }
}
</script>

<style src="../assets/css/style.css"></style>

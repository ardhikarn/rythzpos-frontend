<template>
  <b-col xl="4" lg="6" md="8" sm="10" cols="12" class="mx-auto" v-if="cart.length > 0">
    <b-card class="mt-3">
      <b-row class="mb-4" v-for="(item, index) in cart" :key="index">
        <b-col cols="4" class="pr-0">
          <img v-bind:src="'http://127.0.0.1:3000/' + item.product_image" class="img-order" />
        </b-col>
        <b-col cols="8">
          <div class="d-flex flex-column justify-content-between" style="height:100%;">
            <h3>{{ item.product_name }}</h3>
            <div cols="12">
              <b-row>
                <b-col cols="6">
                  <button class="px-2 groupBtn" @click="minQty(item)">-</button>
                  <button class="px-2 groupBtn" disabled>{{ item.product_qty }}</button>
                  <button class="px-2 groupBtn" @click="incrementQty(item)">+</button>
                </b-col>
                <b-col cols="6" class="text-right">Rp. {{ item.product_price * item.product_qty }}</b-col>
              </b-row>
            </div>
          </div>
        </b-col>
      </b-row>
      <div class="total-order-price">
        <b-row>
          <b-col cols="6">
            <h5>Total</h5>*Belum termasuk ppn
          </b-col>
          <b-col cols="6" class="text-right">Rp. {{ totalPrice() }}</b-col>
        </b-row>
      </div>
      <div class="button-checkout">
        <div>
          <b-button class="text-white mt-3 py-2 my-2" @click="addDataOrder(cart)">Checkout</b-button>
        </div>
        <b-button class="text-white py-2 my-2" @click="cancelOrder()">Cancel</b-button>
      </div>
    </b-card>
  </b-col>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'CartList',
  data() {
    return {
      addOrders: []
    }
  },
  computed: {
    ...mapGetters({ cart: 'getCart', user: 'getUser' })
  },
  methods: {
    ...mapMutations([
      'removeCart',
      'incrementQty',
      'decrementQty',
      'cancelOrder'
    ]),
    ...mapActions(['postOrder']),
    minQty(data) {
      if (data.product_qty === 1) {
        this.removeCart(data)
      } else {
        this.decrementQty(data)
      }
    },
    totalPrice() {
      let total = 0
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].product_price * this.cart[i].product_qty
      }
      return total
    },
    addDataOrder(data) {
      for (let i = 0; i < data.length; i++) {
        const dataOrders = {
          product_id: data[i].product_id,
          order_qty: data[i].product_qty
        }
        this.addOrders = [...this.addOrders, dataOrders]
      }
      const setDataOrder = {
        user_id: this.user.user_id,
        orders: this.setOrder
      }
      this.postOrder(setDataOrder)
      this.$refs['modal-confirm'].show()
    }
  }
}
</script>

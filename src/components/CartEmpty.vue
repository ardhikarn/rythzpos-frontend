<template>
  <b-col
    xl="4"
    lg="6"
    md="8"
    sm="10"
    cols="12"
    class="mx-auto"
    v-if="cart.length < 1"
  >
    <div class="mt-5 text-center">
      <img src="../assets/img-product/food.png" alt="cart-empty" />
      <h4 class="mb-0"><strong>Your cart is empty</strong></h4>
      <p>Please add some items from the menu</p>
    </div>
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CartEmpty',
  computed: {
    ...mapGetters({ cart: 'getCart' })
  }
}
</script>

<style src="../assets/css/style.css"></style>

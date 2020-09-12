<template>
  <b-col xl="4" lg="3" cols="12" class="cart py-4">
    Cart
    <b-badge>{{ cart.length }}</b-badge>
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CountCart',
  computed: {
    ...mapGetters({ cart: 'getCart' })
  }
}
</script>

<style scoped src="@/assets/css/style.css"></style>

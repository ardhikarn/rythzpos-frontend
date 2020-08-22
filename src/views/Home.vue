<template>
  <b-nav class=" nav">
    <b-container fluid class="bv-example-row  font-weight-bold">
      <b-row align-v="center" align="center">
        <b-col xl="8" class="nav-foodItems py-4">
          <b-row>
            <b-col xl="2" cols="2"><span class="fas fa-bars"></span></b-col>
            <b-col xl="8" cols="8" class="foodItems">Food Items</b-col>
            <b-col xl="2" cols="2" class="col-search">
              <b-icon icon="search" class="search  py-auto"></b-icon>
            </b-col>
          </b-row>
        </b-col>
        <b-col xl="4" class="cart">Cart</b-col>
      </b-row>
    </b-container>
  </b-nav>
  <!-- <b-container class="bv-example-row">
    <CardItem />
  </b-container>-->
</template>

<script>
import axios from 'axios'
// import CardItem from '../components/_base/CardItem'

export default {
  name: 'Home',
  // components: { CardItem },
  data() {
    return {
      count: 0,
      cart: [],
      page: 1,
      limit: 9,
      sort: '',
      products: []
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    addToCart(data) {
      const setCart = {
        product_id: data.product_id,
        qty: 1
      }
      // spread operator
      this.cart = [...this.cart, setCart]
    },
    getProduct() {
      axios
        .get(
          `http://127.0.0.1:3000/product?page=${this.page}&limit=${this.limit}`
        )
        .then(response => {
          this.products = response.data.data
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>
.fa-bars,
.foodItems,
.search,
.cart {
  font-size: 25px;
}
.nav {
  box-shadow: 0px 0px 6px 1px rgba(190, 195, 202, 0.3);
}

.fa-bars,
.search {
  position: relative;
  top: 20%;
}
.nav-foodItems {
  box-shadow: 1px 0px 3px rgba(190, 195, 202, 0.3);
}
</style>

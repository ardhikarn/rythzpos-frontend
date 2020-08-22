<template>
  <b-row>
    <b-col cols="4" v-for="(item, index) in products" :key="index">
      <b-card
        v-bind:title="item.product_name"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>{{item.product_price}}</b-card-text>

        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CardItem',
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
    getProduct() {
      axios
        .get(
          `http://127.0.0.1:3000/product?page=${this.page}&limit=${this.limit}`
        )
        .then((response) => {
          this.products = response.data.data
        })
        .catch((error) => console.log(error))
    }
  }
}
</script>

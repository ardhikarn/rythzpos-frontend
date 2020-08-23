<template>
  <b-col xl="11" lg="11" md="11" class="main-product">
    <b-container class="bv-example-row my-4">
      <b-row>
        <b-col
          class="mb-5 text-left"
          cols="12"
          sm="6"
          lg="4"
          xl="4"
          v-for="(item, index) in products"
          :key="index"
        >
          <b-card
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            no-body
            tag="article"
            style="max-width: 20rem;"
            class
          ></b-card>
          <b-card-text class="mb-0">{{ item.product_name }}</b-card-text>
          <b-card-text>{{ item.product_price }}</b-card-text>
        </b-col>
      </b-row>
    </b-container>
  </b-col>
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
      limit: 6,
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
        .then(response => {
          this.products = response.data.data
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>
.card-img,
.card {
  border-bottom-right-radius: calc(0rem - 0px);
  border-bottom-left-radius: calc(0rem - 0px);
}
</style>

<!-- <template>
  <b-col xl="11" lg="11" md="10" class="main-product">
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
            @click="increment(), addToCart(item)"
            v-bind:img-src="require('../../assets/img-product/cappucino.jpg')"
            img-alt="Image"
            no-body
            tag="article"
          ></b-card>
          <div class="checklist" v-if="checklist">
            <i class="far fa-check-circle text-white"></i>
          </div>
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
      isEmpty: true,
      checklist: false,
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
    addToCart(data) {
      const addItemToCart = {
        product_id: data.product_id,
        product_name: data.product_name,
        product_price: data.product_price,
        product_image: data.product_image,
        product_qty: 1
      }
      this.cart = [...this.cart, addItemToCart]
      console.log(this.cart)
    },
    increment() {
      console.log('clicked')
      this.$emit('increment', 1)
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
.card-img,
.card {
  border-bottom-right-radius: calc(0rem - 0px);
  border-bottom-left-radius: calc(0rem - 0px);
}

.card-img {
  height: 200px;
  object-fit: cover;
}

.checklist {
  position: absolute;
  font-size: 40px;
  top: 28%;
  left: 42%;
}
</style> -->

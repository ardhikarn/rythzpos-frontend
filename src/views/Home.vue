<template>
  <div>
    <b-nav class="nav-header">
      <b-container fluid class="bv-example-row font-weight-bold">
        <b-row align="center">
          <b-col xl="8" class="nav-foodItems py-4">
            <b-row>
              <b-col xl="1" lg="1" cols="2" class>
                <span class="fas fa-bars"></span>
              </b-col>
              <b-col xl="10" lg="10" cols="8" class="foodItems"
                >Food Items</b-col
              >
              <b-col xl="1" lg="1" cols="2" class="col-search">
                <b-icon icon="search" class="search py-auto"></b-icon>
              </b-col>
            </b-row>
          </b-col>
          <b-col xl="4" class="cart py-4"
            >Cart <b-badge variant="info">{{ count }}</b-badge></b-col
          >
        </b-row>
      </b-container>
    </b-nav>
    <div class="content">
      <b-container fluid class="bv-example-row font-weight-bold">
        <b-row>
          <b-col xl="8">
            <b-row style="height:100%;">
              <b-col xl="1" lg="1" md="2" class="navside px-1">
                <div vertical align="center">
                  <div class="my-4">
                    <img src="../assets/img-nav/fork.png" alt="Menu" />
                  </div>
                  <div class="my-5">
                    <img src="../assets/img-nav/clipboard.png" alt="History" />
                  </div>
                  <div class="my-4">
                    <img
                      src="../assets/img-nav/add.png"
                      alt="Add Menu"
                      v-b-modal.add
                    />

                    <!-- modal -->
                    <b-modal hide-footer="" id="add" title="ADD ITEM">
                      <b-form>
                        <b-form-group
                          id="category-group"
                          label="Category :"
                          label-for="category"
                        >
                          <b-form-select
                            id="inline-form-custom-select-pref"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            :options="[
                              { text: 'Choose...', value: null },
                              'One',
                              'Two',
                              'Three'
                            ]"
                            :value="null"
                          ></b-form-select>
                        </b-form-group>
                        <b-form-group
                          id="name-group"
                          label="Item Name :"
                          label-for="name"
                        >
                          <b-form-input
                            id="name"
                            type="text"
                            placeholder="Enter name"
                            required
                          />
                        </b-form-group>

                        <b-form-group
                          id="image-group"
                          label="Item Image :"
                          label-for="image"
                        >
                          <b-form-input
                            id="image"
                            type="text"
                            placeholder="Enter image"
                            required
                          />
                        </b-form-group>

                        <b-form-group
                          id="price-group"
                          label="Item Price :"
                          label-for="price"
                        >
                          <b-form-input
                            id="price"
                            type="text"
                            placeholder="Enter price"
                            required
                          />
                        </b-form-group>
                        <div class="text-right">
                          <b-button class="add-btn">
                            Cancel
                          </b-button>
                          <b-button type="button" class="">
                            Add
                          </b-button>
                        </div>
                      </b-form>
                    </b-modal>
                  </div>
                </div>
              </b-col>
              <!-- <CardItem @increment="incrementCount" /> -->
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
                        v-bind:img-src="
                          require('../assets/img-product/cappucino.jpg')
                        "
                        img-alt="Image"
                        no-body
                        tag="article"
                      ></b-card>
                      <div class="checklist" v-if="checklist">
                        <i class="far fa-check-circle text-white"></i>
                      </div>
                      <b-card-text class="mb-0">{{
                        item.product_name
                      }}</b-card-text>
                      <b-card-text>{{ item.product_price }}</b-card-text>
                    </b-col>
                  </b-row>
                </b-container>
              </b-col>
            </b-row>
          </b-col>
          <b-col xl="4">
            <div class="mt-5 text-center" v-if="isEmpty">
              <img src="../assets/img-product/food.png" alt="cart-empty" />
              <h4 class="mb-0">Your cart is empty</h4>
              <p>Please add some items from the menu</p>
            </div>
            <!-- <ListOrder @clickItem="isEmpty" v-if="!isEmpty" /> -->
            <div class="mt-4" @clickItem="isEmpty" v-if="!isEmpty">
              <b-row class="mb-4" v-for="(item, index) in cart" :key="index">
                <b-col xl="4" class="pr-0">
                  <img
                    src="../assets/img-order/blackforest.jpg"
                    class="img-order"
                  />
                </b-col>
                <b-col xl="8">
                  <div
                    class="d-flex flex-column justify-content-between"
                    style="height:100%;"
                  >
                    <div>
                      <h3>{{ item.product_name }}</h3>
                    </div>
                    <div xl="12">
                      <b-row>
                        <b-col xl="6">
                          <div class="btn-add btn-group">
                            <button class="px-2">
                              <span class="span-quantity">-</span>
                            </button>
                            <button class="px-2 bg-white">
                              <span class="span-quantity">{{ qty }}</span>
                            </button>
                            <button class="px-2" @click="addQty()">
                              <span class="span-quantity">+</span>
                            </button>
                          </div>
                        </b-col>
                        <b-col xl="6" class="text-right">{{
                          item.product_price
                        }}</b-col>
                      </b-row>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <div class="total-order-price">
                <b-row>
                  <b-col xl="6">
                    <h4>Total</h4>
                    *Belum termasuk ppn
                  </b-col>
                  <b-col xl="6" class="text-right">
                    Rp. 105.000
                  </b-col>
                </b-row>
              </div>
              <div class="button-checkout">
                <!-- button checkout and modal-->
                <!-- <ModalCheckout /> -->
                <div>
                  <b-button
                    class="text-white mt-3 py-2 my-2"
                    v-b-modal.checkout
                  >
                    Checkout
                  </b-button>

                  <b-modal
                    hide-footer=""
                    class=""
                    id="checkout"
                    title="CHECKOUT"
                  >
                    <b-row class="mb-2">
                      <b-col lg="6" class="text-left">
                        Cashier : Pevita Pearce
                      </b-col>
                      <b-col lg="6" class="text-right">
                        Receipt no:#010410919
                      </b-col>
                    </b-row>
                    <div class="modal-content">
                      <div class="modal-body">
                        <b-row class="">
                          <b-col lg="6" class="text-left">
                            <p>Coffe Latte 1x</p>
                          </b-col>
                          <b-col lg="6" class="text-right">
                            <p>Rp. 30.000</p>
                          </b-col>
                          <b-col lg="6" class="text-left">
                            <p>Salmon Truffle Teriyaki 1x</p>
                          </b-col>
                          <b-col lg="6" class="text-right">
                            <p>Rp. 60.000</p>
                          </b-col>
                          <b-col lg="6" class="text-left">Ppn 10%</b-col>
                          <b-col lg="6" class="text-right"
                            >Rp. 10.500
                            <hr
                          /></b-col>
                          <b-col lg="12" class="text-right"
                            >Total : Rp. 115.500</b-col
                          >
                          <b-col lg="12" class="text-left"
                            >Payment : Cash</b-col
                          >
                        </b-row>
                        <div class="button-checkout">
                          <b-button class="text-white mt-3 py-2 my-2">
                            Checkout
                          </b-button>
                          <p class="mb-0 text-center">Or</p>
                          <b-button class="text-white py-2 my-2">
                            Send Email
                          </b-button>
                        </div>
                      </div>
                    </div>
                  </b-modal>
                </div>

                <b-button class="text-white py-2 my-2">
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
import axios from 'axios'
// import CardItem from '../components/_base/CardItem'
// import NavSide from '../components/_base/NavSide'
// import CartOrder from '../components/_base/CartOrder'

export default {
  name: 'Home',
  components: {
    // CardItem
    // NavSide,
    // CartOrder
  },
  data() {
    return {
      isEmpty: false,
      checklist: false,
      count: 0,
      cart: [],
      page: 1,
      limit: 6,
      sort: '',
      products: [],
      qty: 1
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    increment() {
      // console.log('clicked')
      this.count += 1
    },
    addQty() {
      // console.log('plusplus!')
      this.qty += 1
      this.count += 1
    },
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

<style src="../assets/css/style.css"></style>

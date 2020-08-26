<template>
  <div class="home">
    <b-container fluid>
      <b-row align="center" class="header">
        <b-col xl="8" class="col8-foodItems py-4">
          <b-row>
            <b-col xl="1" lg="1" cols="2">
              <span class="fas fa-bars"></span>
            </b-col>
            <b-col xl="10" lg="10" cols="8" class="foodItems">Food Items</b-col>
            <b-col xl="1" lg="1" cols="2" class="col-search">
              <b-icon icon="search" class="search"></b-icon>
            </b-col>
          </b-row>
        </b-col>
        <b-col xl="4" class="cart py-4">
          Cart
          <b-badge>{{countCart}}</b-badge>
        </b-col>
      </b-row>
      <b-row class="main">
        <b-col xl="8">
          <b-row style="height:100%;">
            <b-col xl="1" class="navside px-0" align="center">
              <img src="../assets/img-nav/fork.png" alt="Menu" class="my-5" />
              <img src="../assets/img-nav/clipboard.png" alt="History" class="my-5" />
              <img src="../assets/img-nav/add.png" alt="Add Menu" class="my-5" @click="showModal()" />
            </b-col>
            <b-col xl="11" class="main-product">
              <b-row>
                <!-- search, sort -->
                <b-col xl="12" class="my-5">
                  <!-- DIPAKAI LAGI -->
                  <!-- <b-form v-on:submit.prevent="searchProduct" inline>
                    <b-input placeholder="Enter keyword" v-model="keyword"></b-input>
                    <b-button variant="info" type="submit" class="ml-md-2">Search</b-button>

                    <b-dropdown id="sort" :text="sortText" class="m-2 sort-btn" variant="info">
                      <b-dropdown-item-button @click="sortCategory()" active>Category</b-dropdown-item-button>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-group id="dropdown-group-1" header="Name">
                        <b-dropdown-item-button @click="sortNameAsc()">A-Z</b-dropdown-item-button>
                        <b-dropdown-item-button @click="sortNameDesc()">Z-A</b-dropdown-item-button>
                      </b-dropdown-group>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-group id="dropdown-group-2" header="Date">
                        <b-dropdown-item-button @click="sortDateAsc()">Oldest</b-dropdown-item-button>
                        <b-dropdown-item-button @click="sortDateDesc()">Newest</b-dropdown-item-button>
                      </b-dropdown-group>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-group id="dropdown-group-3" header="Price">
                        <b-dropdown-item-button @click="sortPriceAsc()">Lowest</b-dropdown-item-button>
                        <b-dropdown-item-button @click="sortPriceDesc()">Highest</b-dropdown-item-button>
                      </b-dropdown-group>
                    </b-dropdown>
                  </b-form>-->
                </b-col>

                <!-- card product -->
                <b-col xl="12">
                  <b-row>
                    <!-- card product looping -->
                    <b-col xl="4" v-for="(item, index) in products" :key="index" class="my-3">
                      <b-card>
                        <b-card
                          v-bind:img-src="require('../assets/img-product/wiener.jpg')"
                          img-alt="Image"
                          no-body
                          class
                        >
                          <!-- CHECKLIST -->
                          <div class="checklist" v-if="checklist(item)">
                            <i class="far fa-check-circle text-white"></i>
                          </div>
                        </b-card>
                        <b-row class="m-1">
                          <b-col xl="12" class="card-product-name p-0">
                            <strong>{{ item.product_name }}</strong>
                          </b-col>
                          <b-col xl="12" class="card-product-price p-0">Rp. {{ item.product_price }}</b-col>
                        </b-row>
                        <!-- BUTTON ICON MAIN PRODUCT -->
                        <template v-slot:footer>
                          <b-row>
                            <b-col xl="3">
                              <span>
                                <i class="fas fa-plus-circle icon-product" @click="addToCart(item)"></i>
                              </span>
                            </b-col>
                            <b-col xl="3">
                              <span>
                                <i
                                  class="fas fa-minus-circle icon-product"
                                  @click="removeCart(item)"
                                ></i>
                              </span>
                            </b-col>
                            <b-col xl="3">
                              <span>
                                <i class="fas fa-edit icon-product" @click="editProduct(item)"></i>
                              </span>
                            </b-col>
                            <b-col xl="3">
                              <span>
                                <i
                                  @submit="deleteProduct"
                                  class="fas fa-trash-alt icon-product"
                                  @click="deleteProduct(item.product_id)"
                                ></i>
                              </span>
                            </b-col>
                          </b-row>
                        </template>
                      </b-card>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
        <b-col xl="4">
          <!-- EMPTY ORDER -->
          <div class="mt-5 text-center" v-if="count() < 1">
            <img src="../assets/img-product/food.png" alt="cart-empty" />
            <h4 class="mb-0">Your cart is empty</h4>
            <p>Please add some items from the menu</p>
          </div>

          <!-- ORDER LIST -->
          <b-card v-if="count() > 0" class="mt-3">
            <b-row class="mb-4" v-for="(item, index) in cart" :key="index">
              <b-col xl="4" class="pr-0">
                <img src="../assets/img-order/salmon.jpg" class="img-order" />
              </b-col>
              <b-col xl="8">
                <div class="d-flex flex-column justify-content-between" style="height:100%;">
                  <h3>{{ item.product_name }}</h3>
                  <div xl="12">
                    <b-row>
                      <b-col xl="6">
                        <button class="px-2" @click="decrementQty(item)">-</button>
                        <button class="px-2" disabled>{{ item.product_qty }}</button>
                        <button class="px-2" @click="incrementQty(item)">+</button>
                      </b-col>
                      <b-col
                        xl="6"
                        class="text-right"
                      >Rp. {{(item.product_price * item.product_qty)}}</b-col>
                    </b-row>
                  </div>
                </div>
              </b-col>
            </b-row>
            <div class="total-order-price">
              <b-row>
                <b-col xl="6">
                  <h5>Total</h5>*Belum termasuk ppn
                </b-col>
                <b-col xl="6" class="text-right">Rp. {{(countTotal())}}</b-col>
              </b-row>
            </div>
            <div class="button-checkout">
              <div>
                <b-button class="text-white mt-3 py-2 my-2" v-b-modal.checkout>Checkout</b-button>
              </div>
              <b-button class="text-white py-2 my-2">Cancel</b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <!-- MODAL CHECKOUT -->
    <b-modal hide-footer class id="checkout" title="CHECKOUT">
      <b-row class="mb-2">
        <b-col lg="6" class="text-left">Cashier : Pevita Pearce</b-col>
        <b-col lg="6" class="text-right">Receipt no:#010410919</b-col>
      </b-row>
      <div class="modal-content">
        <div class="modal-body">
          <b-row v-for="(item, index) in cart" :key="index">
            <b-col lg="6" class="text-left">
              <p>{{item.product_name}}</p>
            </b-col>
            <b-col lg="6" class="text-right">
              <p>{{item.product_price}}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6" class="text-left">Ppn 10%</b-col>
            <b-col lg="6" class="text-right">
              Rp. 10.500
              <hr />
            </b-col>
            <b-col lg="12" class="text-right">Total : Rp. 115.500</b-col>
            <b-col lg="12" class="text-left">Payment : Cash</b-col>
          </b-row>
          <div class="button-checkout">
            <b-button class="text-white mt-3 py-2 my-2">Checkout</b-button>
            <p class="mb-0 text-center">Or</p>
            <b-button class="text-white py-2 my-2">Send Email</b-button>
          </div>
        </div>
      </div>
    </b-modal>
    <!-- MODAL ADD -->
    <b-modal hide-footer ref="modal-product" title="DATA ITEM PRODUCT">
      <b-form @submit="addProduct">
        <b-row class="mb-3">
          <b-col xl="4" class="align-self-center">Category Id :</b-col>
          <b-col xl="8">
            <b-form-select
              required
              v-model="form.category_id"
              id="inline-form-custom-select-pref"
              :options="[
                              { text: 'Choose...', value: null },
                              1,
                              2,
                              3,
                              4
                            ]"
              :value="null"
            ></b-form-select>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col xl="4" class="align-self-center">Product Name :</b-col>
          <b-col xl="8">
            <b-form-input
              required
              v-model="form.product_name"
              id="input-default"
              placeholder="Enter product name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col xl="4" class="align-self-center">Product Image :</b-col>
          <b-col xl="8">
            <b-form-input
              required
              v-model="form.product_image"
              id="input-default"
              placeholder="Enter product image"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col xl="4" class="align-self-center">Product Price :</b-col>
          <b-col xl="8">
            <b-form-input
              required
              v-model="form.product_price"
              id="input-default"
              placeholder="Enter product price"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col xl="4" class="align-self-center">Product Status :</b-col>
          <b-col xl="8">
            <b-form-select
              required
              v-model="form.product_status"
              id="inline-form-custom-select-pref"
              :options="[
                              { text: 'Choose...', value: null },
                              0,
                              1
                            ]"
              :value="null"
            ></b-form-select>
          </b-col>
        </b-row>
        <div>
          <b-button type="submit" class="text-white mt-3 py-2 my-2" v-show="!isUpdate">Add</b-button>
          <b-button
            type="button"
            class="text-white mt-3 py-2 my-2"
            v-show="isUpdate"
            @click="patchProduct()"
          >Update</b-button>
          <b-button class="text-white py-2 my-2">Cancel</b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
// import CardItem from '../components/_base/CardItem'
// import NavSide from '../components/_base/NavSide'
// import CartOrder from '../components/_base/CartOrder'

export default {
  name: 'Home',
  // components: {
  //   // CardItem
  //   // NavSide,
  //   // CartOrder
  // },
  data() {
    return {
      // getProduct
      products: [],
      page: '',
      limit: 30,
      sort: '',
      search: '',

      cart: [],
      form: {
        category_id: '',
        product_name: '',
        product_image: '',
        product_price: '',
        product_status: ''
      },
      countCart: 0,
      isUpdate: false
      //     currentPage: 1,
      //     rows: 50,
      //     formUpdate: {
      //       category_id: '',
      //       product_name: '',
      //       product_image: '',
      //       product_price: '',
      //       product_status: ''
      //     },
      //     product_id: ''
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    // getProduct untuk menampilkan card
    getProduct() {
      axios
        .get(
          `http://127.0.0.1:3000/product?page=${this.page}&limit=${this.limit}&sort=${this.sort}`
        )
        .then((response) => {
          this.products = response.data.data
        })
        .catch((error) => error)
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
      this.countCart += 1
      console.log(this.cart)
    },
    removeCart(data) {
      this.countCart -= 1
      return this.cart.splice(
        this.cart.findIndex((item) => item.product_id === data.product_id),
        1
      )
    },
    checklist(data) {
      return this.cart.some((item) => item.product_id === data.product_id)
    },
    count() {
      return this.cart.length
    },
    incrementQty(data) {
      data.product_qty += 1
      this.countCart += 1
    },
    decrementQty(data) {
      if (data.product_qty === 1) {
        this.removeCart(data)
      } else {
        data.product_qty -= 1
        this.countCart -= 1
      }
    },
    countTotal() {
      let total = 0
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].product_price * this.cart[i].qty
      }
      return total
    },
    showModal() {
      this.isUpdate = false
      this.$refs['modal-product'].show()
      this.form = {
        category_id: '',
        product_name: '',
        product_image: '',
        product_price: '',
        product_status: ''
      }
    },
    // untuk menambah product
    addProduct() {
      console.log(this.form)
      axios
        .post('http://127.0.0.1:3000/product', this.form)

        .then((response) => {
          this.getProduct()
        })
        .catch((error) => error)
    },
    editProduct(data) {
      this.$refs['modal-product'].show()
      this.form = {
        category_id: data.category_id,
        product_name: data.product_name,
        product_image: data.product_image,
        product_price: data.product_price,
        product_status: data.product_status
      }
      this.product_id = data.product_id
      this.isUpdate = true
    },
    patchProduct() {
      console.log(this.form)
      axios
        .patch(`http://127.0.0.1:3000/product/${this.product_id}`, this.form)
        .then((response) => {
          this.getProduct()
          this.$refs['modal-product'].hide()
        })
        .catch((error) => error)
    },
    deleteProduct(productId) {
      console.log(productId)
      axios
        .delete(`http://127.0.0.1:3000/product/${productId}`)
        .then((response) => {
          this.getProduct()
        })
        .catch((error) => error)
    }
  }
}
</script>

<style src="../assets/css/style.css"></style>

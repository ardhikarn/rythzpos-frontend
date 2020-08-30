<template>
  <div class="home">
    <b-container fluid>
      <b-row align="center" class="header">
        <NavSide />
        <b-col xl="6" lg="7" cols="8" class="foodItems align-self-center py-4">Food Items</b-col>
        <b-col xl="1" lg="1" cols="2" class="fas fa-search search align-self-center py-4"></b-col>
        <b-col xl="4" lg="3" cols="12" class="cart py-4">
          Cart
          <b-badge>{{ count() }}</b-badge>
        </b-col>
      </b-row>
      <b-row class="main">
        <b-col xl="8" class="main-product" style="height:100%;">
          <b-row>
            <!-- SEARCH AND SORT -->
            <b-col xl="12" class="my-5">
              <!-- SEARCH -->
              <b-row>
                <b-col cols="9">
                  <b-form @submit.prevent="searchProduct" inline>
                    <b-input placeholder="Search Product" v-model="search"></b-input>
                    <b-button type="submit" class="ml-2">Search</b-button>
                  </b-form>
                </b-col>
                <!-- SORT -->
                <b-col cols="3" class="text-right">
                  <b-dropdown :text="sortText">
                    <b-dropdown-group header="Name">
                      <b-dropdown-item-button @click="sortAscByName()">A-Z</b-dropdown-item-button>
                      <b-dropdown-item-button @click="sortDescByName()">Z-A</b-dropdown-item-button>
                    </b-dropdown-group>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-group header="Price">
                      <b-dropdown-item-button @click="sortAscByPrice()">Highest</b-dropdown-item-button>
                      <b-dropdown-item-button @click="sortDescByPrice()">Lowest</b-dropdown-item-button>
                    </b-dropdown-group>
                  </b-dropdown>
                </b-col>
              </b-row>
            </b-col>

            <!-- card product -->
            <b-col xl="12">
              <b-row>
                <!-- card product looping -->
                <b-col
                  xl="4"
                  lg="4"
                  md="6"
                  v-for="(item, index) in products"
                  :key="index"
                  class="my-3"
                >
                  <b-card>
                    <b-card
                      v-bind:img-src="
                        require('../assets/img-product/wiener.jpg')
                      "
                      img-alt="Image"
                      no-body
                      class
                    >
                      <!-- CHECKLIST -->
                      <div class="checklist" v-if="checklistPlusMinus(item)">
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
                        <b-col cols="4" align="center">
                          <span v-if="!checklistPlusMinus(item)">
                            <i class="fas fa-plus-circle icon-product" @click="addToCart(item)"></i>
                          </span>
                          <span v-else>
                            <i class="fas fa-minus-circle icon-product" @click="removeCart(item)"></i>
                          </span>
                        </b-col>
                        <b-col cols="4" align="center">
                          <span>
                            <i class="fas fa-edit icon-product" @click="editProduct(item)"></i>
                          </span>
                        </b-col>
                        <b-col cols="4" align="center">
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

            <!-- PAGINATION -->
            <b-col cols="12" class="mt-5">
              <b-pagination
                align="center"
                v-model="page"
                :total-rows="totalData"
                :per-page="limit"
                @change="pageChange"
                v-show="showPagination"
              ></b-pagination>
            </b-col>
          </b-row>
        </b-col>
        <b-col xl="4" lg="6" md="8" sm="10" cols="12" class="mx-auto">
          <!-- EMPTY ORDER -->
          <div class="mt-5 text-center" v-if="count() < 1">
            <img src="../assets/img-product/food.png" alt="cart-empty" />
            <h4 class="mb-0">Your cart is empty</h4>
            <p>Please add some items from the menu</p>
          </div>

          <!-- ORDER LIST -->
          <b-card v-else class="mt-3">
            <b-row class="mb-4" v-for="(item, index) in cart" :key="index">
              <b-col cols="4" class="pr-0">
                <img src="../assets/img-order/salmon.jpg" class="img-order" />
              </b-col>
              <b-col cols="8">
                <div class="d-flex flex-column justify-content-between" style="height:100%;">
                  <h3>{{ item.product_name }}</h3>
                  <div cols="12">
                    <b-row>
                      <b-col cols="6">
                        <button class="px-2" @click="decrementQty(item)">-</button>
                        <button class="px-2" disabled>{{ item.product_qty }}</button>
                        <button class="px-2" @click="incrementQty(item)">+</button>
                      </b-col>
                      <b-col
                        cols="6"
                        class="text-right"
                      >Rp. {{ item.product_price * item.product_qty }}</b-col>
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
      </b-row>
    </b-container>

    <!-- MODAL CHECKOUT -->
    <b-modal hide-footer ref="modal-checkout" title="CHECKOUT BERHASIL">
      <b-row class="mb-2">
        <b-col lg="6" class="text-left">Cashier : Pevita Pearce</b-col>
        <b-col lg="6" class="text-right">Receipt no: #{{invoice}}</b-col>
      </b-row>
      <div class="modal-content">
        <div class="modal-body">
          <b-row v-for="(item, index) in cart" :key="index">
            <b-col lg="6" class="text-left">
              <p>{{ item.product_name }} {{item.product_qty}}x (@{{item.product_price}})</p>
            </b-col>
            <b-col lg="6" class="text-right">
              <p>Rp. {{ item.product_price * item.product_qty}}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6" class="text-left">Ppn 10%</b-col>
            <b-col lg="6" class="text-right">
              Rp. {{totalPrice() * 0.1}}
              <hr />
            </b-col>
            <b-col lg="12" class="text-right">Total : Rp. {{totalPrice() + (totalPrice() * 0.1)}}</b-col>
            <b-col lg="12" class="text-left">Payment : Cash</b-col>
          </b-row>
          <div class="button-checkout">
            <b-button @click="closeModalCheckout()" class="text-white mt-3 py-2 my-2">Print Checkout</b-button>
            <p class="mb-0 text-center">Or</p>
            <b-button class="text-white py-2 my-2">Send Email</b-button>
          </div>
        </div>
      </div>
    </b-modal>

    <!-- MODAL CONFIRM -->
    <b-modal hide-footer ref="modal-confirm" title="Are You Sure ?">
      <div class="text-right">
        <b-button @click="closeModalConfirm()">Cancel</b-button>
        <b-button @click="postOrder()" class="ml-2" variant="success">OK</b-button>
      </div>
    </b-modal>

    <!-- MODAL ADD -->
    <b-modal hide-footer ref="modal-product" :title="modalHeader">
      <b-form @submit.prevent="addProduct">
        <b-row class="mb-3">
          <b-col cols="4" class="align-self-center">Category Id :</b-col>
          <b-col cols="8">
            <b-form-select
              required
              v-model="form.category_id"
              id="inline-form-custom-select-pref"
              :options="[{ text: 'Choose...', value: null }, 1, 2, 3, 4]"
              :value="null"
            ></b-form-select>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4" class="align-self-center">Product Name :</b-col>
          <b-col cols="8">
            <b-form-input
              required
              v-model="form.product_name"
              id="input-default"
              placeholder="Enter product name"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4" class="align-self-center">Product Image :</b-col>
          <b-col cols="8">
            <b-form-input
              required
              v-model="form.product_image"
              id="input-default"
              placeholder="Enter product image"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4" class="align-self-center">Product Price :</b-col>
          <b-col cols="8">
            <b-form-input
              required
              v-model="form.product_price"
              id="input-default"
              placeholder="Enter product price"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="4" class="align-self-center">Product Status :</b-col>
          <b-col cols="8">
            <b-form-select
              required
              v-model="form.product_status"
              id="inline-form-custom-select-pref"
              :options="[{ text: 'Choose...', value: null }, 0, 1]"
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
import NavSide from '../components/_base/NavSide'
// import CartOrder from '../components/_base/CartOrder'

export default {
  name: 'Home',
  components: {
    // CardItem
    NavSide
    // CartOrder
  },
  data() {
    return {
      // getProduct
      products: [],
      page: 1,
      limit: 6,
      search: '',
      sort: '',
      ascDesc: '',

      // pagination and sort
      sortText: 'Sort',
      totalData: 0,
      showPagination: true,

      cart: [],
      form: {
        category_id: '',
        product_name: '',
        product_image: '',
        product_price: '',
        product_status: ''
      },
      isUpdate: false,
      modalHeader: '',
      addOrders: [],
      invoice: ''
      //     currentPage: 1,
      //     rows: 50,
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
          `http://127.0.0.1:3000/product?page=${this.page}&limit=${this.limit}&search=${this.search}&sort=${this.sort}&ascDesc=${this.ascDesc}`
        )
        .then((response) => {
          this.products = response.data.data
          this.totalData = response.data.pagination.totalData
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
    },
    removeCart(data) {
      return this.cart.splice(
        this.cart.findIndex((item) => item.product_id === data.product_id),
        1
      )
    },
    checklistPlusMinus(data) {
      return this.cart.some((item) => item.product_id === data.product_id)
    },
    count() {
      return this.cart.length
    },
    incrementQty(data) {
      data.product_qty += 1
    },
    decrementQty(data) {
      if (data.product_qty === 1) {
        this.removeCart(data)
      } else {
        data.product_qty -= 1
      }
    },
    totalPrice() {
      let total = 0
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].product_price * this.cart[i].product_qty
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
      this.modalHeader = 'ADD ITEM PRODUCT'
    },
    closeModalCheckout() {
      this.$refs['modal-checkout'].hide()
      this.$refs['modal-confirm'].hide()
      this.cart = []
    },
    closeModalConfirm() {
      this.$refs['modal-confirm'].hide()
    },

    // untuk menambah product
    addProduct() {
      axios
        .post('http://127.0.0.1:3000/product', this.form)

        .then((response) => {
          this.getProduct()
          this.$refs['modal-product'].hide()
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
      this.modalHeader = 'EDIT ITEM PRODUCT'
      this.isUpdate = true
    },
    patchProduct() {
      axios
        .patch(`http://127.0.0.1:3000/product/${this.product_id}`, this.form)
        .then((response) => {
          this.getProduct()
          this.$refs['modal-product'].hide()
        })
        .catch((error) => error)
    },
    deleteProduct(productId) {
      axios
        .delete(`http://127.0.0.1:3000/product/${productId}`)
        .then((response) => {
          this.getProduct()
        })
        .catch((error) => error)
    },
    // === SEARCHING ===
    searchProduct() {
      if (this.search === '') {
        this.getProduct()
        this.$router.push('/home')
      } else {
        this.limit = 12
        this.getProduct()
        this.sortText = 'Sort'
        this.showPagination = false
        this.$router.push(`?q=${this.search}`)
      }
    },

    // === SORTING ===
    sortAscByName() {
      this.sortText = 'A - Z'
      this.sort = 'product_name'
      this.ascDesc = 'ASC'
      this.page = 1
      this.getProduct()
      this.showPagination = true
      this.$router.push(`?sortAsc=${this.sort}`)
    },
    sortDescByName() {
      this.sortText = 'A - Z'
      this.sort = 'product_name'
      this.ascDesc = 'DESC'
      this.page = 1
      this.getProduct()
      this.showPagination = true
      this.$router.push(`?sortDesc=${this.sort}`)
    },
    sortAscByPrice() {
      this.sortText = 'Highest Price'
      this.sort = 'product_price'
      this.ascDesc = 'DESC'
      this.page = 1
      this.showPagination = true
      this.getProduct()
      this.$router.push(`?Highest=${this.sort}`)
    },
    sortDescByPrice() {
      this.sortText = 'Lowest Price'
      this.sort = 'product_price'
      this.ascDesc = 'ASC'
      this.getProduct()
      this.page = 1
      this.showPagination = true
    },

    // PAGINATION
    pageChange(numbPage) {
      this.$router.push(`?page=${numbPage}`)
      this.page = numbPage
      this.getProduct()
      this.scrollToTop()
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    },

    // CHECKOUT ORDER
    addDataOrder(data) {
      for (let i = 0; i < data.length; i++) {
        const dataOrders = {
          product_id: data[i].product_id,
          order_qty: data[i].product_qty
        }
        this.addOrders = [...this.addOrders, dataOrders]
      }
      this.$refs['modal-confirm'].show()
    },
    postOrder() {
      axios
        .post('http://127.0.0.1:3000/order', this.addOrders)
        .then((response) => {
          console.log(response)
          this.invoice = response.data.data.invoice
          this.$refs['modal-checkout'].show()
        })
        .catch(() => {
          console.log('error')
        })
    },
    cancelOrder() {
      this.cart = []
    }
  }
}
</script>

<style src="../assets/css/style.css"></style>

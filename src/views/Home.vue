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
              <b-col xl="10" lg="10" cols="8" class="foodItems">Food Items</b-col>
              <b-col xl="1" lg="1" cols="2" class="col-search">
                <b-icon icon="search" class="search" v-b-modal.search></b-icon>
              </b-col>
            </b-row>
          </b-col>
          <b-col xl="4" class="cart py-4">
            Cart
            <b-badge variant="info">{{ count }}</b-badge>
          </b-col>
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
                    <img src="../assets/img-nav/add.png" alt="Add Menu" v-b-modal.add />

                    <!-- modal add-->
                    <b-modal hide-footer id="add" title="ADD ITEM">
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
                        <div class="button-add">
                          <b-button
                            type="submit"
                            class="text-white mt-3 py-2 my-2"
                            @click="makeToast('success')"
                          >Add</b-button>
                          <b-button class="text-white py-2 my-2">Cancel</b-button>
                        </div>
                        <!-- <div class="text-right">
                          <b-button class="add-btn my-1">Add</b-button>
                          <b-button class="cancel-btn my-1">Cancel</b-button>
                        </div>-->
                      </b-form>
                    </b-modal>
                  </div>
                </div>
              </b-col>
              <!-- <CardItem @increment="incrementCount" /> -->
              <b-col xl="11" lg="11" md="10" class="main-product">
                <!-- <b-form inline @submit.prevent="search">
                  <b-form-input size="md" class placeholder="Search"></b-form-input>
                  <b-button size="md" class type="submit">Search</b-button>
                </b-form>-->
                <div hide-footer id="edit" title="EDIT ITEM">
                  <b-form @submit="patchProduct">
                    <b-row class="mb-3">
                      <b-col xl="4" class="align-self-center">Category Id :</b-col>
                      <b-col xl="8">
                        <b-form-select
                          required
                          v-model="formUpdate.category_id"
                          id="inline-form-custom-select-pref"
                          :options="[
                            { text: 'Choose...', value: null },
                            1,2,3,4]"
                          :value="null"
                        ></b-form-select>
                      </b-col>
                    </b-row>

                    <b-row class="mb-3">
                      <b-col xl="4" class="align-self-center">Product Name :</b-col>
                      <b-col xl="8">
                        <b-form-input
                          required
                          v-model="formUpdate.product_name"
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
                          v-model="formUpdate.product_image"
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
                          v-model="formUpdate.product_price"
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
                          v-model="formUpdate.product_status"
                          id="inline-form-custom-select-pref"
                          :options="[{ text: 'Choose...', value: null },0,1]"
                          :value="null"
                        ></b-form-select>
                      </b-col>
                    </b-row>
                    <div class="button-update">
                      <b-button
                        type="submit"
                        class="text-white mt-3 py-2 my-2"
                        @click="makeToast('success')"
                      >Update</b-button>
                      <b-button class="text-white py-2 my-2">Cancel</b-button>
                    </div>
                  </b-form>
                </div>
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
                        v-if="item.product_id === item.product_id"
                        v-bind:img-src="
                          require('../assets/img-product/cappucino.jpg')
                        "
                        img-alt="Image"
                        no-body
                        tag="article"
                      >
                        <div class="checklist" v-if="checklist(item)">
                          <i class="far fa-check-circle text-white"></i>
                        </div>
                      </b-card>
                      <b-row class="my-1">
                        <b-col xl="7" class="align-self-center">
                          <b-card-text>
                            {{
                            item.product_name
                            }}
                          </b-card-text>
                        </b-col>
                        <b-col xl="5" class="text-right">
                          <b-button
                            v-b-modal="'edit'"
                            size="sm"
                            pill
                            variant="warning"
                            class="text-white"
                            @click="editProduct(item)"
                          >Edit</b-button>

                          <!-- modal update -->
                          <!-- <b-modal hide-footer id="edit" title="EDIT ITEM">
                            <b-form>
                              <b-row class="mb-3">
                                <b-col xl="4" class="align-self-center">Category Id :</b-col>
                                <b-col xl="8">
                                  <b-form-select
                                    required
                                    v-model="formUpdate.category_id"
                                    id="inline-form-custom-select-pref"
                                    :options="[
                                    { text: 'Choose...', value: null },
                                    1,2,3,4]"
                                    :value="null"
                                  ></b-form-select>
                                </b-col>
                              </b-row>

                              <b-row class="mb-3">
                                <b-col xl="4" class="align-self-center">Product Name :</b-col>
                                <b-col xl="8">
                                  <b-form-input
                                    required
                                    v-model="formUpdate.product_name"
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
                                    v-model="formUpdate.product_image"
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
                                    v-model="formUpdate.product_price"
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
                                    v-model="formUpdate.product_status"
                                    id="inline-form-custom-select-pref"
                                    :options="[{ text: 'Choose...', value: null },0,1]"
                                    :value="null"
                                  ></b-form-select>
                                </b-col>
                              </b-row>
                              <div class="button-update">
                                <b-button
                                  type="submit"
                                  class="text-white mt-3 py-2 my-2"
                                  @click="makeToast('success')"
                                >Update</b-button>
                                <b-button class="text-white py-2 my-2">Cancel</b-button>
                              </div>
                            </b-form>
                          </b-modal>-->
                        </b-col>
                      </b-row>
                      <b-row class="my-1">
                        <b-col xl="7" class="align-self-center">
                          <b-card-text>{{ item.product_price }}</b-card-text>
                        </b-col>
                        <b-col xl="5" class="text-right">
                          <b-button
                            size="sm"
                            pill
                            variant="danger"
                            @click="deleteProduct(item.product_id)"
                          >Delete</b-button>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </b-container>
                <div class="mt-3">
                  <b-pagination v-model="currentPage" :total-rows="rows" align="center"></b-pagination>
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col xl="4">
            <div class="mt-5 text-center" v-if="cart.length === 0">
              <img src="../assets/img-product/food.png" alt="cart-empty" />
              <h4 class="mb-0">Your cart is empty</h4>
              <p>Please add some items from the menu</p>
            </div>
            <!-- <ListOrder @clickItem="isEmpty" v-if="!isEmpty" /> -->
            <div class="mt-4" @clickItem="isEmpty" v-if="cart.length >= 1">
              <b-row class="mb-4" v-for="(item, index) in cart" :key="index">
                <b-col xl="4" class="pr-0">
                  <img src="../assets/img-order/blackforest.jpg" class="img-order" />
                </b-col>
                <b-col xl="8">
                  <div class="d-flex flex-column justify-content-between" style="height:100%;">
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
                              <span class="span-quantity">{{ item.product_qty }}</span>
                            </button>
                            <button class="px-2" @click="addQty(item)">
                              <span class="span-quantity">+</span>
                            </button>
                          </div>
                        </b-col>
                        <b-col xl="6" class="text-right">{{ item.product_price }}</b-col>
                      </b-row>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <div class="total-order-price">
                <b-row>
                  <b-col xl="6">
                    <h4>Total</h4>*Belum termasuk ppn
                  </b-col>
                  <b-col xl="6" class="text-right">Rp. 105.000</b-col>
                </b-row>
              </div>
              <div class="button-checkout">
                <!-- button checkout and modal-->
                <!-- <ModalCheckout /> -->
                <div>
                  <b-button class="text-white mt-3 py-2 my-2" v-b-modal.checkout>Checkout</b-button>

                  <b-modal hide-footer class id="checkout" title="CHECKOUT">
                    <b-row class="mb-2">
                      <b-col lg="6" class="text-left">Cashier : Pevita Pearce</b-col>
                      <b-col lg="6" class="text-right">Receipt no:#010410919</b-col>
                    </b-row>
                    <div class="modal-content">
                      <div class="modal-body">
                        <b-row class>
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
                </div>

                <b-button class="text-white py-2 my-2">Cancel</b-button>
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
      count: 0,
      cart: [],
      page: 1,
      limit: 3,
      sort: '',
      products: [],
      currentPage: 1,
      rows: 50,
      form: {
        category_id: '',
        product_name: '',
        product_image: '',
        product_price: '',
        product_status: ''
      },
      formUpdate: {
        category_id: '',
        product_name: '',
        product_image: '',
        product_price: '',
        product_status: ''
      },
      product_id: ''
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    checklist(data) {
      return this.cart.some((value) => value.product_id === data.product_id)
    },
    modals(data) {
      console.log(data)
      return this.cart.map((value) => value.product_name === data.product_name)
    },
    increment() {
      // console.log('clicked')
      this.count += 1
    },
    addQty(data) {
      console.log(data)
      data.product_qty += 1
      this.count += 1
      // data.product_price += item.product_price
      // return this.cart.some((value) => value.product_qty + value.product_price)
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
        .then((response) => {
          this.products = response.data.data
        })
        .catch((error) => error)
    },
    addProduct() {
      console.log(this.form)
      axios
        .post('http://127.0.0.1:3000/product', this.form)
        .then((response) => {})
        .catch((error) => error)
    },
    makeToast(variant = null) {
      this.$bvToast.toast('Toast body content', {
        title: `Variant ${variant || 'default'}`,
        variant: variant,
        solid: true
      })
    },
    editProduct(data) {
      // console.log(data)
      this.formUpdate = {
        category_id: data.category_id,
        product_name: data.product_name,
        product_image: data.product_image,
        product_price: data.product_price,
        product_status: data.product_status
      }
      this.product_id = data.product_id
    },
    patchProduct() {
      console.log(this.formUpdate)
      axios
        .patch(
          `http://127.0.0.1:3000/product/${this.product_id}`,
          this.formUpdate
        )
        .then((response) => {})
        .catch((error) => error)
    },
    deleteProduct(productId) {
      console.log(productId)
    }
  }
}
</script>

<style src="../assets/css/style.css"></style>

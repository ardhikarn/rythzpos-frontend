<template>
  <div class="home">
    <b-container fluid>
      <b-row align="center" class="header">
        <b-col cols="2" class="align-self-center py-4">
          <div v-b-toggle.my-sidebar>
            <b-avatar variant="secondary"> </b-avatar>
            {{ user.user_name }}
          </div>
        </b-col>
        <b-col cols="6" class="foodItems align-self-center py-4"
          >Caffeshop</b-col
        >
        <CountCart />
      </b-row>
      <b-row class="main">
        <b-col xl="8" class="main-product" style="height:100%;">
          <b-row>
            <!-- SEARCH AND SORT -->
            <b-col xl="12" class="my-3">
              <!-- SEARCH -->
              <b-row>
                <b-col cols="9">
                  <b-form @submit.prevent="searchProduct" inline>
                    <b-input
                      placeholder="Search Product"
                      v-model="search"
                    ></b-input>
                    <b-button type="submit" class="ml-2">Search</b-button>
                  </b-form>
                </b-col>
                <!-- SORT -->
                <b-col cols="3" class="text-right">
                  <b-dropdown :text="sortText" v-show="!isSearch">
                    <b-dropdown-group header="Name">
                      <b-dropdown-item-button
                        @click="sortBy('product_name ASC')"
                        >A-Z</b-dropdown-item-button
                      >
                      <b-dropdown-item-button
                        @click="sortBy('product_name DESC')"
                        >Z-A</b-dropdown-item-button
                      >
                    </b-dropdown-group>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-group header="Price">
                      <b-dropdown-item-button
                        @click="sortBy('product_price DESC')"
                        >Highest</b-dropdown-item-button
                      >
                      <b-dropdown-item-button
                        @click="sortBy('product_price ASC')"
                        >Lowest</b-dropdown-item-button
                      >
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
                      :img-src="'http://127.0.0.1:3000/' + item.product_image"
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
                      <b-col xl="12" class="card-product-price p-0"
                        >Rp. {{ item.product_price }}</b-col
                      >
                    </b-row>
                    <!-- BUTTON ICON MAIN PRODUCT -->
                    <template v-slot:footer>
                      <b-row>
                        <b-col cols="6" align="center">
                          <span v-if="!checklistPlusMinus(item)">
                            <p
                              class="icon-product btn-sm btn-primary"
                              @click="addToCart(item)"
                            >
                              Add
                            </p>
                          </span>
                          <span v-else>
                            <p
                              class="icon-product btn-sm btn-danger"
                              @click="removeCart(item)"
                            >
                              Remove
                            </p>
                          </span>
                        </b-col>
                        <b-col cols="3" align="center">
                          <span>
                            <i
                              class="fas fa-edit icon-product"
                              v-if="user.user_role === 1"
                              @click="editProduct(item)"
                            ></i>
                          </span>
                        </b-col>
                        <b-col cols="3" align="center">
                          <span>
                            <i
                              class="fas fa-trash-alt icon-product"
                              @click.prevent="deleteProduct(item)"
                              v-if="user.user_role === 1"
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
                v-model="currentPage"
                :total-rows="totalData"
                :per-page="perLimit"
                @change="pageChange"
                v-show="!isSearch"
              ></b-pagination>
            </b-col>
          </b-row>
        </b-col>
        <!-- EMPTY ORDER -->
        <CartEmpty />
        <!-- ORDER LIST -->
        <CartList />
      </b-row>
    </b-container>

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
            <input type="file" @change="handleFile" />
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
          <b-button
            type="submit"
            class="text-white mt-3 py-2 my-2"
            v-show="!isUpdate"
            >Add</b-button
          >
          <b-button
            type="button"
            class="text-white mt-3 py-2 my-2"
            v-show="isUpdate"
            @click.prevent="patchProduct()"
            >Update</b-button
          >
          <b-button class="text-white py-2 my-2">Cancel</b-button>
        </div>
      </b-form>
    </b-modal>

    <!-- SIDEBAR MENU -->
    <b-sidebar id="my-sidebar" title="Profile User" shadow style="width: 400px">
      <b-container fluid>
        <b-row class="text-center px-0 py-2 ">
          <b-col cols="12">
            <b-avatar variant="secondary"> </b-avatar>
            {{ user.user_name }}
          </b-col>
          <b-col cols="12" class="mt-5">
            <router-link to="/home" class="text-white">
              <b-button variant="secondary" class="mb-2" style="width: 125px">
                <b-icon icon="shop" aria-hidden="true"></b-icon>
                Home
              </b-button>
            </router-link>
          </b-col>
          <b-col cols="12" class="my-2">
            <router-link to="/history" class="text-white">
              <b-button variant="secondary" class="mb-2" style="width: 125px">
                <b-icon icon="clipboard-data" aria-hidden="true"></b-icon>
                History
              </b-button>
            </router-link>
          </b-col>
          <b-col cols="12" class="mb-5">
            <b-dropdown variant="secondary">
              <template v-slot:button-content>
                <b-icon icon="gear-fill"></b-icon> Settings
              </template>
              <b-dropdown-group header="Choose options" class="small">
                <b-dropdown-divider></b-dropdown-divider>
                <router-link to="/setproduct">
                  <b-dropdown-item-button>
                    <strong>Products</strong>
                  </b-dropdown-item-button>
                </router-link>
                <b-dropdown-divider></b-dropdown-divider>
                <router-link to="/setcategory">
                  <b-dropdown-item-button>
                    <strong>Categories</strong>
                  </b-dropdown-item-button>
                </router-link>
                <b-dropdown-divider></b-dropdown-divider>
                <router-link to="/setuser">
                  <b-dropdown-item-button>
                    <strong>Users</strong>
                  </b-dropdown-item-button>
                </router-link>
              </b-dropdown-group>
            </b-dropdown>
          </b-col>
          <b-col cols="12" class="my-5">
            <b-button variant="danger" class="mb-2 text-center" @click="logout">
              <b-icon icon="power" aria-hidden="true"></b-icon>
              Logout
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-sidebar>
  </div>
</template>

<script>
import CountCart from '../components/CountCart'
import CartEmpty from '../components/CartEmpty'
import CartList from '../components/CartList'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Home',
  components: {
    CountCart,
    CartEmpty,
    CartList
  },
  data() {
    return {
      search: '',
      isSearch: false,
      sortText: 'Sort',
      showPagination: true,
      form: {
        category_id: '',
        product_name: '',
        product_image: {},
        product_price: '',
        product_status: ''
      },
      isUpdate: false,
      modalHeader: '',
      currentPage: 1,
      URL: process.env.VUE_APP_URL
    }
  },
  computed: {
    ...mapGetters({
      page: 'getPage2',
      perLimit: 'getLimit',
      sort: 'getSort',
      products: 'getProduct2',
      totalData: 'getTotalData',
      productId: 'getProudctId',
      user: 'getUser',
      invoice: 'getInvoice',
      cart: 'getCart'
    })
  },
  created() {
    this.getProducts()
  },
  methods: {
    ...mapActions([
      'getProducts',
      'postProducts',
      'patchProducts',
      'deleteProducts',
      'searchProducts'
    ]),
    ...mapActions({ handleLogout: 'logout' }),
    handleFile(event) {
      this.form.product_image = event.target.files[0]
    },
    ...mapMutations([
      'setPage',
      'addToCart',
      'removeCart',
      'sortProduct',
      'setLimit'
    ]),
    addProduct() {
      const data = new FormData()
      data.append('category_id', this.form.category_id)
      data.append('product_name', this.form.product_name)
      data.append('product_image', this.form.product_image)
      data.append('product_price', this.form.product_price)
      data.append('product_status', this.form.product_status)
      this.postProducts(data)
        .then(response => {
          this.$refs['modal-product'].hide()
          this.getProducts()
        })
        .catch(error => console.log(error))
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
      // this.getProduct()
    },
    patchProduct() {
      const data = new FormData()
      data.append('category_id', this.form.category_id)
      data.append('product_name', this.form.product_name)
      data.append('product_image', this.form.product_image)
      data.append('product_price', this.form.product_price)
      data.append('product_status', this.form.product_status)
      const setData = {
        product_id: this.product_id,
        form: data
      }
      this.patchProducts(setData)
        .then(response => {
          this.$refs['modal-product'].hide()
          this.getProducts()
          this.isUpdate = false
        })
        .catch(error => console.log(error))
    },
    deleteProduct(data) {
      this.product_id = data.product_id
      this.getProducts()
      this.deleteProducts(this.product_id)
    },
    logout() {
      this.$bvModal
        .msgBoxConfirm('logout account?', {
          cancelVariant: 'danger',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
        .then(value => {
          this.isLogout = value
          this.isLogout ? this.handleLogout() : console.log(value)
        })
    },
    searchProduct() {
      this.$router.push(`?q=${this.search}`)
      if (this.search === '') {
        this.getProducts()
        this.isSearch = false
      } else {
        this.sortText = 'Sort'
        this.isSearch = true
        this.searchProducts(this.search)
      }
    },
    sortBy(data) {
      if (data === 'product_name ASC') {
        this.sortText = 'A-Z'
      } else if (data === 'product_name DESC') {
        this.sortText = 'Z-A'
      } else if (data === 'product_price ASC') {
        this.sortText = 'Lowest Price'
      } else if (data === 'product_price DESC') {
        this.sortText = 'Highest Price'
      }
      this.sortProduct(data)
      this.getProducts()
      this.$router.push(`?sort=${data}&p=${this.currentPage}`)
    },
    checklistPlusMinus(data) {
      return this.cart.some(item => item.product_id === data.product_id)
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

    // PAGINATION
    pageChange(numbPage) {
      this.$router.push(`?page=${numbPage}`)
      this.setPage(numbPage)
      this.getProducts()
    }
  }
}
</script>

<style src="../assets/css/style.css"></style>

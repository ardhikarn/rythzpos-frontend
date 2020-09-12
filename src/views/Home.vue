<template>
  <div class="home">
    <b-container fluid>
      <b-row align="center" class="header">
        <b-col sm="1" cols="1" class="align-self-center py-4">
          <b-button v-b-toggle.my-sidebar class="fas fa-bars"></b-button>
        </b-col>
        <b-col xl="7" lg="7" cols="8" class="foodItems align-self-center py-4">Food Items</b-col>
        <CountCart />
      </b-row>
      <b-row class="main">
        <MainProduct />
        <!-- EMPTY ORDER -->
        <CartEmpty />
        <!-- ORDER LIST -->
        <CartList />
      </b-row>
    </b-container>

    <!-- MODAL CHECKOUT -->
    <b-modal hide-footer ref="modal-checkout" title="CHECKOUT BERHASIL">
      <b-row class="mb-2">
        <b-col lg="6" class="text-left">Cashier : Pevita Pearce</b-col>
        <b-col lg="6" class="text-right">Receipt no: #{{ invoice }}</b-col>
      </b-row>
      <div class="modal-content">
        <div class="modal-body">
          <b-row v-for="(item, index) in cart" :key="index">
            <b-col lg="6" class="text-left">
              <p>
                {{ item.product_name }} {{ item.product_qty }}x (@{{
                item.product_price
                }})
              </p>
            </b-col>
            <b-col lg="6" class="text-right">
              <p>Rp. {{ item.product_price * item.product_qty }}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6" class="text-left">Ppn 10%</b-col>
            <b-col lg="6" class="text-right">
              Rp. {{ totalPrice() * 0.1 }}
              <hr />
            </b-col>
            <b-col lg="12" class="text-right">Total : Rp. {{ totalPrice() + totalPrice() * 0.1 }}</b-col>
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
          <b-button type="submit" class="text-white mt-3 py-2 my-2" v-show="!isUpdate">Add</b-button>
          <b-button
            type="button"
            class="text-white mt-3 py-2 my-2"
            v-show="isUpdate"
            @click.prevent="patchProduct()"
          >Update</b-button>
          <b-button class="text-white py-2 my-2">Cancel</b-button>
        </div>
      </b-form>
    </b-modal>

    <!-- SIDEBAR MENU -->
    <Sidebar />
  </div>
</template>

<script>
import CountCart from '../components/CountCart'
import Sidebar from '../components/Sidebar'
import MainProduct from '../components/MainProduct'
import CartEmpty from '../components/CartEmpty'
import CartList from '../components/CartList'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Home',
  components: {
    CountCart,
    Sidebar,
    MainProduct,
    CartEmpty,
    CartList
  },
  data() {
    return {
      // getProduct
      // products: [],
      // page: 1,
      // limit: 6,
      // search: '',
      isSearch: false,
      // sort: '',
      // ascDesc: '',

      // pagination and sort
      sortText: 'Sort',
      // totalData: 0,
      showPagination: true,

      // cart: [],
      form: {
        category_id: '',
        product_name: '',
        product_image: {},
        product_price: '',
        product_status: ''
      },
      isUpdate: false,
      modalHeader: ''
      // addOrders: [],
      // invoice: ''
      //     currentPage: 1,
      //     rows: 50,
      // product_id: ''
    }
  },
  computed: {
    ...mapGetters({
      page: 'getPage2',
      limit: 'getLimit',
      products: 'getProduct2',
      productId: 'getProudctId',
      user: 'getUser',
      invoice: 'getInvoice',
      cart: 'getCart'
    })
  },
  created() {
    this.getProduct()
  },
  methods: {
    ...mapActions([
      'getProducts',
      'postProducts',
      'patchProducts',
      'deleteProducts',
      'searchProducts'
    ]),
    handleFile(event) {
      this.form.product_image = event.target.files[0]
    },
    ...mapActions({
      logout: 'logout',
      getProduct: 'getProducts'
    }),
    ...mapMutations(['setPage', 'setProductId']),
    addProduct() {
      const data = new FormData()
      data.append('category_id', this.form.category_id)
      data.append('product_name', this.form.product_name)
      data.append('product_image', this.form.product_image)
      data.append('product_price', this.form.product_price)
      data.append('product_status', this.form.product_status)
      this.postProducts(data)
        .then((response) => {
          this.$refs['modal-product'].hide()
          this.getProduct()
        })
        .catch((error) => console.log(error))
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
      // this.getProduct()
      this.isUpdate = false
      this.$refs['modal-product'].hide()
    },
    deleteProduct(data) {
      this.product_id = data.product_id
      this.getProduct()
      this.deleteProducts(this.product_id)
    },
    searchProduct() {
      this.$router.push(`?q=${this.search}`)
      this.sortText = 'Sort'
      if (this.search === '') {
        this.getProduct()
        this.isSearch = false
      } else {
        this.isSearch = true
        this.searchProducts(this.search)
        this.showPagination = false
        this.limit = 100
      }
    },
    // deleteProduct(productId) {
    //   axios
    //     .delete(`http://127.0.0.1:3000/product/${productId}`)
    //     .then((response) => {
    //       this.getProduct()
    //     })
    //     .catch((error) => error)
    // },
    // getProduct untuk menampilkan card
    // getProduct() {
    //   axios
    //     .get(
    //       `http://127.0.0.1:3000/product?page=${this.page}&limit=${this.limit}&sort=${this.sort}`
    //     )
    //     .then((response) => {
    //       this.products = response.data.data
    //       this.totalData = response.data.pagination.totalData
    //     })
    //     .catch((error) => error)
    // },
    // addToCart(data) {
    //   const addItemToCart = {
    //     product_id: data.product_id,
    //     product_name: data.product_name,
    //     product_price: data.product_price,
    //     product_image: data.product_image,
    //     product_qty: 1
    //   }
    //   this.cart = [...this.cart, addItemToCart]
    // },
    // removeCart(data) {
    //   return this.cart.splice(
    //     this.cart.findIndex((item) => item.product_id === data.product_id),
    //     1
    //   )
    // },
    checklistPlusMinus(data) {
      return this.cart.some((item) => item.product_id === data.product_id)
    },
    // incrementQty(data) {
    //   data.product_qty += 1
    // },
    // decrementQty(data) {
    //   if (data.product_qty === 1) {
    //     this.removeCart(data)
    //   } else {
    //     data.product_qty -= 1
    //   }
    // },
    totalPrice() {
      let total = 0
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].product_price * this.cart[i].product_qty
      }
      return total
    },
    // showModal() {
    //   this.isUpdate = false
    //   this.$refs['modal-product'].show()
    //   this.form = {
    //     category_id: '',
    //     product_name: '',
    //     product_image: '',
    //     product_price: '',
    //     product_status: ''
    //   }
    //   this.modalHeader = 'ADD ITEM PRODUCT'
    // },
    closeModalCheckout() {
      this.$refs['modal-checkout'].hide()
      this.$refs['modal-confirm'].hide()
      this.cart = []
    },
    closeModalConfirm() {
      this.$refs['modal-confirm'].hide()
    },

    // untuk menambah product
    // addProduct() {
    //   axios
    //     .post('http://127.0.0.1:3000/product', this.form)

    //     .then((response) => {
    //       this.getProduct()
    //       this.$refs['modal-product'].hide()
    //     })
    //     .catch((error) => error)
    // },

    // === SEARCHING ===
    // searchProduct() {
    //   if (this.search === '') {
    //     this.getProduct()
    //     this.$router.push('/home')
    //     this.limit = 6
    //     this.showPagination = true
    //   } else {
    //     this.limit = 12
    //     this.getProduct()
    //     this.sortText = 'Sort'
    //     this.showPagination = false
    //     this.$router.push(`?q=${this.search}`)
    //   }
    // },

    // === SORTING ===
    sortAscByName() {
      this.sortText = 'A - Z'
      this.sort = 'product_name'
      this.ascDesc = 'ASC'
      this.setPage(1)
      this.getProduct()
      this.showPagination = true
      this.$router.push(`?sortAsc=${this.sort}`)
    },
    sortDescByName() {
      this.sortText = 'A - Z'
      this.sort = 'product_name'
      this.ascDesc = 'DESC'
      this.setPage(1)
      this.getProduct()
      this.showPagination = true
      this.$router.push(`?sortDesc=${this.sort}`)
    },
    sortAscByPrice() {
      this.sortText = 'Highest Price'
      this.sort = 'product_price'
      this.ascDesc = 'DESC'
      this.setPage(1)
      this.showPagination = true
      this.getProduct()
      this.$router.push(`?Highest=${this.sort}`)
    },
    sortDescByPrice() {
      this.sortText = 'Lowest Price'
      this.sort = 'product_price'
      this.ascDesc = 'ASC'
      this.getProduct()
      this.setPage(1)
      this.showPagination = true
    },

    // PAGINATION
    pageChange(numbPage) {
      this.$router.push(`?page=${numbPage}`)
      // this.page = numbPage
      this.setPage(numbPage)
      this.getProduct()
      // this.scrollToTop()
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    }

    // CHECKOUT ORDER
    // addDataOrder(data) {
    //   for (let i = 0; i < data.length; i++) {
    //     const dataOrders = {
    //       product_id: data[i].product_id,
    //       order_qty: data[i].product_qty
    //     }
    //     this.addOrders = [...this.addOrders, dataOrders]
    //   }
    //   this.$refs['modal-confirm'].show()
    // }
    // postOrder() {
    //   axios
    //     .post('http://127.0.0.1:3000/order', this.addOrders)
    //     .then((response) => {
    //       this.invoice = response.data.data.invoice
    //       this.$refs['modal-checkout'].show()
    //     })
    //     .catch((error) => error)
    // }
    // cancelOrder() {
    //   this.cart = []
    // }
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>

<template>
  <b-container fluid>
    <b-row align="center" class="header">
      <b-col sm="1" cols="1" class="align-self-center py-4">
        <b-button v-b-toggle.my-sidebar class="fas fa-bars"></b-button>
        <b-sidebar id="my-sidebar" shadow>
          <b-row>
            <b-col cols="12">Selamat Pagi Cashier#1</b-col>
            <b-col cols="12">
              <img src="../assets/img-nav/fork.png" alt="Menu" class="my-5" />
            </b-col>
            <b-col cols="12">
              <a href="/history">
                <img src="../assets/img-nav/clipboard.png" alt="History" class="my-5" />
              </a>
            </b-col>
            <b-col cols="12">
              <a href="/setting">
                <img src="../assets/img-nav/setting2.png" alt="Setting" class="my-5" />
              </a>
            </b-col>
            <b-col cols="12" class="my-5">
              <a>Logout</a>
            </b-col>
          </b-row>
        </b-sidebar>
      </b-col>
      <b-col xl="11" lg="7" cols="8" class="foodItems align-self-center py-4">Setting Data Product</b-col>
    </b-row>
    <b-container>
      <b-row>
        <b-col cols="8">
          <b-button id="show-btn" @click="showModalProduct">Open Modal</b-button>
        </b-col>
        <b-col cols="4">SEARCH</b-col>
      </b-row>
    </b-container>

    <!-- MODAL ADD AND EDIT PRODUCT -->
    <b-modal ref="add-product" hide-footer :title="modalHeader">
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
              id="inline-form-custom-select-pref"
              :options="[{ text: 'Choose...', value: null }, 0, 1]"
              :value="null"
            ></b-form-select>
          </b-col>
        </b-row>
        <div>
          <b-button type="submit" class="text-white mt-3 py-2 my-2" v-show="!isUpdate">Add</b-button>
          <b-button type="button" class="text-white mt-3 py-2 my-2" v-show="isUpdate">Update</b-button>
          <b-button class="text-white py-2 my-2">Cancel</b-button>
        </div>
      </b-form>
    </b-modal>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Setting',
  data() {
    return {
      isUpdate: false,
      modalHeader: '',
      form: {
        category_id: '',
        product_name: '',
        product_image: {},
        product_price: '',
        product_status: ''
      }
    }
  },
  methods: {
    ...mapActions(['postProduct']),
    handleFile(event) {
      this.form.product_image = event.target.files[0]
    },
    addProduct() {
      // console.log(this.form)
      const data = new FormData()
      data.append('category_id', this.form.category_id)
      data.append('product_name', this.form.product_name)
      data.append('product_image', this.form.product_image)
      data.append('product_price', this.form.product_price)
      data.append('product_status', this.form.product_status)
      this.postProduct(data)
        .then((response) => {
          this.$refs['add-product'].hide()
        })
        .then((error) => {
          console.log(error)
        })
    },
    showModalProduct() {
      this.$refs['add-product'].show()
      this.modalHeader = 'ADD PRODUCT'
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    }
  }
}
</script>

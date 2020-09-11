<template>
  <b-container>
    <h1>Page Product</h1>
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
        <b-button class="text-white mt-3 py-2 my-2" type="submit">Add</b-button>
        <b-button type="button" class="text-white mt-3 py-2 my-2">Update</b-button>
      </div>
    </b-form>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Product',
  data() {
    return {
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
      console.log(event.target.files[0])
    },
    addProduct() {
      const data = new FormData()
      data.append('category_id', this.form.category_id)
      data.append('product_name', this.form.product_name)
      data.append('product_image', this.form.product_image)
      data.append('product_price', this.form.product_price)
      data.append('product_status', this.form.product_status)
      this.postProduct(data)
        .then((response) => {
          console.log(response)
        })
        .then((error) => {
          console.log(error)
        })
    }
  }
}
</script>

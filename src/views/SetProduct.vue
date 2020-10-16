<template>
  <b-container fluid>
    <Header title="Setting Product" />
    <b-container class="my-4 bg-light">
      <b-row class="pt-3">
        <b-col cols="9">
          <b-button variant="secondary" @click="showModalAdd"
            >Add Product</b-button
          >
        </b-col>
        <b-col cols="3">
          <!-- <b-form-group>
            <b-input-group>
              <b-form-input
                v-model="filter"
                type="search"
                placeholder="Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group> -->
        </b-col>
        <b-col cols="12" class="mt-3">
          <table class="table table-responsive-sm">
            <thead>
              <tr>
                <th scope="col" v-format.bold>ID</th>
                <th scope="col" v-format.bold>Product Name</th>
                <th scope="col" v-format.bold>Image</th>
                <th scope="col" v-format.bold>Category</th>
                <th scope="col" v-format.bold>Price</th>
                <th scope="col" v-format.bold>Status</th>
                <th scope="col" v-format.bold>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in getProduct" :key="index">
                <td>{{ item.product_id }}</td>
                <td>{{ item.product_name }}</td>
                <td>{{ item.product_image }}</td>
                <td>{{ item.category_name }}</td>
                <td>Rp. {{ formatRp(item.product_price) }}</td>
                <td>
                  {{ item.product_status === 1 ? 'Available' : 'Unavailable' }}
                </td>
                <td>
                  <b-icon
                    style="cursor: pointer"
                    scale="1.3"
                    icon="pencil-square"
                    variant="warning"
                    class="m-2 d-inline-block align-top img-edit"
                    alt="edit"
                    @click="editProduct(item)"
                  />
                  |
                  <b-icon
                    style="cursor: pointer"
                    scale="1.3"
                    icon="trash"
                    variant="danger"
                    class="m-2 d-inline-block align-top action-img"
                    alt="delete"
                    @click="confirmDelete(item)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col cols="12" class="mt-3 text-center">
          <b-pagination
            v-model="getPage"
            :total-rows="getTotalData"
            :per-page="getLimit"
            aria-controls="my-table"
            align="center"
            @change="changePage"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>

    <!-- MODAL ADD AND UPDATE -->
    <b-modal hide-footer ref="modal-product" :title="modalHeader">
      <b-form @submit.prevent="addProduct">
        <b-row class="mb-3">
          <b-col cols="4" class="align-self-center">Category Id :</b-col>
          <b-col cols="8">
            <b-form-select
              required
              v-model="form.category_id"
              id="inline-form-custom-select-pref"
              :options="categoryOpt"
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
              :options="statusOpt"
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
          <b-button
            class="text-white py-2 my-2"
            @click="$refs['modal-product'].hide()"
            >Cancel</b-button
          >
        </div>
      </b-form>
    </b-modal>
  </b-container>
</template>

<script>
import Header from '@/components/Header'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SetProduct',
  components: {
    Header
  },
  data() {
    return {
      form: {},
      isUpdate: false,
      modalHeader: '',
      categoryOpt: [
        { value: 1, text: 'Coffee' },
        { value: 2, text: 'Cakes' },
        { value: 3, text: 'Foods' },
        { value: 4, text: 'Drinks' }
      ],
      statusOpt: [
        { value: 0, text: 'Unavailable' },
        { value: 1, text: 'Available' }
      ]
    }
  },
  created() {
    this.getProducts()
  },
  computed: {
    ...mapGetters(['getProduct', 'getLimit', 'getPage', 'getTotalData'])
  },
  methods: {
    ...mapActions([
      'getProducts',
      'postProducts',
      'patchProducts',
      'deleteProducts'
    ]),
    ...mapMutations(['setPage']),
    showModalAdd() {
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
    handleFile(event) {
      this.form.product_image = event.target.files[0]
    },
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
          this.makeToast('success', 'Success', response.message)
          this.getProducts()
        })
        .catch((error) => this.makeToast('danger', 'Error', error.data.message))
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
        .then((response) => {
          this.$refs['modal-product'].hide()
          this.getProducts()
          this.isUpdate = false
          this.makeToast('success', 'Success', response.message)
        })
        .catch((error) => this.makeToast('danger', 'Error', error.data.message))
    },
    confirmDelete(data) {
      this.$bvModal
        .msgBoxConfirm(
          `Are you sure want to delete Product ${data.product_name} ?`,
          {
            title: 'Delete Category',
            okVariant: 'danger',
            okTitle: 'YES',
            cancelTitle: 'NO',
            footerClass: 'p-2',
            centered: true
          }
        )
        .then((response) => {
          if (response) {
            this.deleteProducts(data.product_id)
              .then((response) => {
                this.getProducts()
                this.makeToast('success', 'Success', response.message)
              })
              .catch((error) => {
                this.makeToast('success', 'Success', error.data.message)
              })
          }
        })
    },
    changePage(data) {
      this.setPage(data)
      this.getProducts()
      this.$router.push(`?page=${this.getPage}`)
    },
    makeToast(variant, title, message) {
      this.$bvToast.toast(message, {
        title,
        variant: variant,
        solid: true
      })
    },
    formatRp(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  }
}
</script>

<style scoped></style>

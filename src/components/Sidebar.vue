<template>
  <b-sidebar id="my-sidebar" shadow backdrop>
    <b-container fluid>
      <b-row class="text-center">
        <b-col cols="12">
          Welcome Back
          <strong>{{ user.user_name }}</strong>
        </b-col>
        <b-col cols="12">
          <img src="../assets/img-nav/fork.png" alt="Menu" class="my-5" />
        </b-col>
        <b-col cols="12">
          <a href="/history">
            <img src="../assets/img-nav/clipboard.png" alt="History" class="my-5" />
          </a>
        </b-col>
        <b-col cols="12">
          <img
            src="../assets/img-nav/setting2.png"
            alt="Add Menu"
            class="my-5 addProduct"
            @click="showModal()"
          />
        </b-col>
        <b-col cols="12" class="my-5">
          <a @click="logout">Logout</a>
        </b-col>
      </b-row>
    </b-container>
  </b-sidebar>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Sidebar',
  data() {
    return {
      form: {
        category_id: '',
        product_name: '',
        product_image: {},
        product_price: '',
        product_status: ''
      },
      isUpdate: false,
      modalHeader: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    ...mapActions({ handleLogout: 'logout' }),
    logout() {
      this.$bvModal
        .msgBoxConfirm('Are you sure want to logout?', {
          cancelVariant: 'danger',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
        .then((value) => {
          this.isLogout = value
          this.isLogout ? this.handleLogout() : console.log(value)
        })
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
    }
  }
}
</script>

<style src="../assets/css/style.css"></style>

<template>
  <b-col sm="1" cols="2" class="align-self-center py-4">
    <b-button v-b-toggle.my-sidebar class="fas fa-bars"></b-button>
    <b-sidebar id="my-sidebar" shadow>
      <b-container fluid>
        <b-row>
          <b-col cols="12">
            <a href="/home">
              <img src="../../assets/img-nav/fork.png" alt="Menu" class="my-5" />
            </a>
          </b-col>
          <b-col cols="12">
            <a href="/history">
              <img src="../../assets/img-nav/clipboard.png" alt="History" class="my-5" />
            </a>
          </b-col>

          <b-col cols="12">
            <img
              src="../../assets/img-nav/add.png"
              alt="Add Menu"
              class="my-5"
              @click="showModal()"
            />
          </b-col>
        </b-row>
      </b-container>
    </b-sidebar>
  </b-col>
</template>

<script>
export default {
  name: 'NavSide',
  methods: {
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
      this.$emit('showModal')
    }
  }
}
</script>

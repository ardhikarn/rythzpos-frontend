<template>
  <b-row align="center" class="header">
    <b-col sm="1" cols="2" class="align-self-center py-4">
      <b-button v-b-toggle.my-sidebar class="fas fa-bars"></b-button>
      <b-sidebar id="my-sidebar" shadow>
        <b-container fluid>
          <b-row>
            <b-col cols="12">
              <img src="../../assets/img-nav/fork.png" alt="Menu" class="my-5" />
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
                class="my-5 addProduct"
                @click="showModal1()"
              />
            </b-col>
          </b-row>
        </b-container>
      </b-sidebar>
    </b-col>
    <b-col xl="7" lg="7" cols="8" class="foodItems align-self-center py-4">Food Items</b-col>
    <b-col xl="4" lg="3" cols="12" class="cart py-4">
      Cart
      <b-badge>{{ count1() }}</b-badge>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'HeaderComp',
  methods: {
    count1() {
      this.$emit('countCart')
    },
    showModal1() {
      this.$emit('showModalAdd')
    }
  }
}
</script>

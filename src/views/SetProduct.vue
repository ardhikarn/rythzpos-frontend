<template>
  <b-container fluid>
    <Header title="Setting Product" />
    <b-container class="my-4 bg-light">
      <b-row>
        <b-col cols="6">
          <b-button variant="success">Add Product</b-button>
        </b-col>
        <b-col cols="6">Search Product</b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'SetProduct',
  components: {
    Header
  }
}
</script>

<style scoped></style>

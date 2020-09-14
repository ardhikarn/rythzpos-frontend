<template>
  <b-row class="header">
    <b-col cols="1" class="align-self-center py-4">
      <router-link to="/home" class="text-white">
        <b-button variant="secondary" class="mb-2 px-1">
          <b-icon icon="arrow-left" aria-hidden="true"></b-icon>
          Home
        </b-button>
      </router-link>
    </b-col>
    <b-col align="center" cols="11" class="foodItems align-self-center py-4">{{
      title
    }}</b-col>
  </b-row>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style src="../assets/css/style.css"></style>

<template>
  <b-row>
    <b-col cols="2" class="header-icon">
      <img src="@/assets/img/menu.png" alt="toggle-menu" v-b-toggle.my-sidebar-backdrop />
    </b-col>
    <b-col cols="8" class="header-text">
      <h1>{{title}}</h1>
    </b-col>
    <b-col cols="2"></b-col>
  </b-row>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped src="@/assets/css/style.css"></style>

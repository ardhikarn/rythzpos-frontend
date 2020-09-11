<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  created() {
    this.interceptorRequest()
    this.interceptorResponse()
  },
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse'])
  }
}
</script>

<style>
@font-face {
  font-family: airbnb-light;
  src: url('./assets/airbnb/Light.ttf');
}

@font-face {
  font-family: airbnb-bold;
  src: url('./assets/airbnb/Bold.ttf');
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: airbnb-light;
}
</style>

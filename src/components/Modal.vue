<template>
  <b-modal :id="modalId" hide-header hide-footer centered>
    <b-row class="align-items-center justify-content-center">
      <b-col xl="10" cols="10">
        <h1 v-format.bold>{{ title }}</h1>
        <p class="text-secondary mb-0">{{ subtitle }}</p>
        <hr />
        <slot name="body"></slot>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
export default {
  name: 'Modal',
  props: ['modalId', 'title', 'subtitle']
}
</script>

<style scoped>
</style>

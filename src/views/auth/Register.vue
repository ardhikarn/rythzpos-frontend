<template>
  <b-container class="mx-auto">
    <b-row class="align-items-center justify-content-center">
      <b-col xl="4" cols="9" class="my-5">
        <h1>
          <strong>Sign Up</strong>
        </h1>
        <p class="text-secondary mb-0">Sign up and start shopping</p>
        <hr />
        <b-form @submit.prevent="addUser">
          <div class="input-field bg-light my-3 rounded-pill px-2">
            <i class="fas fa-user text-center"></i>
            <input
              required
              type="text"
              v-model="form.user_name"
              placeholder="User Name"
              class="border-0"
            />
          </div>
          <div class="input-field bg-light rounded-pill px-2">
            <i class="fas fa-envelope text-center"></i>
            <input
              required
              type="email"
              v-model="form.user_email"
              placeholder="User Email"
              class="border-0"
            />
          </div>
          <div class="input-field bg-light my-3 rounded-pill px-2">
            <i class="fas fa-lock text-center"></i>
            <input
              required
              type="password"
              v-model="form.user_password"
              placeholder="User Password"
              class="border-0"
            />
          </div>
          <b-button type="submit" class="btn-block mt-4 py-2 rounded-pill"
            >Sign up</b-button
          >
        </b-form>
        <h5 class="text-center my-5">
          Already have an account ?
          <router-link to="/login">
            <span>Sign In</span>
          </router-link>
        </h5>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data() {
    return {
      form: {
        user_name: '',
        user_email: '',
        user_password: ''
      }
    }
  },
  computed: {},
  methods: {
    ...mapActions(['register']),
    addUser() {
      this.register(this.form)
        .then((response) => {
          this.makeToast('info', 'Information', response.message)
          setTimeout(() => {
            this.$router.push('/login')
          }, 4000)
        })
        .catch((error) => {
          this.makeToast('danger', 'Error', error.data.message)
        })
    },
    makeToast(variant, title, message) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true
      })
    }
  }
}
</script>

<style src="../../assets/css/style.css"></style>

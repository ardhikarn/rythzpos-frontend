<template>
  <b-container class="mx-auto">
    <b-row class="align-items-center justify-content-center">
      <b-col xl="4" cols="9" class="my-5">
        <h1>
          <strong>Sign In</strong>
        </h1>
        <p class="text-secondary mb-0">
          Sign in to Your Account, before shopping
        </p>
        <hr />
        <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
          <div class="input-field bg-light my-2 rounded-pill px-2">
            <i class="fas fa-user text-center"></i>
            <input
              required
              type="email"
              placeholder="User Email"
              class="border-0"
              v-model="form.user_email"
            />
          </div>
          <div class="input-field bg-light my-3 rounded-pill px-2">
            <i class="fas fa-lock text-center"></i>
            <input
              required
              type="password"
              placeholder="User Password"
              class="border-0"
              v-model="form.user_password"
            />
          </div>
          <b-button type="submit" class="btn-block mt-4 py-2 rounded-pill"
            >Sign in</b-button
          >
          <b-button type="reset" class="btn-block mt-4 py-2 rounded-pill"
            >Reset</b-button
          >
          <p class="text-center my-1">or Forgot Password</p>
          <h5 class="text-center my-5">
            Don't have an account ?
            <router-link to="/register">
              <span>Sign Up</span>
            </router-link>
          </h5>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        user_email: '',
        user_password: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser'
    })
  },
  methods: {
    ...mapActions(['login']),
    onSubmit() {
      this.login(this.form)
        .then(response => {
          this.$router.push('/home')
          setTimeout(() => {
            if (this.user.user_role === 1) {
              this.makeToast(
                'success',
                response.message,
                `Welcome Admin ${this.user.user_name}`
              )
            } else {
              this.makeToast(
                'success',
                response.message,
                `Welcome Chasier ${this.user.user_name}`
              )
            }
          }, 500)
        })
        .catch(error => {
          if (
            error.data.message ===
            'Your account is not activate, contact admin for activation'
          ) {
            this.makeToast('info', 'Information', error.data.message)
          } else {
            this.makeToast('danger', 'Error', error.data.message)
          }
        })
    },
    onReset() {
      this.form = {
        user_email: '',
        user_password: ''
      }
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

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
        <b-alert
          show
          variant="danger"
          v-show="isError"
          class="my-2 text-center"
          >{{ error() }}</b-alert
        >
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
      },
      isError: false
    }
  },
  methods: {
    ...mapGetters({ error: 'getError' }),
    ...mapActions(['login']),
    onSubmit() {
      this.login(this.form)
        .then(result => {
          this.$router.push('/home')
        })
        .catch(error => {
          this.isError = true
          console.log(error)
        })
    },
    onReset() {
      this.form = {
        user_email: '',
        user_password: ''
      }
    }
  }
}
</script>

<style scoped>
.fa-facebook,
.fa-google,
.fa-apple {
  font-size: 26px;
}

.input-field {
  display: grid;
  grid-template-columns: 15% 85%;
}

.input-field i {
  line-height: 55px;
  transition: 0.5s;
}

.input-field input {
  background: none;
  outline: none;
  font-weight: 600;
}
</style>

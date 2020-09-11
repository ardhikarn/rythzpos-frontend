<template>
  <b-container class="mx-auto">
    <b-row class="align-items-center justify-content-center">
      <b-col xl="4" cols="9" class>
        <h1 class="mb-3">Sign In</h1>
        <hr class="my-0" />
        <p class="text-secondary">Sign in to Your Account, before shopping</p>
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
          <b-button type="submit" class="btn-block mt-4 py-2 rounded-pill">Log in</b-button>
          <p class="warning text-center mt-2 mb-4" v-show="isError">{{ error() }}</p>
          <p class="text-center my-1">or Forgot Password</p>
          <h5 class="text-center my-5">
            Don't have an account ?
            <a href="/register">Sign Up</a>
          </h5>
          <b-button type="reset">Reset</b-button>
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
  computed: {
    // dataName() {
    //   return this.$store.state.name
    // } Cara 1
    // ...mapState({ dataName: 'name' }) cara 2
    // ...mapState(['name'])
  },
  methods: {
    ...mapGetters({ error: 'getError' }),
    ...mapActions(['login']),
    onSubmit() {
      this.login(this.form)
        .then((result) => {
          this.$router.push('/home')
        })
        .catch((error) => {
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

<template>
  <b-container class="mx-auto">
    <b-row class="align-items-center justify-content-center">
      <b-col xl="4" cols="9" class="my-5">
        <h1>
          <strong>Sign Up</strong>
        </h1>
        <p class="text-secondary mb-0">Sign up and start shopping</p>
        <hr />
        <b-alert
          show
          variant="danger"
          v-show="isError"
          class="my-2 text-center"
          >{{ error() }}</b-alert
        >
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Register',
  data() {
    return {
      form: {
        user_name: '',
        user_email: '',
        user_password: ''
      },
      isError: false
    }
  },
  computed: {},
  methods: {
    ...mapGetters({ error: 'getError' }),
    ...mapActions(['register']),
    addUser() {
      this.register(this.form)
        .then(response => {
          this.$bvModal
            .msgBoxOk(
              <b-alert show variant="success">
                Account Created, Contact Admin for Activation Account
              </b-alert>,
              {
                title: 'Confirmation',
                okVariant: 'success',
                headerClass: 'p-2 border-bottom-0',
                footerClass: 'p-2 border-top-0',
                centered: true
              }
            )
            .then(response => {
              this.$router.push('/login')
            })
        })
        .catch(error => {
          this.isError = true
          console.log(error)
        })
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

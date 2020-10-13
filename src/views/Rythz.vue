<template>
  <div class="heightfull">
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-container>
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
        <b-navbar-brand>Rythz-POS</b-navbar-brand>
        <b-collapse id="nav-text-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-text class="mr-5" v-b-modal.modal-login>Login</b-nav-text>

            <!-- MODAL LOGIN -->
            <b-modal id="modal-login" hide-footer hide-header centered>
              <b-row class="align-items-center justify-content-center">
                <b-col xl="10" cols="10">
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
                        v-model="formLogin.user_email"
                      />
                    </div>
                    <div class="input-field bg-light my-3 rounded-pill px-2">
                      <i class="fas fa-lock text-center"></i>
                      <input
                        required
                        type="password"
                        placeholder="User Password"
                        class="border-0"
                        v-model="formLogin.user_password"
                      />
                    </div>
                    <b-button
                      type="submit"
                      class="btn-block mt-4 py-2 rounded-pill"
                      >Sign in</b-button
                    >
                    <b-button
                      type="reset"
                      class="btn-block mt-4 py-2 rounded-pill"
                      >Reset</b-button
                    >
                    <p class="text-center my-2">or Forgot Password</p>
                    <h5 class="text-center mt-4">
                      Don't have an account ?
                      <router-link to="/register">
                        <span>Sign Up</span>
                      </router-link>
                    </h5>
                  </b-form>
                </b-col>
              </b-row>
            </b-modal>

            <b-nav-text v-b-modal.modal-register>Register</b-nav-text>

            <!-- MODAL REGISTER -->
            <b-modal id="modal-register" hide-header hide-footer centered>
              <b-row class="align-items-center justify-content-center">
                <b-col xl="10" cols="10">
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
                        v-model="formRegis.user_name"
                        placeholder="User Name"
                        class="border-0"
                      />
                    </div>
                    <div class="input-field bg-light rounded-pill px-2">
                      <i class="fas fa-envelope text-center"></i>
                      <input
                        required
                        type="email"
                        v-model="formRegis.user_email"
                        placeholder="User Email"
                        class="border-0"
                      />
                    </div>
                    <div class="input-field bg-light my-3 rounded-pill px-2">
                      <i class="fas fa-lock text-center"></i>
                      <input
                        required
                        type="password"
                        v-model="formRegis.user_password"
                        placeholder="User Password"
                        class="border-0"
                      />
                    </div>
                    <b-button
                      type="submit"
                      class="btn-block mt-4 py-2 rounded-pill"
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
            </b-modal>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <div class="banner">
      <b-container class="text-centers">
        <h1 class="text-capitalize">
          welcome to <strong class="banner-title">Rythz-POS</strong>
        </h1>
        <a href="#store" class="btn banner-link my-2">www.rytzh-pos.com</a>
      </b-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Rythz',
  data() {
    return {
      formLogin: {
        user_email: '',
        user_password: ''
      },
      formRegis: {
        user_name: '',
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
    ...mapActions(['login', 'register']),
    ...mapMutations(['cancelOrder']),
    addUser() {
      this.register(this.formRegis)
        .then((response) => {
          this.makeToast('info', 'Information', response.message)
          setTimeout(() => {
            this.$bvModal.hide('modal-register')
            // this.$bvModal.show('modal-login')
          }, 4000)
        })
        .catch((error) => {
          this.makeToast('danger', 'Error', error.data.message)
        })
    },
    onSubmit() {
      this.login(this.formLogin)
        .then((response) => {
          this.$router.push('/home')
          this.cancelOrder()
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
                `Welcome Cashier ${this.user.user_name}`
              )
            }
          }, 500)
        })
        .catch((error) => {
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
      this.formLogin = {
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

<style scoped>
.heightfull {
  height: 100vh;
  overflow: auto;
  background-image: linear-gradient(
      rgba(249, 228, 148, 0.5),
      rgba(249, 228, 148, 0.5)
    ),
    url('../assets/headerBcg.jpeg');
  background-color: #cccccc;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.text-centers {
  padding: 19% 0;
}
</style>

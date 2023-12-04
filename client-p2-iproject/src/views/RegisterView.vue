<script>
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['registerHandler']),
    doRegister() {
      this.registerHandler({
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
<template>
  <!-- Register -->
  <section class="vh-100" style="background-color: whitesmoke">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-10">
          <div class="card shadow" style="border-radius: 1rem">
            <div class="row">
              <div class="col-md-5 p-0">
                <div class="card-body p-5 text-center">
                  <!-- <img src="@/assets/images/about-mg.png" alt="" width="85%" class="mt-5" /> -->
                </div>
              </div>
              <div class="col-md-7 p-0">
                <div class="card-body p-5">
                  <h3 class="text-center mb-4">Register</h3>
                  <p class="text-center"><b>Register to your account here!</b></p>
                  <form @submit.prevent="doRegister">
                    <div class="form-group mb-3">
                      <label for="email">E-mail Address</label>
                      <input
                        id="email"
                        type="text"
                        v-model="email"
                        class="form-control mt-2"
                        autofocus
                      />
                    </div>
                    <div class="form-group mb-3">
                      <label for="password">Password</label>
                      <input
                        id="password"
                        type="password"
                        v-model="password"
                        class="form-control mt-2"
                      />
                    </div>
                    <div class="form-group text-center">
                      <p>
                        Not a member?
                        <a @click="$router.push('/register')" href="#signup" class="btn btn-link"
                          >Sign Up</a
                        >
                      </p>
                    </div>
                    <div class="form-group">
                      <button
                        type="submit"
                        class="btn btn-block mt-3"
                        style="background-color: yellowgreen; color: white"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<template>
  <!-- header section starts -->
  <header class="header_section">
    <div class="container">
      <nav class="navbar navbar-expand-lg custom_nav-container bg-light">
        <a class="navbar-brand" href="index.html">
          <span style="color: yellowgreen">Cheeky Burger ShackQY</span>
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item active">
              <a
                v-if="isLogin"
                style="color: yellowgreen"
                class="nav-link"
                @click="$router.push('/')"
                >Home <span class="sr-only">(current)</span></a
              >
            </li>
            <li class="nav-item">
              <a
                v-if="isLogin"
                style="color: yellowgreen"
                class="nav-link"
                @click="$router.push('/menu')"
                >Menu</a
              >
            </li>
          </ul>
          <div class="user_option">
            <a href="" class="user_link">
              <i
                v-if="!isLogin"
                style="color: yellowgreen"
                @click="$router.push('/login')"
                class="fa fa-user"
                aria-hidden="true"
              ></i>
            </a>
            <router-link v-if="isLogin" to="/cart"
              ><a style="color: yellowgreen" class="cart_link">
                <i class="fa-solid fa-cart-shopping"></i> </a
            ></router-link>

            <a v-if="isLogin" @click="handleLogout" class="order_online"> Logout</a>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <!-- end header section -->
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    ...mapWritableState(useCounterStore, ['isLogin'])
  },
  methods: {
    ...mapActions(useCounterStore, ['logout']),
    handleLogout() {
      this.logout()
    }
  },
  created() {
    if (localStorage.access_token) {
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }
}
</script>

<style>
.custom_nav-container {
  background-color: white; /* Ganti warna latar belakang sesuai kebutuhan */
}
</style>

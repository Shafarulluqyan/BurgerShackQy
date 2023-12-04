<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    ...mapState(useCounterStore, ['carts', 'totalPrice']),
    totalPrice() {
      // Menggunakan metode reduce untuk menjumlahkan harga item-item dalam keranjang belanja
      return this.carts.reduce((total, cart) => total + cart.Food.price * 1000, 0)
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchCarts', 'doPay', 'deleteCart']),
    // incrementQuantity(index) {
    //   this.carts[index].quantity++
    // },
    // decrementQuantity(index) {
    //   if (this.carts[index].quantity > 0) {
    //     this.carts[index].quantity--
    //   }
    // },
    // removeItem(index) {
    //   this.carts.splice(index, 1)
    // },
    formatCurrency(value) {
      return `Rp. ${value.toFixed(2)}`
    },
    handlePayment() {
      this.doPay()
    },
    eventDoPay() {
      this.doPay(this.totalPrice)
    }
  },
  created() {
    this.fetchCarts()
  }
}
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-8">
        <div class="p-5">
          <h1 class="fw-bold mb-4 text-black">Shopping Cart</h1>
          <hr class="my-4" />

          <div
            v-for="cart in carts"
            :key="cart.id"
            :cart="cart"
            class="row mb-4 d-flex justify-content-between align-items-center"
          >
            <div class="col-md-2 col-lg-2 col-xl-2">
              <img :src="cart.Food.images" class="img-fluid rounded-3" alt="Cotton T-shirt" />
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
              <h6 class="text-muted">{{ cart.Food.name }}</h6>
              <h6 class="text-black mb-0">{{ cart.Food.desc }}</h6>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
              <button class="btn btn-link px-2">
                <i class="fa-solid fa-trash"></i>
              </button>
              <input
                min="0"
                name="quantity"
                v-model="cart.quantity"
                type="number"
                class="form-control form-control-sm"
              />
              <button class="btn btn-link px-2">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
              <h6 class="mb-0">$ {{ cart.Food.price }}</h6>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
              <a class="text-muted" @click.prevent="deleteCart(cart.id)">
                <i class="fa-solid fa-trash"></i>
              </a>
            </div>
          </div>

          <hr class="my-4" />

          <div class="pt-5">
            <a @click="$router.push('/menu')" class="text-body">
              <i class="fas fa-long-arrow-alt-left me-2"></i>Back to shop
            </a>
          </div>
        </div>
      </div>
      <div class="col-lg-4 bg-grey">
        <div class="p-5">
          <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
          <hr class="my-4" />

          <div class="d-flex justify-content-between mb-4">
            <h5 class="text-uppercase">{{ carts.length }} items</h5>
            <h5>{{ formatCurrency(totalPrice) }}</h5>
          </div>

          <hr class="my-4" />

          <div class="d-flex justify-content-between mb-5">
            <h5 class="text-uppercase">Total price</h5>
            <h5>{{ formatCurrency(totalPrice) }}</h5>
          </div>

          <button
            type="button"
            class="btn btn-dark btn-block btn-lg"
            data-mdb-ripple-color="dark"
            @click="eventDoPay"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1025px) {
  .h-custom {
    height: 100vh !important;
  }
}

.card-registration .select-input.form-control[readonly]:not([disabled]) {
  font-size: 1rem;
  line-height: 2.15;
  padding-left: 0.75em;
  padding-right: 0.75em;
}

.card-registration .select-arrow {
  top: 13px;
}

.bg-grey {
  background-color: #eae8e8;
}

@media (min-width: 992px) {
  .card-registration-2 .bg-grey {
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
  }
}

@media (max-width: 991px) {
  .card-registration-2 .bg-grey {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
}
</style>

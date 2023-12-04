import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    foods: [],
    foodDetail: {},
    isLogin: false,
    page: 1,
    searchQuery: '',
    searchResults: [],
    carts: []
  }),
  getters: {},
  actions: {
    async loginHandler(loginInput) {
      try {
        const { data } = await axios({
          method: 'post',
          url: 'http://localhost:3000/login',
          data: {
            email: loginInput.email,
            password: loginInput.password
          }
        })
        // console.log(email, password, "<><><> masuk loh ini bang");
        localStorage.setItem('access_token', data.access_token)

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: `Log in successfully, welcome!!!`
        })

        this.isLogin = true
        this.router.push('/')
        this.alertSuccess(data)
      } catch (error) {
        console.log(error.response.data.message)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'warning',
          title: `Invalid email/password!!!`
        })
      }
    },
    async fetchFoods() {
      try {
        const { data } = await axios({
          method: 'get',
          url: 'http://localhost:3000/foods?page=' + this.page,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        // console.log(data); // Tambahkan ini untuk memeriksa data dari server
        if (data.foods && data.foods.length > 0) {
          this.foods = [...this.foods, ...data.foods]
          this.page++
        } else {
          this.hasMore = false
        }
      } catch (error) {
        console.log(error)
      }
    },

    async foodDetail(id) {
      try {
        const { data } = await axios({
          method: 'get',
          url: 'http://localhost:3000/foods/:id'
        })
        console.log(data, '<<<><>< data si productById')
        this.foodDetail = data
      } catch (error) {}
    },
    async fetchCarts() {
      try {
        const { data } = await axios({
          method: 'get',
          url: 'http://localhost:3000/carts',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        // console.log(data, '<<<>< data cart di store')
        this.carts = data
        this.totalQuantity = data.length

        return data
      } catch (error) {
        console.log(error)
      }
    },
    async addToCart(foodId) {
      try {
        const { data } = await axios({
          method: 'post',
          url: `http://localhost:3000/cart/${+foodId}`,
          headers: { access_token: localStorage.getItem('access_token') }
        })
        if (data) {
          // console.log(data, "<<< ini dari addto");
          this.fetchCarts()
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: `Success added to Cart!!!`
          })
        }
      } catch (error) {
        console.error(error)
        if (error.response.data.message === 'Invalid token') {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'warning',
            title: `you need to login first!!!`
          })
        }
      }
    },
    async doSearch() {
      try {
        const counterStore = this
        const response = await axios.get(
          `http://localhost:3000/foods?productName=${counterStore.searchQuery}`
        )
        if (response.status === 200) {
          console.log(response.data)
          counterStore.products = response.data.products // Simpan hasil pencarian di store
        }
      } catch (error) {
        console.error(error)
        // Handle error jika ada
      }
    },

    async doPay(totalPrice) {
      try {
        // console.log(totalPrice, "<<><><>haursmasuk");
        const { data } = await axios({
          url: 'http://localhost:3000/generate-midtrans-token',
          method: 'post',
          headers: {
            access_token: localStorage.access_token,
            price: totalPrice
          }
        })
        // console.log(data.token)
        window.snap.pay(data.token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            // alert('payment success!')
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2500,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: `payment success!!!`
            })
          }
        })
        this.router.push('/menu')
      } catch (err) {
        console.log(err)
      }
    },
    async deleteCart(cartId) {
      try {
        console.log('apa ajaa ini di pinia')
        const { data } = await axios({
          url: 'http://localhost:3000/cart/' + cartId,
          method: 'delete',
          headers: {
            access_token: localStorage.access_token
          }
        })
        if (data) {
          console.log(data, '<<< ini dari deleteCart')
          this.fetchCarts()
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: `Success deleted cart from your cart!!!`
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    getCartId(foodId) {
      const cart = this.carts.find((cart) => cart.FoodId === +foodId)
      return cart.id
    },
    logout() {
      Swal.fire({
        title: 'Logout?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear()
          this.router.push('/login')
          this.isLogin = false
        }
      })
    }
  }
})

<script>
import { mapActions, mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'
import FoodCard from '../components/FoodCard.vue'
import FooterView from '../components/FooterView.vue'

export default {
  computed: {
    ...mapState(useCounterStore, ['foods', 'hasMore'])
  },
  methods: {
  ...mapActions(useCounterStore, ['fetchFoods']),
  handleScroll() {
    // console.log(window.scrollY + window.innerHeight,  document.body.scrollHeight - 50,"<<<fafa");
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
      this.fetchFoods();
    }
  }
},

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.fetchFoods()
  },
  components: { FoodCard, FooterView }
}
</script>

<template>
  <body class="sub_page">
    <div class="hero_area">
      <div class="bg-box">
        <!-- <img src="../assets/images/hero-bg.jpg" alt="" /> -->
      </div>
    </div>

    <!-- food section -->

    <section class="food_section layout_padding-bottom">
      <div class="container">
        <div class="heading_container heading_center">
          <h2>Our Menu</h2>
        </div>

        <div class="filters-content">
          <div class="row grid">
            <FoodCard v-for="food in foods" :key="food.id" :food="food" />
          </div>
        </div>
      </div>
    </section>

    <!-- end food section -->

    <!-- footer section -->
    <FooterView />
    <!-- footer section -->
  </body>
</template>

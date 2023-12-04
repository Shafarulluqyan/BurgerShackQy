<script>
import { mapActions, mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  computed: {
    ...mapWritableState(useCounterStore, ['page'])
  },
  methods: {
    ...mapActions(useCounterStore, ['fetchFoods']),
    doNext() {
      this.page++
      this.fetchFoods(this.page)
    },
    doBack() {
      this.page--
      this.fetchFoods(this.page)
    }
  }
}
</script>

<template>
  <!-- Pagination -->
  <div class="col-md-3 rounded mt-3 mb-3">
    <ul class="pagination justify-content-center text-center" style="padding: 10px">
      <li class="page-item">
        <h1>
          <a @click="doBack" v-if="page > 1" class="page-link" href="#">Previous</a>
        </h1>
      </li>

      <li class="page-item">
        <h1>
          <a @click="doNext" v-if="page < 6" class="page-link" href="#">Next</a>
        </h1>
      </li>
    </ul>
  </div>
  
</template>

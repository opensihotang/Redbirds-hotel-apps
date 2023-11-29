<script>
import { mapActions, mapState } from 'pinia';
import { useLodgingStore } from '../stores/counter'
import { RouterLink } from 'vue-router';
export default {
  name: 'LodgingCard',
  computed: {
    ...mapState(useLodgingStore, ['lodgings', 'isLoggedIn'])
  },
  methods: {
    ...mapActions(useLodgingStore, ['fetchLodging', 'postBookmark', 'generateQrCode']),

    handleAddBookmark(lodgingId){
      this.postBookmark(lodgingId)
    }
  },
  watch: {
    $route(to, from) {
      const typeId = to.query.type;
      if (typeId) {
        this.fetchLodging(typeId);
      } else {
        this.fetchLodging();
      }
    }
  },
  created() {
    const typeId = this.$route.query.type
    if (typeId) {
      this.fetchLodging(typeId)
    } else {
      this.fetchLodging()
    }
  }
}
</script>

<template>
  <div class="d-flex justify-content-center">
    <div class="row row-cols-1 row-cols-md-3 g-4 w-50">
      <div v-for="lodging in lodgings" :key="lodging.id" class="col">
        <div class="card">
          <img :src="lodging.imgUrl" class="card-img-top" alt="image">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <p class="lodging-name">{{ lodging.Type.name }}</p>
              <a v-if="isLoggedIn" href="#" @click.prevent="handleAddBookmark(lodging.id)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                  class="bi bi-bookmark" viewBox="0 0 16 16">
                  <path
                    d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                </svg></a>
            </div>
            <RouterLink :to="'/lodging/' + lodging.id" style="text-decoration: none;">
              <h5 class="card-title">{{ lodging.name }}</h5>
              <h6 class="card-details">{{ lodging.facility }}</h6>
              <p class="card-details">{{ lodging.location }}</p>
              <h5 class="card-price">{{ lodging.price }}/day</h5>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
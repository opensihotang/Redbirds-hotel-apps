<script>
import { mapActions, mapState } from 'pinia';
import { useLodgingStore } from '../stores/counter'
import { RouterLink } from 'vue-router';
export default {
  name: 'BookmarkList',
  computed: {
    ...mapState(useLodgingStore, ['bookmarks'])
  },
  methods: {
    ...mapActions(useLodgingStore, ['fetchBoomarks', 'deleteBoomark']),

    async handleDeleteBookmark(lodgingId) {
      try {
        await this.deleteBoomark(lodgingId)
        await this.fetchBoomarks()
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    this.fetchBoomarks()
  }
}
</script>
<template>
  <div class="d-flex justify-content-center">
    <div class="row row-cols-1 row-cols-md-3 g-4 w-50">
      <div v-if="bookmarks.length === 0">
        <div class="empty-bookmark">
          <p>Bookmark Kosong</p>
        </div>
      </div>
      <div v-else v-for="lodging in bookmarks" :key="lodging.id" class="col">
        <div class="card">
          <img :src="lodging.imgUrl" class="card-img-top" alt="image">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <p class="lodging-name">{{ lodging.Type.name }}</p>
              <a href="#" @click.prevent="handleDeleteBookmark(lodging.id)"><svg xmlns="http://www.w3.org/2000/svg"
                  width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                  <path
                    d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                </svg></a>
            </div>
            <h5 class="card-title">{{ lodging.name }}</h5>
            <h6 class="card-details">{{ lodging.facility }}</h6>
            <p class="card-details">{{ lodging.location }}</p>
            <h5 class="card-price">{{ lodging.price }}/day</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
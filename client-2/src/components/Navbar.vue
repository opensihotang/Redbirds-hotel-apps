<script>
import { RouterLink } from "vue-router";
import { mapActions, mapState, mapWritableState } from "pinia";
import { useLodgingStore } from "../stores/counter"
export default {
  name: 'Navbar',

  components: {
    RouterLink
  },
  computed: {
    ...mapWritableState(useLodgingStore, ['isLoggedIn'])
  },
  methods: {
    ...mapActions(useLodgingStore, ['logoutCustomer']),

    async logout() {
      await this.logoutCustomer()
      this.$router.push('/')
    }
  },
  created() {
  }
}
</script>
<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand" href="#">RentRoom</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link" aria-current="page">Home</RouterLink>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <button @click="logout" class="nav-link">Logout</button>
          </li>
          <li v-if="!isLoggedIn">
            <RouterLink to="/login" class="nav-link">Sign in</RouterLink>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <RouterLink to="/register" class="nav-link">Sign up</RouterLink>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <RouterLink to="/bookmark" class="nav-link">My Bookmark</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
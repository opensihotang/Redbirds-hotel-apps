<script>
    import Navbar from '../components/Navbar.vue';
    import Search from '../components/Search.vue';
    import LodgingCard from '../components/LodgingCard.vue';
    import Pagination from '../components/Pagination.vue'
    import { RouterView} from  'vue-router'
    export default {
        components : {
            RouterView, Navbar, Search, LodgingCard, Pagination
        }
    }
</script>

<template>
    <Search/>
    <LodgingCard/>
    <Pagination/>
</template>
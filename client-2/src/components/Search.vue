<script>
import { mapState, mapActions } from 'pinia';
import { useLodgingStore } from '../stores/counter';
export default {
    // name : "Search"
    data(){
        return {
            searchLocation :""
        }
    },
    computed: {
        ...mapState(useLodgingStore, ['types'])
    },
    methods: {
        ...mapActions(useLodgingStore, ['fetchType', 'fetchLodging']),

        applyFilter(typeId) {
            this.$router.push({ path: '/', query: { type: typeId } });
        },
        applySearch(){
            this.fetchLodging(null, this.searchLocation, null)
        }
    },
    created() {
        this.fetchType()
    }
}
</script>
<template>
    <div class=" d-flex justify-content-center search-form">
        <div class="dropdown px-2">
            <a class="btn btn-primary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                Filter
            </a>
            <ul class="dropdown-menu">
                <li v-for="tp in types" :key="tp.id">
                    <a @click="applyFilter(tp.id)" class="dropdown-item" href="#">{{ tp.name }}</a>
                </li>
            </ul>
        </div>
        <form @submit.prevent="applySearch" class="d-flex" role="search">
            <input v-model="searchLocation" class="form-control me-2" type="search" placeholder="Search location" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
    </div>
</template>
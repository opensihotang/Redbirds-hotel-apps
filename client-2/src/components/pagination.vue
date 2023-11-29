<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useLodgingStore } from '../stores/counter';


export default {
    methods: {
        ...mapActions(useLodgingStore, ['fetchLodging']),
        onChangePage(page) {
            this.currentPage = page,
                this.fetchLodging(null, null, page)
        }
    },
    computed: {
        ...mapWritableState(useLodgingStore, ['currentPage', 'totalPage', 'lodgings'])
    },
    created() {
        // console.log(this.$router);
        console.log(this.$route);
        this.fetchLodging()
    }
}
</script>

<template>
    <nav aria-label="Page navigation example" class="d-flex justify-content-center pagination">
        <ul class="pagination">
            <li class="page-item" v-for="( el, index ) in new Array(totalPage)"
                :class="{ active: index + 1 == currentPage }" :key="index">
                <a class="page-link" href="#" @click.prevent="onChangePage(index + 1)">{{ index + 1 }}</a>
            </li>
        </ul>
    </nav>
</template>
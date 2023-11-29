<script>
import { mapState, mapActions } from 'pinia';
import { useLodgingStore } from '../stores/counter';

export default {
    computed: {
        ...mapState(useLodgingStore, ['detailLodging', 'qrCode'])
    },
    methods: {
        ...mapActions(useLodgingStore, ['fetchDetailLodging', 'generateQrCode']),
    },
    created() {
        this.generateQrCode()
        const { id } = this.$route.params
        this.fetchDetailLodging(id)
    }
}
</script>

<template>
 <div class="d-flex justify-content-center align-items-center">
    <div class="detail-card">
        <div>
            <img :src="detailLodging.imgUrl" class="img-fluid w-75" alt="...">
        </div>
        <div class="details">
            <h6>{{ detailLodging.name }}</h6>
            <div>
                <h6>Room Capacity</h6>
                <p>{{ detailLodging.roomCapacity }} person</p>
                <h6>Facility</h6>
                <p>{{ detailLodging.facility }}</p>
                <h6>Location</h6>
                <p>{{ detailLodging.location }}</p>
            </div>
        </div>
        <div class="qr-code">
            <p>Scan Here:</p>
            <div v-html="qrCode"></div>
        </div>
    </div>
</div>
</template>
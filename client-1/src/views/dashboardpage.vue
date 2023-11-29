<script>
    export default {
        name : "dashboardpage",
        props : ["totalLodgings", "totalType"],
        emits : ["fetchType", "fetchLodging"],
        data(){
            return {

            }
        },
        created () {
            this.$emit("fetchType")
            this.$emit("fetchLodging")
        }
    }
</script>

<template>
    <section class="dashboard" id="dashboard-section">
            <div>
            <h1>Dashboard</h1>
            <div class="total">
                <div class="total-content">
                <h4 id="total-lodgings">Total Lodgings :</h4>
                <h2 id="total-lodgings">{{totalLodgings}}</h2>
                </div>
                <div class="total-content">
                <h4>Total Types : </h4>
                <h2 id="total-types">{{totalType}}</h2>
                </div>
            </div>
            <div>
            </div>
            </div>
        </section>
</template>
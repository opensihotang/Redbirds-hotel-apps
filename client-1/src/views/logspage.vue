<script>
import ReuseTable from "../components/table.vue"
    export default {
        name : "logspage",
        props : ["logsData"],
        emits : ["fetchLogs", "fetchLodging"],
        components : {ReuseTable},
        data () {
            return {
                logHeaders : ["#", "Lodging Name", "Description", "Created At", "Updated By"]
            }
        },
        created(){
            this.$emit("fetchLogs")
            this.$emit("fetchLodging")
        }

    }
</script>

<template>
    <section class="logs-container" id="logs-section">
        <div class="lodgings-top">
        <div>
            <h1>Logs</h1>
        </div>
        </div>
        <div class="table-container">
            <ReuseTable :data="logsData" :headers="logHeaders"/>
        </div>
    </section>
</template>
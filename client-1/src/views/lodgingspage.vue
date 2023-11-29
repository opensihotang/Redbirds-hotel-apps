<script>
    import Reusetable from "../components/table.vue"

    export default {
        name : "lodgingspage",
        emits : ["renderForm", "fetchLodging", "updateStatusLodging", "addLodging"],
        props : ["lodgingsDataFeth"],
        components : {Reusetable},
        data(){
            return {
                lodgingsHeader : ["#", "Name", "Facility", "Room Capacity", "Image", "Author Name", "Location", "Price", "Type", "Status"],
                typeData : [],
                action : true,
                statusAll : ["Active", "Inactive", "Archive"],
                status : ""
            }
        },
        methods : {
            async renderFormAddLodging(value, id){
            this.$emit("renderForm", value, id)
          },

          async handleUpdateStatusLodging(item){
            try {
                this.$emit("updateStatusLodging", item)
            } catch(err){
                // console.log(err);
            }
          }
        },
        created(){
          this.$emit("addLodging")
        },
        mounted(){
          this.$emit("fetchLodging")

        }
    }
</script>

<template>
    <section class="lodgings-container" id="product-section">
          <div class="lodgings-top">
            <div>
              <h1>Lodgings</h1>
            </div>
            <div @click.prevent="renderFormAddLodging('newlodging')" class="button">
              <button >Add Lodging</button>
            </div>
          </div>
          <div class="table-container">
            <Reusetable 
            :data="lodgingsDataFeth" 
            :headers="lodgingsHeader" 
            :action="action" 
            :statusAll="statusAll" 
            @renderFormAddLodging="renderFormAddLodging" 
            @handleUpdateStatusLodging="handleUpdateStatusLodging"/>
          </div>
    </section>
</template>
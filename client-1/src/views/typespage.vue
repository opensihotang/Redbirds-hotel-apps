<script>
import Reusetable from "../components/table.vue"
    export default {
        name : "typespage",
        props : ["typeData"],
        emits : ["renderForm", "fetchType"],
        components : {Reusetable},
        data(){
            return {
                typeHeader : ["#", "Name"]
            }
        },
        methods : {
            async renderFormAddType(value){
                this.$emit("renderForm", value)
            }
        },
        created () {
            // this.$emit("fetchType")
        }
    }
</script>

<template>
    <section class="types-container" id="category-section">
          <div class="lodgings-top">
            <div>
              <h1>Types</h1>
            </div>
            <div @click="renderFormAddType('newtype')" class="button">
              <button>Add Types</button>
            </div>
          </div>
          <div class="table-container">
                <Reusetable :data="typeData" :headers="typeHeader"/>
          </div>
        </section>
</template>
<script>
    export default {
        name : "newcategory",
        emits : ["addTypes", "fetchType", "renderForm"],
        data(){
            return {
                name : ""
            }
        },
        created(){
            this.$emit("addTypes")
        },
        methods : {
            async handleSubmitAddType(){
                try {
                    this.$emit('addTypes', {
                        name : this.name
                    }) 
                } catch (err) {
                    console.log(err);
                }
            },

            async renderEditForm(value, id){
                this.$emit('renderForm', value, id)
            },
        }
        
    }
</script>

<template>
    <section class="newcategory-container" id="new-category-section">
          <div class="div-product">
            <div class="form-addtype">
              <form @submit.prevent="handleSubmitAddType" action="" class="login-form" id="category-form">
                <h1>New Type</h1>
                <p>Name</p>
                <input v-model="name" type="text" class="input-form" placeholder="input name...">
                <div class="button-container">
                  <button @click="renderEditForm('types')" class="cancel-button">Cancel</button>
                  <button class="submit-button">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </section>
</template>
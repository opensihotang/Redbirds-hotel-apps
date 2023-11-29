<script>
export default {
    name: "lodgingform",
    emits: ["addLodging", "renderForm", "fetchLodging", "editLodgingData"],
    props: ["typeData", "formMode", "lodgingById"],
    data() {
        return {
            name: "",
            facility: "",
            roomCapacity: "",
            imgUrl: "",
            location: "",
            price: "",
            typeId: "",
            username: "",
            role: ""
        }
    },
    created() {
        if (this.lodgingById) {
            this.populateFormFields();
        }
        this.$emit("fetchLodging")
    },
    methods: {
        async handleSubmitAddLodging() {
            try {
                if (this.formMode === "addLodgingForm" && !this.lodgingById) {
                    this.$emit("addLodging", {
                        name: this.name,
                        facility: this.facility,
                        roomCapacity: this.roomCapacity,
                        imgUrl: this.imgUrl,
                        location: this.location,
                        price: this.price,
                        typeId: this.typeId,
                    });
                } else {
                    this.$emit("editLodgingData", {
                        id: this.lodgingById.id,
                        name: this.name,
                        facility: this.facility,
                        roomCapacity: this.roomCapacity,
                        imgUrl: this.imgUrl,
                        location: this.location,
                        price: this.price,
                        typeId: this.typeId,
                        username: this.lodgingById.User.username,
                        role: this.lodgingById.User.role
                    });
                    this.clearForm()
                }
            } catch (err) {
                console.log(err);
            }
        },
        populateFormFields() {
            this.name = this.lodgingById.name;
            this.facility = this.lodgingById.facility;
            this.roomCapacity = this.lodgingById.roomCapacity;
            this.imgUrl = this.lodgingById.imgUrl;
            this.location = this.lodgingById.location;
            this.price = this.lodgingById.price;
            this.typeId = this.lodgingById.typeId;
        },
        renderCancel(value) {
            this.$emit("renderForm", value);
        },
        clearForm() {
            this.name = "";
            this.facility = "";
            this.roomCapacity = "";
            this.imgUrl = "";
            this.location = "";
            this.price = "";
            this.typeId = "";
            this.username = "";
            this.role = "";
        },
    }
}
</script>

<template>
    <section class="newproduct-container" id="new-product-section">
        <div class="div-product">
            <div class="form-addproduct">
                <form @submit.prevent="handleSubmitAddLodging" action="" class="login-form" id="product-form">
                    <h1>Form Lodging</h1>
                    <p>Name</p>
                    <input v-model="name" type="text" class="input-form" placeholder="input name...">
                    <p>Type</p>
                    <select v-model="typeId" name="" id="" class="input-form">
                        <option value="" selected disabled hidden class="input-form">--select type--</option>
                        <option v-for="data in typeData" :key="data.id" :value="data.id" class="input-form">{{ data.name }}
                        </option>
                    </select>
                    <p>Facility</p>
                    <input v-model="facility" type="text" class="input-form" placeholder="input facility...">
                    <p>Room Capacity</p>
                    <input v-model="roomCapacity" type="number" class="input-form" placeholder="input room capacity...">
                    <p>Price</p>
                    <input v-model="price" type="number" class="input-form" placeholder="input price...">
                    <p>Image</p>
                    <input v-model="imgUrl" type="text" class="input-form" placeholder="input image...">
                    <p>Location</p>
                    <input v-model="location" type="text" class="input-form" placeholder="input location...">
                    <div class="button-container">
                        <button @click="renderCancel('lodgings')"  class="cancel-button">Cancel</button>
                        <button class="submit-button">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
import { RouterLink } from "vue-router"
import { mapActions, mapState } from "pinia";
import { useLodgingStore } from "../stores/counter";

    export default{
        data(){
            return{
                username : "",
                email : "",
                password : "",
                phoneNumber : "",
                address : ""
            }
        },
        methods : {
            ...mapActions(useLodgingStore, ['registerCustomer']),

            async handleRegister(){
                console.log('masuk register');
                const payload = {
                    username : this.username,
                    email : this.email,
                    password : this.password,
                    phoneNumber : this.phoneNumber,
                    password : this.password
                }
               await this.registerCustomer(payload)
               this.$router.push('/login')
            }
        }
    }
</script>
<template>
    <div class="register-form" style="">
        <div>
            <h4>Register</h4>
        </div>
        <form @submit.prevent="handleRegister">
            <div class="mb-3 w-100">
                <label for="exampleFormControlInput1" class="form-label">Username</label>
                <input v-model="username" type="text" class="form-control" placeholder="input username" required>
            </div>
            <div class="mb-3 w-100">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                <input v-model="email" type="email" class="form-control" placeholder="input email" required>
            </div>
            <div class="mb-3 w-100">
                <label for="exampleFormControlInput1" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" placeholder="input password" required>
            </div>
            <div class="mb-3 w-100">
                <label for="exampleFormControlInput1" class="form-label">Phone Number</label>
                <input v-model="phoneNumber" type="text" class="form-control" placeholder="input phone number" required>
            </div>
            <div class="mb-3 w-100">
                <label for="exampleFormControlInput1" class="form-label">Address</label>
                <input v-model="address" type="text" class="form-control" placeholder="input address" required>
            </div>
            <div>
                <button type="submit" class="btn btn-primary"> Sign Up </button>
            </div>
        </form>
        <div>
            Already have account ? <RouterLink to="/login">Login Here</RouterLink>
        </div>
    </div>
</template>
<script>
    export default {
        name : 'registerpage',
        emits : ["handleRegister"],

        data(){
            return {
                username : "",
                email : "",
                password : "",
                phoneNumber : "",
                address : ""
            }
        },
        methods : {
            async handleSubmitRegister(){
                this.$emit("handleRegister", {
                    username : this.username,
                    email : this.email,
                    password : this.password,
                    phoneNumber : this.phoneNumber,
                    address : this.address
                })
            }
        }
    }
</script>

<template>
    <section class="login-container" id="register-section">
      <div class="div-login">
        <div class="form-login">
          <form @submit.prevent="handleSubmitRegister" action="" class="login-form" id="register-form">
            <h3>Register and enjoy</h3>
            <p>Username</p>
            <input v-model="username" type="text" class="input-form" placeholder="input username...">
            <p>Email</p>
            <input v-model="email" type="text" class="input-form" placeholder="input email...">
            <p>Password</p>
            <input v-model="password" type="password" class="input-form" placeholder="input password...">
            <p>Phone Number</p>
            <input v-model="phoneNumber" type="text" class="input-form" placeholder="input phone number...">
            <p>Address</p>
            <input v-model="address" type="text" class="input-form" placeholder="input address...">
            <div class="button"><button>Sign Up</button></div>
          </form>
        </div>
      </div>
    </section>
</template>
<script>
import { RouterLink } from "vue-router"
import { mapActions, mapState } from "pinia";
import { useLodgingStore } from "../stores/counter"
import {GoogleLogin} from "vue3-google-login"
export default {
    data() {
        name: "Login"
        return {
            email: "",
            password: ""
        }
    },
    components: {
        RouterLink
    },
    computed: {
        // ...mapState(useLodgingStore, ['isLoggedIn'])
    },
    methods: {
        ...mapActions(useLodgingStore, ['loginCustomer', 'customerGoogleLogin']),

        async handleLogin() {
            const payload = { email: this.email, password: this.password };
            const loginSucces = await this.loginCustomer(payload);

            if(loginSucces){
                this.$router.push("/");
            }
        },

        async handleGoogleLogin(response) {
            await this.customerGoogleLogin(response)
            this.$router.push('/')
        },
        created() {
        }
    }
}
</script>

<template>
    <div class="login-form" style="">
        <div>
            <h4>Login</h4>
        </div>
        <form @submit.prevent="handleLogin">
            <div class="mb-3 w-100">
                <label for="email-login" class="form-label">Email address</label>
                <input v-model="email" type="email" class="form-control" placeholder="username" required>
            </div>
            <div class="mb-3 w-100">
                <label for="password-login" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" placeholder="username" required>
            </div>
            <div>
                <button type="submit" class="btn btn-primary">Sign in</button>
            </div>
        </form>
        <div>
            Need an account ? <RouterLink to="/register">Register Here</RouterLink>
        </div>
        <div> Or sign in with : </div>
        <div id="buttonDiv" class="google-sign">
            <GoogleLogin :callback="handleGoogleLogin" />
        </div>
    </div>
</template>
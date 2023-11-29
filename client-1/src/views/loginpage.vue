<script>
  import {GoogleLogin} from "vue3-google-login"
    export default {
        name : "loginpage",
        emits : ["renderForm", "handleLogin", "handlegoogleLogin"], 
        data(){
          return {
            email : "",
            password : ""
          }
          
        },
        methods : {
          async renderRegisterPage(value){
            this.$emit("renderForm", value)
          },
          
          async handleSubmitLogin(){
            this.$emit("handleLogin", this.email, this.password)
          },
          handleSubmitGoogleLogin(response){
            this.$emit("handlegoogleLogin", response)
          }
        }
    }
</script>

<template>
<section class="login-container" id="login-section">
      <div class="div-login">
        <div class="form-login">
          <form @submit.prevent="handleSubmitLogin" action="" class="login-form" id="login-form">
            <h3>Log in to your account</h3>
            <p>Email</p>
            <input v-model="email" type="text" class="input-form" placeholder="input email...">
            <p>Password</p>
            <input v-model="password" type="password" class="input-form" placeholder="input password...">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="login-remember" />
              <label class="form-check-label" for="login-remember">
                Remember me
              </label>
            </div>
            <div class="button"><button>Log In</button></div>
            <p>Need an Account ?</p>
            <div @click="renderRegisterPage('register')" class=" button"><button>Register Now</button>
            </div>
            <div>
              <p>Or Sign In With :</p>
            </div>
            <div id="buttonDiv" class="google-sign">
              <GoogleLogin :callback="handleSubmitGoogleLogin"/>
            </div>
          </form>
        </div>
      </div>
    </section>
</template>
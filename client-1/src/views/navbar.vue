<script>
    export default {
        name : "navbar",
        emits : ["renderForm", "handleLogout", "showLogoutConfirmation"],

        data(){
            return {
            
            }
        },
        methods : {
            handlePage(value){
                this.$emit("renderForm", value)
            },

            handleExecuteLogout(){
                // console.log("ini dari sini");
                this.$emit("showLogoutConfirmation")
            }
        }
    }
</script>

<template>
    <section id="home-section">
      <div class="home">
        <nav  class="navbar" id="navbar">
          <a href="">Admin Panel</a>
          <ul>
            <li><a href="" @click.prevent="handlePage('dashboard')">Dashboard</a></li>
            <li><a href="" @click.prevent="handlePage('lodgings')">Lodgings</a></li>
            <li><a href="" @click.prevent="handlePage('types')">Types</a></li>
            <li><a href="" @click.prevent="handlePage('logs')">Logs</a></li>
            <li><a href="" @click.prevent="handlePage('userpage')">User</a></li>
            <li><a href="" @click="handleExecuteLogout">Logout</a></li>
          </ul>
        </nav>
      </div>
    </section>
</template>
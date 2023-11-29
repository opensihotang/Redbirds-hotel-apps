<script>
import navbar from "./views/navbar.vue";
import loginpage from "./views/loginpage.vue";
import registerpage from "./views/registerpage.vue";
import dashboardpage from "./views/dashboardpage.vue";
import lodgingspage from "./views/lodgingspage.vue";
import typespage from "./views/typespage.vue";
import lodgingform from "./components/lodgingform.vue";
import newcategory from "./views/newcategory.vue";
import logspage from "./views/logspage.vue";
import axios from "axios";
import 'vue-toast-notification/dist/theme-bootstrap.css';
import userpage from "./views/userpage.vue"

const baseUrl = 'http://localhost:3000'

export default {
  data() {
    return {
      currentpage: "login",
      lodgingsData: [],
      typeData: [],
      logsData: [],
      totalLodgings: 0,
      totalType: 0,
      formCondition: "addLodgingForm",
      lodgingById: "",
      userDetail : ""
    }
  },
  components: { navbar, loginpage, registerpage, dashboardpage, lodgingspage, lodgingform, typespage, newcategory, logspage, userpage },

  created() {
    if (localStorage.getItem("access_token")) {
      this.currentpage = "dashboard"
      this.fetchLodging()
      this.fetchType()
      this.fetchLogs()
      this.fetchLoggedInUser()
    } else {
      this.currentpage = "login"
    }
  },
  mounted() {
  },

  methods: {
    showSuccessToast(msg) {
      this.$toast.success(msg, {
        duration: 3000,
        position: "top-right"
      })
    },

    showErrorToast(msg) {
      this.$toast.error(msg, {
        duration: 3000,
        position: "top-right"
      })
    },

    showLogoutConfirmation() {
      if (window.confirm('Apakah Anda yakin ingin keluar?')) {
        this.handleLogout();
      }
    },

    async renderForm(value, id) {
      if (id) {
        await this.getLodgingById(id)
      }
      this.currentpage = value
    },

    async handleLogin(email, password) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/login`,
          data: {
            email: email,
            password: password
          }
        })
        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("role", data.role)
        localStorage.setItem("username", data.username)
        localStorage.setItem("id", data.id)
        this.showSuccessToast(`Wellcome ${data.username}`)
        this.currentpage = "dashboard"
        await this.fetchLoggedInUser()
      } catch (err) {
        this.showErrorToast(err.response.data.message)
      }
    },
    async handlegoogleLogin(response) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/google-login`,
          headers: {
            google_token: response.credential
          }
        })
        localStorage.setItem("access_token", data.access_token)
        localStorage.setItem("role", data.role)
        localStorage.setItem("username", data.username)
        localStorage.setItem("id", data.id)
        this.currentpage = "dashboard"
        await this.fetchLoggedInUser()
        this.showSuccessToast(`Wellcome ${data.username}`)

      } catch (err) {
        this.showErrorToast(err.response.data.message)
        console.log(err);
      }
    },

    async handleLogout() {
      try {
        localStorage.removeItem("access_token")
        localStorage.removeItem("role", data.role)
        localStorage.removeItem("username", data.username)
      } catch (err) {
        console.log(err);
      }
    },

    async handleRegister(registerData) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/register`,
          data: registerData
        })
        localStorage.setItem("access_token", data.access_token)
        this.currentpage = "login"
        this.showSuccessToast(`Create account success`)
      } catch (err) {
        err.response.data.message.errors.forEach(el => {
          this.showErrorToast(el)
        })
      }
    },

    async fetchLodging() {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/lodgings`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        this.lodgingsData = data.lodgings.map(el => ({
          id: el.id,
          name: el.name,
          facility: el.facility,
          roomCapacity: el.roomCapacity,
          imgUrl: el.imgUrl,
          authorId: el.User.username,
          location: el.location,
          price: el.price,
          typeId: el.Type.name,
          status: el.status
        }));
        this.totalLodgings = data.lodgings.length
      } catch (err) {

      }
    },

    async getLodgingById(id) {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/lodgings/${id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        this.lodgingById = data.lodging
      } catch (err) {

      }
    },

    async fetchType() {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/types`,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        this.typeData = data.types.map(el => ({
          id: el.id,
          name: el.name
        }))
        this.totalType = data.types.length
      } catch (err) {
        console.log(err);
      }
    },

    async fetchLogs() {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/histories`,
          headers: { access_token: localStorage.getItem("access_token") }
        })
        this.logsData = data.histories.map((el) => {
          const formattedCreatedAt = new Date(el.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          return {
            id: el.id,
            name: el.name,
            description: el.description,
            createdAt: formattedCreatedAt,
            updatedBy: el.updatedBy,
          };
        });
      } catch (err) {

      }
    },

    async addTypes(typeData) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/types`,
          data: typeData,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        this.currentpage = "types"
        this.fetchType()
      } catch (err) {

      }
    },

    async addLodging(dataLodging) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/lodgings`,
          data: dataLodging,
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        await this.fetchLogs()
        await this.fetchLodging()
        this.currentpage = "lodgings"
      } catch (err) {
        console.log(err);
        err.response.data.message.errors.forEach(el => {
          this.showErrorToast(el)
        })
      }
    },

    async editLodgingData(editedData) {
      try {
        const { data } = await axios({
          method: "PUT",
          url: `${baseUrl}/lodgings/${editedData.id}`,
          data: {
            ...editedData,
            username: editedData.username,
            role: editedData.role
          },
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        await this.fetchLogs()
        await this.fetchLodging();
        this.showSuccessToast("Edited Succesfully")
        this.currentpage = "lodgings"
      } catch (err) {
        err.response.data.message.errors.forEach(el => {
          this.showErrorToast(el)
        })
      }
    },

    async updateStatusLodging(idStatus) {
      try {
        const { id, status } = idStatus
        const { data } = await axios({
          method: "PATCH",
          url: `${baseUrl}/lodgings/${id}`,
          data: { newstatus: status },
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        await this.fetchLogs()
        this.showSuccessToast("Edited Succesfully")
        this.currentpage = "lodgings"
      } catch (err) {
        this.showErrorToast(err.response.data.message)
        console.log(err);
      }
    },
    async fetchLoggedInUser() {
      try {
        const id = localStorage.getItem("id");
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/users/${id}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.userDetail = data.user;
      } catch (err) {
        console.log(err);
      }
    }
  }
}

</script>
<template>
  <navbar v-if="currentpage !== 'login' && currentpage !== 'register'" @renderForm="renderForm"
    @handleLogout="handleLogout" @showLogoutConfirmation="showLogoutConfirmation" />

  <loginpage v-if="currentpage === 'login'" @renderForm="renderForm" @handleLogin="handleLogin"
    @handlegoogleLogin="handlegoogleLogin" />

  <registerpage v-if="currentpage === 'register'" @handleRegister="handleRegister" />

  <dashboardpage v-if="currentpage === 'dashboard'" :totalLodgings="totalLodgings" :totalType="totalType"
    @fetchLodging="fetchLodging" @fetchType="fetchType" />

  <lodgingspage v-if="currentpage === 'lodgings'" @fetchLodging="fetchLodging" :lodgingsDataFeth="lodgingsData"
    @renderForm="renderForm" @updateStatusLodging="updateStatusLodging" />

  <lodgingform v-if="currentpage === 'newlodging'" @addLodging="addLodging" :formMode="formCondition" :typeData="typeData"
    @renderForm="renderForm" @editLodgingData="editLodgingData" :lodgingById="lodgingById" />

  <typespage v-if="currentpage === 'types'" @fetchType="fetchType" :typeData="typeData" @renderForm="renderForm" />

  <newcategory v-if="currentpage === 'newtype'" @addTypes="addTypes" @renderForm="renderForm" />

  <logspage v-if="currentpage === 'logs'" @fetchLogs="fetchLogs" :logsData="logsData" />

  <userpage v-if="currentpage === 'userpage'" :userDetail="userDetail" />
</template>


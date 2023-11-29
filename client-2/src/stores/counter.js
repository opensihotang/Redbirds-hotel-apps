import { defineStore } from "pinia";
import axios from "axios";
const baseUrl = "http://localhost:3000";
import Swal from 'sweetalert2'

export const useLodgingStore = defineStore("counter", {
  state: () => {
    return {
      lodgings: [],
      detailLodging: {},
      isLoggedIn: "" || localStorage.getItem("access_token") ? true : false,
      types: [],
      currentPage: 1,
      totalPage: 1,
      bookmarks: [],
      qrCode: '',
      urlQrCode: ''

    };
  },
  actions: {
    async loginCustomer(payload) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/login`,
          data: payload,
        });
        const access_token = data.access_token;
        this.isLoggedIn = true;
        localStorage.setItem("access_token", access_token);
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Login Success',
          showConfirmButton: false,
          timer: 2000
        })
        return true;
      } catch (err) {
        let msg = err.response.data.message
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: msg,
        });
      }
    },

    async customerGoogleLogin(response) {
      try {
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/customers/googlelogin`,
          headers: {
            google_token: response.credential,
          },
        });
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);
        localStorage.setItem("id", data.id);
        this.isLoggedIn = true;
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Login Success',
          showConfirmButton: false,
          timer: 2000
        })
      } catch (err) {
        let msg = err.response.data.message
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: msg,
        });
      }
    },

    async logoutCustomer(){
      const isConfirmed = await Swal.fire({
        icon: 'warning',
        title: 'Logout',
        text: 'Are you sure you want to logout?',
        showCancelButton: true,
        confirmButtonText: 'Yes, logout',
        cancelButtonText: 'Cancel'
      });
      if (isConfirmed.isConfirmed){
        localStorage.clear()
        this.isLoggedIn = false
      }
    },

    async registerCustomer(payload) {
      console.log(payload);
      try {
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/customers/register`,
          data: payload,
        });
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Register Success',
          showConfirmButton: false,
          timer: 2000
        })
      } catch (err) {
        console.log(err);
      }
    },

    async fetchLodging(filterType = null, searchLocation = null, page = 1) {
      try {
        let url = `${baseUrl}/customers/lodgings`;

        let reqQuery = [];
        if (filterType) {
          reqQuery.push(`filterType=${filterType}`);
        }
        if (searchLocation) {
          reqQuery.push(`searchLocation=${searchLocation}`);
        }
        if (page) {
          reqQuery.push(`page=${page}`);
        }
        if (reqQuery.length > 0) {
          url = `${url}?${reqQuery.join("&")}`;
        }
        console.log(url);
        const { data } = await axios({
          method: "GET",
          url: url,
        });
        this.lodgings = data.data;
        this.currentPage = data.currentPage;
        this.totalPage = data.totalPage;
      } catch (err) {
        console.log(err);
      }
    },

    async fetchDetailLodging(id) {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/customers/lodgings/${id}`,
        });
        this.detailLodging = data.lodging;

        // console.log(this.detailLodging.id, "ini detail");
        this.urlQrCode = `http://localhost:5173/lodging/${data.lodging.id}`
        await this.generateQrCode()
      } catch (err) {
        console.log(err);
      }
    },

    async fetchType() {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/customers/types`,
        });
        this.types = data.types.map((el) => ({
          id: el.id,
          name: el.name,
        }));
      } catch (err) {}
    },

    async fetchBoomarks() {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/bookmarks`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.bookmarks = data.bookmarks.map((el) => el.Lodging);
        console.log(this.bookmarks, "mappedbookk");
      } catch (err) {
        console.log(err);
      }
    },

    async postBookmark(lodgingId) {
      console.log(lodgingId, "ini di counter");
      try {
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/bookmarks/${lodgingId}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 2000
        })
      } catch (err) {
        let message = err.response.data.message
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${message}`
        })
      }
    },

    async deleteBoomark(lodgingId) {
      try {
        const { data } = await axios({
          method: "DELETE",
          url: `${baseUrl}/bookmarks/${lodgingId}`,
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 2000
        })
      } catch (err) {
        console.log(err, "ini error bookmark");
      }
    },

    async generateQrCode(){
      const qr_code_text = this.urlQrCode
      // console.log(qr_code_text, "ini textttt");
      // console.log(this.urlQrCode, 'ini url qr code');
      try {
        const { data } = await axios({
          method : "POST",
          url : `${baseUrl}/generate-qr`,
          data : {qr_code_text}
        })
        this.qrCode = data
      } catch (err) {
        console.log(err, "error qr");
      }
    }
  },
});

<script>
    export default{
        name : "userpage",
        props : ["userDetail"],
        emits : [""],
        data() {
            return {
                
            }
        },
        methods : {
           
        }
    }
</script>

<template>
     <div class="userdetail">
    <h1>User Detail</h1>
    <div class="user-details">
      <div class="detail-row">
        <p class="detail-label">Username:</p>
        <p class="detail-value">{{ userDetail.username }}</p>
      </div>
      <div class="detail-row">
        <p class="detail-label">Email:</p>
        <p class="detail-value">{{ userDetail.email }}</p>
      </div>
      <div class="detail-row">
        <p class="detail-label">Role:</p>
        <p class="detail-value">{{ userDetail.role }}</p>
      </div>
      <div class="detail-row">
        <p class="detail-label">Phone Number:</p>
        <p class="detail-value">{{ userDetail.phoneNumber }}</p>
      </div>
      <div class="detail-row">
        <p class="detail-label">Address:</p>
        <p class="detail-value">{{ userDetail.address }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.userdetail {
  display: flex;
  justify-content: center; 
  flex-direction: column;
  align-items: center; 
  height: 100vh;
  padding: 50px;
}

.user-details {
  background-color: #141313;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 310px;
  border: 1px solid wheat;
}

.detail-row {
  display: flex;
  /* justify-content: */
  align-items: center;
  margin-bottom: 10px;
}

.detail-label {
  font-weight: bold;
}

.detail-value {
  margin-left: 10px;
}

h1 {
    font-size: 24px;
    margin-bottom: 20px; /* Adjust as needed */
    border-bottom: 2px solid wheat;
    }                               
</style>
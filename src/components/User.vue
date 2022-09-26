<template>
  <div v-if="nouser" class="dropdown">
    <div class="user" id="a">
      <img src="../assets/user3.svg" alt="">
      <p>{{ username }}</p>
    </div>
    <div class="dropdown-content" id="b">
      <div v-if="admin" @click="useredit" class="drop-option">Edit Users</div>
      <div @click="logout" class="drop-option">Logout</div>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from "@/stores/UserStore";
import {onMounted, ref} from "vue";
import router from "@/routers.js";
import {storeToRefs} from "pinia";

const res = useUserStore();

const reactiveprops = storeToRefs(res)
const nouser = reactiveprops.user

//ADMIN
const admin = reactiveprops.admin
res.checkAdmin();
console.log(admin.value)
// ADMIN


if (localStorage.getItem("userinfo")) {
  res.yesUser()
} else {
  res.noUser()
}


const useredit = () => {
  router.push({path: '/useredit'})
}

const logout = () => {
  localStorage.clear();
  res.noUser();
  router.push({path: '/'})
}

let username = JSON.parse(localStorage.getItem("userinfo"));
</script>

<!--<script>-->
<!--export default {-->
<!--  name: "User"-->
<!--}-->
<!--</script>-->

<style scoped>
.user {
  min-width: 205px;
  padding-bottom: 0px;
  text-align: center;
  font-size: 17px;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  border-radius: 4px 4px 0px 0px;
  float: right;
  overflow: hidden;
  color: #22d09b;
}

.user img {
  margin-left: 10px;
  float: left;
  margin-right: 10px;
  margin-top: 12px;
  width: 30px;
  height: 30px;
}

.user p {
  width: 80px;
  padding-left: 2px;
  margin-left: 0px;
  padding-right: 0px;
}

.user p:hover {
  color: #232122;
}


.user:hover {
  background: #22d09b;
  color: #232122;
}

/*drop-down menu*/
.dropdown {
  padding: 0;
  margin-right: 30px;
  float: right;
  z-index: 3;
  position: relative;
  display: inline-block;
}


.drop-option {
  padding: 15px 10px 15px 10px;
  min-width: 164px;
  text-align: center;
  cursor: pointer;
  margin: 0;
}

.drop-option:hover {
  background-color: #74faca;
}

.dropdown-content {
  border-radius: 0 0 4px 4px;
  z-index: 3;
  margin-top: 60px;
  display: none;
  position: relative;
  background-color: #22d09b;
  width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}


.dropdown-content a:hover + .user {
  background-color: #74faca;
  border-radius: 0 0 4px 4px;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}
</style>
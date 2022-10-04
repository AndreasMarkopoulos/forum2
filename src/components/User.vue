<template>
  <div v-if="nouser" class="dropdown">
    <div v-if="isLoaded" class="user" id="a" @mouseover="chbg1" @mouseleave="chbg2">
      <img :src="profPic ? profPic : '/src/assets/avatars/default_avatar.svg'" alt="">
      <p>{{ currentUser }}</p>
    </div>
    <div class="dropdown-content" id="b" @mouseover="chbg1" @mouseleave="chbg2">
      <div @click="toProfile" class="drop-option">Profile</div>
      <div @click="toEditProfile" class="drop-option">My Account</div>
      <div v-if="admin" @click="useredit" class="drop-option">Edit Users</div>
      <div @click="logout" class="drop-option">Logout</div>

    </div>
  </div>
</template>

<script setup>
import {useUserStore} from "@/stores/UserStore";
import {onBeforeMount, onMounted, ref, watch} from "vue";
import router from "@/routers.js";
import {storeToRefs} from "pinia";
import axios from "axios";
import {useRoute} from "vue-router";

function chbg1() {
  document.getElementById('a').style.backgroundColor = '#22d09b';
  document.getElementById('a').style.color = '#232122';
}

function chbg2() {
  document.getElementById('a').style.backgroundColor = '#232122';
  document.getElementById('a').style.color = '#22d09b';
}

const isLoaded = ref(false)
const store = useUserStore()
const currentUserId = ref()
const res = useUserStore();
const profPic = ref(store.profilePic);
const reactiveprops = storeToRefs(res)
const nouser = reactiveprops.user
const currentUser = ref()
let username = JSON.parse(localStorage.getItem("userinfo"));
onMounted(async () => {
  if (username) {
    let res = await axios.get(`http://localhost:3000/user?username=${username}`);
    // profPic.value = res.data[0].pic
    currentUserId.value = res.data[0].id
    store.setUsername(username)
    store.setProfilePic(res.data[0].pic)
    currentUser.value = store.username;
    profPic.value = store.profilePic;
    isLoaded.value = true;
  }
})

//ADMIN
const admin = reactiveprops.admin
res.checkAdmin();
// ADMIN

watch(store.$state, (profilePic) => {
  profPic.value = store.profilePic
  currentUser.value = store.username
}, {deep: true})


const toProfile = () => {
  let profileId = currentUserId.value;
  localStorage.setItem('selectedProf', JSON.stringify(profileId));
  router.push({path: '/profile'})
  if (router.currentRoute.value.name == 'Profile') {
    location.reload()
  }
}

const toEditProfile = () => {
  router.push({path: '/editprofile'})
}

const useredit = () => {
  router.push({path: '/useredit'})
}

const logout = () => {
  localStorage.removeItem('userinfo');
  res.noUser();
  router.push({name: 'Homepage'})
  location.reload()
}


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


/*.dropdown-content a:hover + .user {*/
/*  background-color: #74faca;*/
/*  border-radius: 0 0 4px 4px;*/
/*}*/

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}
</style>
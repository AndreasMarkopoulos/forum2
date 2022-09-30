<template>
  <navbar/>
  <sidebar/>
  <div class="postarea">
    <div class="user">
      <img class="profpic" :src="Pic" alt="">
      <h1>{{ user }}</h1>
      <h2 class="followers">{{ followers }} Followers</h2>
      <img src="/src/assets/settings2.svg" v-if="selProf===myId" @click="toEditProfile"
           alt=""
           class="settings">
    </div>
    <img class="editdesc" src="/src/assets/edit.svg" v-if="selProf===myId" @click="toEditProfile">
    <div class="desc">{{ desc }}</div>
    <label for="desc">Description</label>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import router from "@/routers";
import {useUserStore} from "@/stores/UserStore";

const myId = ref();
const Id = ref();
const Pic = ref();
const user = ref('');
const desc = ref()
const followers = ref()
const selProf = ref()

onMounted(async () => {
  selProf.value = localStorage.getItem('selectedProf')
  await dataIn(JSON.parse(selProf.value));
})

const dataIn = async (id) => {
  let myUsername = JSON.parse(localStorage.getItem('userinfo'));
  myId.value = (await axios.get(`http://localhost:3000/user?username=${myUsername}`)).data[0].id
  let res = await axios.get(`http://localhost:3000/user/${id}`);
  user.value = res.data.username
  Id.value = res.data.id
  Pic.value = res.data.pic
  followers.value = res.data.followers
  desc.value = res.data.description
  selProf.value = JSON.parse(selProf.value)
  window.scrollTo(0, 0);
}

const toEditProfile = () => {
  router.push({path: '/editprofile'})
}

</script>

<script>
import navbar from "@/components/Navbar.vue";
import sidebar from "@/components/Sidebar.vue";

export default {
  name: "Profile"
}
</script>


<style scoped>

.editdesc {
  cursor: pointer;
  position: absolute;
  margin-left: 178px;
  margin-top: 165px;
  width: 20px;
  height: 20px;
}

.followers {
  font-size: 15px;
  font-weight: 200;
  color: #22d09b;
  margin-left: 142px;
  margin-top: 75px;
  position: absolute;
}

label {
  font-size: 20px;
  color: #22d09b;
  position: absolute;
  left: 50px;
  top: 235px;
}

.tandp {
  color: #a19f9f;
  margin-left: 5px;
  font-size: 18px;
  padding: 5px 25px;
  margin-bottom: 20px;
  border: none;
  border-radius: 43px;
  background: #232122;
  box-shadow: inset 8px 8px 16px #1a191a,
  inset -8px -8px 16px #2c292b;
  width: 95%;
  min-height: 30px;
  height: fit-content;
}

.desc {
  top: 280px;
  position: absolute;
  color: #a19f9f;
  left: 40px;
  resize: none;
  font-size: 16px;
  padding: 10px;
  background: #232122;
  border-bottom: 2px solid #2b2a2b;
  border-color: #2b2a2b;
  width: 90%;
  min-height: 240px;
  height: fit-content;
}

.settings {
  background-color: #232122;
  padding: 5px;
  border-radius: 30px;
  cursor: pointer;
  width: 30px;
  position: absolute;
  left: 155px;
  margin-top: 0;
}

.user {
  border-bottom: 2px solid #2b2a2b;
  display: flex;
  height: 120px;
  width: 70%;
  margin-left: 80px;

}

.user h1 {
  letter-spacing: 1px;
  position: absolute;
  left: 220px;
  margin-top: 30px;
  color: #22d09b;
}

.profpic {
  height: 100px;
}

.button-1 {
  top: 570px;
  position: absolute;
  font-family: 'poppins', sans-serif;
  font-size: 13px;
  text-decoration: none;
  cursor: pointer;
  margin-left: 50px;
  background-color: rgb(0, 0, 0, 0);
  border: 2px solid #22d09b;
  color: #22d09b;
  border-radius: 18px;
  padding: 6px 16px;
  letter-spacing: 1px;
  -webkit-box-shadow: 0px 0px 42px 4px rgba(45, 255, 196, 0.79);
  -moz-box-shadow: 0px 0px 42px 4px rgba(45, 255, 196, 0.5);
  box-shadow: 0px 0px 12px 4px rgba(45, 255, 196, 0.1);
}

.img {
  border: 5px solid #232122;
  float: left;
  height: 50px;
  cursor: pointer;
}

.usrnm {
  margin-top: 25px;
  display: inline-flex;
  align-items: center;
  width: 60px;
  height: 150px;
}

.usrnm input {

  margin-left: 50px;
  min-width: 300px;
  padding: 10px;
  border-radius: 3px;
  display: block;
  color: #a19f9f;
  font-family: 'poppins', sans-serif;
  letter-spacing: 1px;
  font-weight: 500;
  font-size: 15px;
  background-color: #2b2a2b;
  border: none;
}

.img:hover {
  border: 3px solid #22d09b;
  border-radius: 30px;
}

.title2 {
  margin-top: 25px;
  margin-left: 85px;
  width: 200px;
  color: #22d09b;
}

.title1 {
  margin-top: 225px;
  margin-left: 20px;
  width: 200px;
  color: #22d09b;
}

.profpics {
  margin-top: 225px;
  display: grid;
  align-items: center;
  width: 60px;
  height: 150px;

}

.postarea {
  padding-top: 75px;
  display: flex;
  position: absolute;
  background-color: #232122;;
  margin-top: 60px;
  width: 85%;
  right: 0;
  min-height: 100%;
}
</style>
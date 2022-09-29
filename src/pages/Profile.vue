<template>
  <navbar/>
  <sidebar/>
  <div class="postarea">
    <div class="usrnm">
      <h1 class="title2">Change Username</h1>
      <input type="text" v-model="user">
      <div class="button-1" @click="changeUsr">Change</div>
    </div>

    <h1 class="title1">Change Profile Picture</h1>
    <div @click="changeImg(imgId)" class="profpics" v-for="(img,imgId) in images" :key=imgId alt="">
      <img :src="img" class="img">
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import axios from "axios";

const myId = ref();
const user = ref('');
user.value = JSON.parse(localStorage.getItem('userinfo'));
onMounted(async () => {
  let res = await axios.get(`http://localhost:3000/user?username=${user.value}`);
  myId.value = res.data[0].id
})


const images = reactive([])
for (let i = 0; i < 14; i++) {
  images.push(`/src/assets/avatars/avatar (${i}).svg`)
}

const changeUsr = async () => {
  if (user) {
    console.log(user.value)
    let usr = await axios.patch(`http://localhost:3000/user/${myId.value}`, {username: user.value});
    localStorage.clear()
    localStorage.setItem('userinfo', JSON.stringify(user.value))
    location.reload()
  }

}

const changeImg = async (id) => {
  console.log(id)
  let newpic = `/src/assets/avatars/avatar (${id}).svg`
  await axios.patch(`http://localhost:3000/user/${myId.value}`, {pic: newpic});
  location.reload()
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

.button-1 {

  font-family: 'poppins', sans-serif;
  font-size: 13px;
  text-decoration: none;
  cursor: pointer;
  margin-left: 20px;
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
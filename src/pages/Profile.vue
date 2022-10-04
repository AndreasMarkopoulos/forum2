<template>
  <div class="page">
    <Navbar/>
    <Sidebar/>
    <div class="postarea">
      <div class="user">
        <img class="profpic" :src="Pic" alt="">
        <h1>{{ user }}</h1>
        <h2 class="followers">{{ followers }} Followers</h2>
        <img src="/src/assets/settings2.svg" v-if="selProf===myId" @click="toEditProfile"
             alt=""
             class="settings">
      </div>
      <img v-if="selProf===myId" class="editdesc" src="/src/assets/edit.svg" @click="toEditProfile">
      <div class="desc">{{ desc }}</div>
      <label for="desc">Description</label>
      <div class="posts">
        <post v-if="editing" :eId="editingId" @done="doneEditing"/>
        <ul class="post" v-for="mypost in myposts.slice().reverse()" :key="mypost.id">
          <div class="post-info">
            <img v-if="selProf===myId" @click="delPost(mypost.id)" src="../assets/delete.svg" alt="" class="del-post">
            <img v-if="selProf===myId" @click="editEnable(mypost.id)" src="../assets/edit.svg" alt="" class="edit-post">
            <img :src="pic ? pic : '/src/assets/avatars/default_avatar.svg'" alt="" class="user-img">
            <h2 class="usern">{{ username }}</h2>
            <h3 class="date">{{ mypost.date }}</h3>
          </div>
          <div class="content">
            <h1 class="p-title">{{ mypost.title }}</h1>
            <p class="p-text">{{ mypost.content }}</p>
          </div>
        </ul>
      </div>
    </div>
  </div>

</template>

<script setup>
import Newpost from "../components/Newpost.vue";
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import Post from "@/components/Post.vue";
import router from "@/routers";

const myId = ref();
const Id = ref();
const Pic = ref();
const user = ref('');
const desc = ref()
const followers = ref()
const selProf = ref()
const userId = ref()

onMounted(async () => {
  selProf.value = localStorage.getItem('selectedProf')
  await dataIn(JSON.parse(selProf.value));
  await myPostDataIn();
})
const editing = ref(false)
const editingId = ref(Number);
const ispic = ref(false)
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


const doneEditing = () => {
  editing.value = false;
  myPostDataIn();
}

const toEditProfile = () => {
  router.push({path: '/editprofile'})
}

const delPost = async (id) => {
  let result = await axios.delete("http://localhost:3000/posts/" + id);
  if (result.status == 200) {
    await myPostDataIn();
  }
}

const editEnable = (id) => {
  editingId.value = id;
  editing.value = !editing.value
}

const pic = ref();
const username = ref("")
const myposts = ref([]);
const myPostDataIn = async () => {
  myposts.value.splice(null, myposts.value.length)
  userId.value = JSON.parse(localStorage.getItem('selectedProf'));
  let result = await axios.get('http://localhost:3000/posts/');
  for (let i = 0; i < result.data.length; i++) {
    if (result.data[i].user === userId.value) {
      myposts.value.push(result.data[i]);
    }
  }
  let usern = await axios.get(`http://localhost:3000/user/${userId.value}`);
  pic.value = usern.data.pic;


}

</script>

<script>

export default {
  name: "UserPosts",
  components: {},

}
</script>

<style scoped>

.posts {
  background-color: #232122;
  height: fit-content;
  padding-left: 290px;
  top: 500px;
  position: absolute;
  width: 100%;
}

.postarea {
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #232122;;
  margin-top: 60px;
  margin-left: 5px;
  width: 85%;
  right: 0;
  min-height: 100%;
  height: 100vh;
}

.p-text {
  font-weight: 200;

}


.content {
  color: #a19f9f;
  margin-top: 35px;
}


.editdesc {
  cursor: pointer;
  position: absolute;
  z-index: 2;
  top: 252px;
  left: 240px;
  width: 16px;
  height: 16px;
}

.followers {
  font-size: 15px;
  font-weight: 200;
  color: #22d09b;
  margin-left: 136px;
  margin-top: 75px;
  position: absolute;
}

label {
  padding-top: 10px;
  font-size: 20px;
  color: #22d09b;
  position: absolute;
  left: 115px;
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
  left: 105px;
  resize: none;
  font-size: 16px;
  padding: 10px;
  background: #232122;
  /*border-bottom: 2px solid #2b2a2b;*/
  width: 89%;
  min-height: 100px;
  height: fit-content;
}

.settings {
  background-color: #232122;
  padding: 5px;
  border-radius: 30px;
  cursor: pointer;
  width: 30px;
  position: absolute;
  left: 75px;
  margin-top: 0;
}

.user {
  top: 110px;
  position: absolute;
  border-bottom: 2px solid #2b2a2b;
  display: flex;
  height: 120px;
  width: 90%;
  margin-left: 40px;

}

.user h1 {
  letter-spacing: 1px;
  position: absolute;
  left: 135px;
  margin-top: 30px;
  color: #22d09b;
}

.profpic {
  height: 100px;
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


.p-title {
  font-size: 20px;
  font-weight: 600;
  color: #cccccc;
}

.post-info {
  display: flex;
}

.usern {
  font-size: 15px;
  position: absolute;
  top: 17px;
  font-weight: 500;
  left: 70px;
}


.date {
  color: lightgrey;
  font-size: 13px;
  position: absolute;
  left: 70px;
  top: 37px;
  font-weight: 200;

}


.edit-post {
  cursor: pointer;
  position: absolute;
  right: 35px;
  width: 23px;
  height: 23px;
}

.del-post {
  cursor: pointer;
  position: absolute;
  right: 0;
  width: 23px;
  height: 23px;
}

.user-img {
  width: 55px;
  height: 55px;
}

h2 {
  text-transform: capitalize;
}

.post {
  text-decoration: none;
  overflow: hidden;
  letter-spacing: 1px;
  padding: 20px 0 20px 0;
  color: white;
  font-family: 'poppins', sans-serif;
  position: relative;
  background-color: #232122;
  width: 80%;
  right: 0px;
  height: fit-content;
  border-bottom: 2px solid #2b2a2b;
}
</style>
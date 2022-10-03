<template>
  <div class="page">
    <Navbar/>
    <Sidebar/>
    <div class="postarea">
      <newpost v-if="!editing" @done="doneEditing"/>
      <post v-if="editing" :eId="editingId" @done="doneEditing"/>
      <ul class="post" v-for="mypost in myposts.slice().reverse()" :key="mypost.id">
        <div class="post-info">
          <img @click="delPost(mypost.id)" src="../assets/delete.svg" alt="" class="del-post">
          <img @click="editEnable(mypost.id)" src="../assets/edit.svg" alt="" class="edit-post">
          <img :src="pic ? pic : '/src/assets/avatars/default_avatar.svg'" alt="" class="user-img">
          <h2 class="user">{{ username }}</h2>
          <h3 class="date">{{ mypost.date }}</h3>
        </div>
        <div class="content">
          <h1 class="p-title">{{ mypost.title }}</h1>
          <p class="p-text">{{ mypost.content }}</p>
        </div>
      </ul>
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


onMounted(async () => {
  await myPostDataIn();
})
const editing = ref(false)
const editingId = ref(Number);
const ispic = ref(false)


const doneEditing = () => {
  editing.value = false;
  myPostDataIn();
}

const delPost = async (id) => {
  let result = await axios.delete("http://localhost:3000/posts/" + id);
  if (result.status == 200) {
    await myPostDataIn();
  }
}

const editEnable = (id) => {
  editingId.value = id;
  editing.value = !editing.value;
}

const pic = ref();
const username = ref("")
const myposts = ref([]);
const myPostDataIn = async () => {
  myposts.value.splice(null, myposts.value.length)
  let usr = localStorage.getItem('userinfo');
  username.value = JSON.parse(usr);
  let uid = (await axios.get(`http://localhost:3000/user?username=${username.value}`)).data[0].id
  let result = await axios.get('http://localhost:3000/posts/');
  for (let i = 0; i < result.data.length; i++)
    if (result.data[i].user === uid) {
      myposts.value.push(result.data[i]);
    }

  let usern = await axios.get(`http://localhost:3000/user?username=${username.value}`);
  pic.value = usern.data[0].pic;


}

</script>

<script>

export default {
  name: "Myposts",
  components: {},

}
</script>

<style scoped>


.postarea {
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #232122;;
  margin-top: 0px;
  margin-left: 5px;
  width: 85%;
  right: 0;
  min-height: 100%;
}

.p-text {
  font-weight: 200;

}


.content {
  color: #a19f9f;
  margin-top: 35px;
}


label {
  font-size: 20px;
  color: #22d09b;
  position: absolute;
  left: 50px;
  top: 235px;
}


.user {
  display: flex;
  height: 80px;
  width: 70%;
  margin-left: 70px;

}

.user h1 {
  letter-spacing: 1px;
  position: absolute;
  left: 220px;
  margin-top: 30px;
  color: #22d09b;
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

.user {
  font-size: 15px;
  position: absolute;
  top: 17px;
  font-weight: 500;
  left: 0px;
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

.posts {
  width: 100%;
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
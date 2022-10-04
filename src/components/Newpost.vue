<template>
  <div class="post">
    <h2>Make a new post :</h2>
    <input v-model="title" class="tandp" type="text" id="Title" placeholder="Title (min: 2 characters)"><br>
    <textarea v-model="content"
              placeholder="Write your post... (min: 10 characters)"></textarea><br>
    <button class="button-1" @click="submitPost">Post</button>


  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const title = ref('')
const content = ref('')
const user = JSON.parse(localStorage.getItem("userinfo"));
const emit = defineEmits(['done'])


const submitPost = async () => {
  let username = JSON.parse(localStorage.getItem('userinfo'));
  let user = await axios.get(`http://localhost:3000/user?username=${username}`);
  let date = new Date().toLocaleDateString();
  let edited = {user: user.data[0].id, title: title.value, content: content.value, date}
  await axios.post("http://localhost:3000/posts/", edited);
  title.value = '';
  content.value = '';
  emit('done');
}

</script>


<script>
export default {
  name: "Newpost",
}
</script>

<style scoped>

textarea:focus {
  color: #a19f9f;

  outline: none !important;
}

.tandp:focus {

  outline: none !important;
}

h2 {
  margin-left: 20px;
  color: #22d09b;
}


.button-1 {

  font-family: 'poppins', sans-serif;
  font-size: 13px;
  text-decoration: none;
  position: absolute;
  cursor: pointer;
  bottom: 6px;
  left: 55px;
  transform: translateX(-50%);
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


textarea {
  color: #a19f9f;
  float: left;
  resize: none;
  font-size: 16px;
  margin-bottom: 30px;
  padding: 25px;
  border-radius: 43px;
  background: #232122;
  box-shadow: inset 8px 8px 16px #1a191a,
  inset -8px -8px 16px #2c292b;
  border-color: #2b2a2b;
  width: 96%;
  min-height: 250px;
  height: fit-content;
}

.post {
  background-color: white;

  margin-top: 50px;
  border-radius: 5px;
  margin-bottom: 30px;
}

.button-1:hover {
  background-color: #22d09b;
  color: #232122;
  box-shadow: 0px 0px 12px 4px rgba(45, 255, 196, 0.3);
}
</style>
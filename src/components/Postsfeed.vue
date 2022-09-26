<template>
  <div class="postarea">
    <ul class="post" v-for="post in posts.slice().reverse()" :key="post.id">
      <div class="post-info">
        <img src="" class="del-post" alt="">
        <img :src="post.pic" alt="" class="user-img">

        <h2 class="user">{{ post.user }}</h2>
        <h3 class="date">{{ post.date }}</h3>
      </div>
      <div class="content">
        <h1 class="p-title">{{ post.title }}</h1>
        <p class="p-text">{{ post.content }}</p>

      </div>
    </ul>

  </div>

</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

onMounted(() => {
  dataIn();
})
const posts = ref([]);

const dataIn = async () => {
  let result = await axios.get('http://localhost:3000/posts/');
  posts.value = result.data;

}

</script>

<script>
import Post from "./Post.vue"

export default {
  name: "Postsfeed",
  components: {
    Post
  }
}
</script>

<style scoped>
.postarea {
  padding-top: 75px;
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
}

.p-text {
  font-weight: 200;

}

.content {
  color: #a19f9f;
  margin-top: 35px;
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
<template>
  <navbar/>
  <sidebar/>
  <div class="postarea">
    <ul class="post" v-for="post in posts.slice().reverse()" :key="post.id">
      <div class="posts" v-if="usersMap.get(post.user).uid!=myId && followIcon[post.id]=='/src/assets/following.svg'">
        <div class="post-info">
          <img src="" class="del-post" alt="">
          <img :src="usersMap.get(post.user) ? usersMap.get(post.user).pic : '/src/assets/avatars/image-default.png'"
               alt="" class="user-img">
          <img v-if="nouser && usersMap.get(post.user).uid!=myId" @click="follow(usersMap.get(post.user).uid,post.id)"
               class="follow"
               :src="followIcon[post.id]"
               alt="">
          <h2 class="user">{{ usersMap.get(post.user)?.username }} </h2>
          <h3 class="date">{{ post.date }}</h3>
        </div>
        <div class="content">
          <h1 class="p-title">{{ post.title }}</h1>
          <p class="p-text">{{ post.content }}</p>

        </div>
      </div>
    </ul>

  </div>

</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import {useUserStore} from "@/stores/UserStore";
import {storeToRefs} from "pinia";


onMounted(() => {
  dataIn()

})

const nouser = ref();

let following = reactive([]);
const posts = ref([]);
const followIcon = reactive([])
const usersMap = reactive(new Map())
const myId = ref();

const follow = async (id, postId) => {
  if (!following.includes(id)) {
    following.push(id)
    followIcon[postId] = '/src/assets/following.svg';

  } else {
    for (let i = following.length - 1; i >= 0; i--) {
      if (following[i] === id) {
        following.splice(i, 1);
      }
    }
    followIcon[postId] = '/src/assets/follow.svg'
  }
  await axios.patch(`http://localhost:3000/user/${myId.value}`, {following})

}

const dataIn = async () => {
  if (localStorage.getItem('userinfo')) {
    nouser.value = true;
  } else nouser.value = false;

  let username = JSON.parse(localStorage.getItem('userinfo'));

  if (username) {
    let usr = await axios.get(`http://localhost:3000/user?username=${username}`);
    myId.value = JSON.stringify(usr.data[0].id)
    following = usr.data[0].following
  }
  let result = await axios.get('http://localhost:3000/posts/');
  posts.value = result.data
  for (const post of posts.value) {
    const userId = post.user;
    if (!usersMap.has(userId)) {
      const user = (await axios.get(`http://localhost:3000/user/${userId}`)).data;
      usersMap.set(user.id,
          {
            uid: user.id,
            username: user.username,
            pic: user.pic
          })
    }
  }
  for (const post of posts.value) {

    if (following.includes(usersMap.get(post.user).uid)) {
      followIcon[post.id] = '/src/assets/following.svg';
    } else {
      followIcon[post.id] = '/src/assets/follow.svg';
    }
  }
}


</script>

<script>
import sidebar from "/src/components/Sidebar.vue";
import navbar from "/src/components/Navbar.vue";
import Post from "/src/components/Post.vue"

export default {
  name: "Postsfeed",
  components: {
    Post
  }
}
</script>

<style scoped>

.posts {
  border-bottom: 2px solid #2b2a2b;
}

.follow {
  cursor: pointer;
  position: absolute;
  left: 43px;
  height: 20px;
  width: 20px;
}

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

}
</style>
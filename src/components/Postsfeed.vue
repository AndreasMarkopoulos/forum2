<template>
  <div class="postarea">
    <ul class="post" v-for="post in posts.slice().reverse()" :key="post.id">
      <div class="post-info">
        <img src="" class="del-post" alt="">
        <img @click="goToProfile(usersMap.get(post.user).uid)"
             :src="usersMap.get(post.user) ? usersMap.get(post.user).pic : '/src/assets/avatars/default_avatar.svg'"
             alt="" class="user-img">
        <img v-if="userIsLogged && usersMap.get(post.user)?.uid != myId"
             @click="follow(usersMap.get(post.user).uid,post.id)"
             class="follow"
             :src="followIcon[post.id] ? followIcon[post.id] : '/src/assets/avatars/default_follow.svg' "
             alt="">
        <h2 class="user">{{ usersMap.get(post.user)?.username }} </h2>
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
import {onMounted, reactive, ref, watch, watchEffect} from "vue";
import axios from "axios";
import {useUserStore} from "@/stores/UserStore";
import {storeToRefs} from "pinia";
import router from "@/routers";
import {useRoute} from "vue-router";

onMounted(() => {
  dataIn()

})
const route = useRoute()

watch(() => route.query, () => {
  dataIn()
})


const userIsLogged = ref();
const search = ref();
let following = reactive([]);
const posts = ref([]);
const followIcon = reactive([])
const usersMap = reactive(new Map())
const myId = ref();
let allPosts = reactive([])
let foundId = reactive([])


const goToProfile = (profileId) => {
  localStorage.setItem('selectedProf', JSON.stringify(profileId));
  router.push({path: "/profile"})
}


const follow = async (id, postId) => {
  if (!following.includes(id)) {
    following.push(id)
    let UpdatedFollowers = (await axios.get(`http://localhost:3000/user/${id}`)).data.followers
    UpdatedFollowers += 1
    await axios.patch(`http://localhost:3000/user/${id}`, {followers: UpdatedFollowers})

    followIcon[postId] = '/src/assets/following.svg';

  } else {
    let UpdatedFollowers = (await axios.get(`http://localhost:3000/user/${id}`)).data.followers
    UpdatedFollowers -= 1
    await axios.patch(`http://localhost:3000/user/${id}`, {followers: UpdatedFollowers})

    for (let i = following.length - 1; i >= 0; i--) {
      if (following[i] === id) {
        following.splice(i, 1);
      }
    }
    followIcon[postId] = '/src/assets/follow.svg'
  }
  await axios.patch(`http://localhost:3000/user/${myId.value}`, {following})
  await dataIn()
}

const dataIn = async () => {
  posts.value = [];
  if (route.query.search) {
    const searchItem = ref(route.query.search)
    search.value = searchItem.value
    allPosts = (await axios.get(`http://localhost:3000/posts`)).data
    for (let i = 0; i < allPosts.length; i++) {
      let lowercase = allPosts[i].content.toLowerCase()
      if (lowercase.match(`${searchItem.value.toLowerCase()}`)) {
        foundId.push(i)
        posts.value.push(allPosts[i])
      }
    }

  } else {
    let result = await axios.get('http://localhost:3000/posts/');
    posts.value = result.data
  }

  if (localStorage.getItem('userinfo')) {
    userIsLogged.value = true;
  } else userIsLogged.value = false;

  let username = JSON.parse(localStorage.getItem('userinfo'));

  if (username) {
    let usr = await axios.get(`http://localhost:3000/user?username=${username}`);
    myId.value = JSON.stringify(usr.data[0].id)
    following = usr.data[0].following
  }

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
import Post from "./Post.vue"

export default {
  name: "Postsfeed",
  components: {
    Post
  }
}
</script>

<style scoped>

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
  cursor: pointer;
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
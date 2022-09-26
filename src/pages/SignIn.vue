<template>
  <Sidebar/>
  <div class="bg-nonav container">
    <div class="si-box">
      <h1>Sign In</h1>
      <input placeholder="Username" v-model="username" type="text"/>
      <input placeholder="Password" v-model="password" type="password">
      <div v-if="error" class="error-msg">Wrong username or password</div>
      <div @click="login" class="sub-btn">Sign in</div>
      <router-link class="go-signup" to="/signup">Sign up</router-link>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from "@/stores/UserStore";
import axios from 'axios';
import {ref, defineProps} from "vue";
import {useRouter, useRoute} from 'vue-router'

const error = ref(false);
const nouser = useUserStore();
const router = useRouter()
const route = useRoute()

let usr = defineProps({
  username: String,
  password: String,
})

const login = async () => {
  let res = await axios.get(`http://localhost:3000/user?username=${usr.username}`);
  const users = res.data;

  if (users.length === 0) {
    error.value = true;
    nouser.noUser();
    return;
  }
  const user = users[0];

  if (user.password === usr.password) {
    nouser.yesUser();
    localStorage.setItem("userinfo", JSON.stringify(usr.username));
    await router.push('/')
  } else {
    error.value = true;
    nouser.noUser();
  }
}


</script>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "SignIn",
  components: {Navbar, Sidebar}
}
</script>

<style scoped>

.error-msg {
  color: indianred;
  padding: 20px 0 20px 0;
  text-align: center;
}

input:focus {
  outline: 1px solid #22d09b;

}


.go-signup {
  bottom: 30px;
  text-underline-offset: 3px;
  text-decoration: underline;
  color: #22d09b;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10%;
  margin-bottom: 0;
  font-weight: 200;
  font-size: 15px;
  letter-spacing: 1px;
  position: absolute;
}

.sub-btn {
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  font-family: 'poppins', sans-serif;
  font-size: 15px;
  text-decoration: none;
  cursor: pointer;
  background-color: #22d09b;
  color: #232122;
  border-radius: 18px;
  padding: 12px 32px;
  letter-spacing: 1px;
  -webkit-box-shadow: 0px 0px 42px 4px rgba(45, 255, 196, 0.79);
  -moz-box-shadow: 0px 0px 42px 4px rgba(45, 255, 196, 0.5);
  box-shadow: 0px 0px 12px 4px rgba(45, 255, 196, 0.1);
}

.si-box {
  border-radius: 22px;
  position: absolute;
  width: 30%;
  height: fit-content;
  padding-bottom: 0px;
  min-width: 500px;
  min-height: 500px;
  background: #232122;
  box-shadow: 14px 14px 28px #161516,
  -14px -14px 28px #302d2e;
}

.container input {
  color: white;
  font-family: 'poppins', sans-serif;
  letter-spacing: 1px;
  border-radius: 3px;
  margin: 65px auto 0 auto;
  min-width: 350px;
  display: block;
  padding: 18px;
  background-color: #2b2a2b;
  border: none;
}

.container h1 {
  font-weight: 500;
  margin-bottom: 50px;
  text-align: center;
  top: 10%;
  z-index: 1;
  color: #22d09b;
  font-size: 40px;
}

.container {
  padding-top: 0;
}
</style>
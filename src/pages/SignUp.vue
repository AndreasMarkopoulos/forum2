<template>
  <Sidebar/>
  <div class="bg-nonav container">
    <div class="si-box">
      <h1>Create an account!</h1>
      <input placeholder="Username" v-model="username" type="text"/>
      <input placeholder="Email" v-model="email" type="email"/>
      <input placeholder="Password" v-model="password" type="password">
      <button class="sub-btn" @click="signUp">Sign up</button>
      <router-link class="go-signup" to="/signin">Sign in</router-link>
    </div>
  </div>
</template>


<script setup>
import axios from "axios";
import router from "@/routers.js";
import {defineProps, ref} from "vue";


let usr = defineProps({
  username: String,
  password: String,
  email: String
})
const signUp = async () => {
  let res = await axios.post("http://localhost:3000/user", {
    username: usr.username,
    email: usr.email,
    password: usr.password,
    admin: false,
    followers: 0,
    following: [],
    description: '',
    pic: "/src/assets/user1.svg"
  });
  if (res.status === 201) {
    localStorage.setItem("userinfo", JSON.stringify(usr.username));
    await router.push({path: '/'});
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

input:focus {
  outline: 1px solid #22d09b;

}

.go-signup {
  text-underline-offset: 3px;
  text-decoration: underline;
  color: #22d09b;
  left: 50%;
  transform: translateX(-50%);
  margin: 10% auto;
  font-weight: 200;
  font-size: 15px;
  letter-spacing: 1px;
  position: absolute;
}

.sub-btn {
  border: none;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
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
  padding-bottom: 60px;
  min-width: 500px;
  min-height: 500px;
  height: fit-content;
  background: #232122;
  box-shadow: 14px 14px 28px #161516,
  -14px -14px 28px #302d2e;
}

.container input {
  color: white;
  font-family: 'poppins', sans-serif;
  letter-spacing: 1px;
  border-radius: 3px;
  margin: 0 auto 45px auto;
  min-width: 350px;
  display: block;
  padding: 18px;
  background-color: #2b2a2b;
  border: none;
}

.container h1 {
  font-weight: 500;
  margin-bottom: 10%;
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
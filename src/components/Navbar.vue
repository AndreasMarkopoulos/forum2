<template>
  <div class="nav">
    <!--    <div class="logo">O</div>-->
    <div>
      <img class="search-icon" src="../assets/search.svg" alt="">
      <input type="text" class="search" placeholder="Search here..."/>
    </div>
    <router-link v-if="!nouser" to="/signin" class="sign-in">Sign In</router-link>
    <router-link v-if="nouser" to="/myposts" class="new-p">New Post</router-link>
    <user/>


  </div>
</template>

<script setup>
import user from "@/components/User.vue";
import {useUserStore} from "@/stores/UserStore";
import {ref} from "vue";
import {storeToRefs} from "pinia";

const emit = defineEmits(['newpost'])


const res = useUserStore();
if (localStorage.getItem("userinfo")) {
  res.yesUser()
} else {
  res.noUser()
}
const reactiveprops = storeToRefs(res)
const nouser = reactiveprops.user
const logout = () => {
  localStorage.clear();
  res.noUser();
}
</script>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>

.logout {
  font-family: 'poppins', sans-serif;
  font-size: 13px;
  text-decoration: none;
  position: absolute;
  cursor: pointer;
  top: 25%;
  right: 130px;
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

.search-icon {
  width: 17px;
  height: 17px;
  top: 38%;
  z-index: 3;
  left: 17.5%;
  position: absolute;
  filter: invert(65%);
  transform: scaleX(-1);
}

.logo {
  font-family: 'poppins';
  cursor: pointer;
  overflow: hidden;
  margin: 10px 0 0 30px;
  color: #232122;
  position: absolute;
  font-size: 45px;
  font-weight: bolder;
  text-align: center;
  height: 40px;
  width: 40px;
  left: 4%;
  background-color: #22d09b;
  border-radius: 30px;
  -webkit-box-shadow: 0px 0px 42px 4px rgba(45, 255, 196, 0.79);
  -moz-box-shadow: 0px 0px 42px 4px rgba(45, 255, 196, 0.5);
  box-shadow: 0px 0px 12px 4px rgba(45, 255, 196, 0.2);
}

/*.navbar-so{*/
/*  position: absolute;*/
/*  left: 100px;*/
/*}*/

::placeholder {
  color: white;
  opacity: 0.7;
  font-family: 'poppins', sans-serif;
  letter-spacing: 1px;
}

.sign-in {
  font-family: 'poppins', sans-serif;
  font-size: 13px;
  text-decoration: none;
  position: absolute;
  cursor: pointer;
  top: 25%;
  right: 30px;
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

.new-p {
  font-family: 'poppins', sans-serif;
  font-size: 13px;
  text-decoration: none;
  position: absolute;
  cursor: pointer;
  top: 35%;
  right: 300px;
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

.sign-in:hover {
  background-color: #22d09b;
  color: #232122;
  box-shadow: 0px 0px 12px 4px rgba(45, 255, 196, 0.3);
}

.search {

  color: white;
  background-color: #232122;
  border-radius: 20px;
  border: none;
  padding: 10px 0px 10px 30px;
  position: absolute;
  left: 17%;
  top: 25%;

}

.search:before {
  content: "../assets/search.svg";
}

input:hover {
  padding: 8px 0px 8px 28px;
  border: 2px solid #22d09b80 !important;
  -webkit-box-shadow: 0px 0px 42px 4px rgba(45, 255, 196, 0.79);
  -moz-box-shadow: 0px 0px 42px 4px rgba(45, 255, 196, 0.79);
  box-shadow: 0px 0px 5px 4px inset rgba(45, 255, 196, 0.1);
}

input:focus {
  outline: none !important;
  border: 2px solid #22d09b !important;
  border-radius: 20px;
  padding: 8px 148px 8px 28px;
  -webkit-box-shadow: 0px 0px 42px 4px rgba(45, 255, 196, 0.79);
  -moz-box-shadow: 0px 0px 42px 4px rgba(45, 255, 196, 0.79);
  box-shadow: 0px 0px 5px 4px inset rgba(45, 255, 196, 0.1);
  animation: 0.1s linear 1ms expand;
}

@keyframes expand {
  0% {
    padding-right: 30px;
  }
  25% {
    padding-right: 60px;
  }
  50% {
    padding-right: 90px;
  }
  75% {
    padding-right: 120px;
  }
  100% {
    padding-right: 148px;
  }
}

.nav {
  padding-top: 15px;
  z-index: 1;
  position: fixed;
  top: 0px;
  left: 0px;
  background-color: #232122;
  width: 100%;
  height: 60px;
  /*border-bottom: 3px solid #2b2a2b;*/
}

</style>
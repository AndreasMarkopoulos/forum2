<template>
  <div class="nav">
    <div v-if="currRoute=='Homepage'|| currRoute=='SearchResults'">
      <img class="search-icon" src="../assets/search.svg" alt="">
      <input @keyup.enter="search" v-model="searchInput" type="text" class="search"
             placeholder="Search here..."/>
    </div>
    <router-link v-if="!userIsLogged" to="/signin" class="sign-in">Sign In</router-link>
    <router-link v-if="userIsLogged" to="/userposts" class="new-p">New Post</router-link>
    <user/>


  </div>
</template>

<script setup>
import user from "@/components/User.vue";
import {useUserStore} from "@/stores/UserStore";
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import router from "@/routers";

const searchInput = ref('')

const search = async () => {
  await router.push({query: {search: `${searchInput.value}`}})
}


const currRoute = ref(router.currentRoute.value.name)
const store = useUserStore();
if (localStorage.getItem("userinfo")) {
  store.yesUser()
} else {
  store.userIsLogged()
}
const reactiveprops = storeToRefs(store)
const userIsLogged = reactiveprops.user
</script>

<style scoped>

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

.new-p:hover {
  background-color: #22d09b;
  color: #232122;
  box-shadow: 0px 0px 12px 4px rgba(45, 255, 196, 0.3);
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

input {
  width: 148px;
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
  padding: 8px 28px 8px 28px;
  width: 296px;
  -webkit-box-shadow: 0px 0px 42px 4px rgba(45, 255, 196, 0.79);
  -moz-box-shadow: 0px 0px 42px 4px rgba(45, 255, 196, 0.79);
  box-shadow: 0px 0px 5px 4px inset rgba(45, 255, 196, 0.1);
  animation: 0.1s linear 1ms expand;
}

@keyframes expand {
  0% {
    width: 178px;
  }
  25% {
    width: 205px;
  }
  50% {
    width: 238px;
  }
  75% {
    width: 268px;
  }
  100% {
    width: 296px;
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
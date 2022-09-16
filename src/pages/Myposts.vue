<template>
  <Navbar/>
  <Sidebar/>
  <div class="bg">
    {{ username }}
  </div>
</template>


<script setup>
import {ref} from "vue";

const username = ref('');
let user = localStorage.getItem("userinfo");
username.value = JSON.parse(user);
</script>

<script>
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "Myposts",
  components: {Navbar, Sidebar}
}
</script>

<style scoped>

</style>
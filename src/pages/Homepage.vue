<template>
  <div class="page">
    <Navbar/>
    <Sidebar/>
    <Postsfeed/>
  </div>

</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import Postsfeed from "../components/Postsfeed.vue";

export default {
  name: 'Homepage',
  components: {
    Sidebar,
    Navbar,
    Postsfeed
  }
}
</script>


<style scoped>

@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

.bg {
  background-color: #232122;
  min-height: 100vh;
  min-width: 100vw;
  max-width: 100%;
  max-height: 100%;
}

.page {
  display: flex;
}


</style>

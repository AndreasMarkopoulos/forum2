<template>
  <div class="postarea">
    <post/>
    <post/>
    <Post/>
    <Post/>
    <Post/>

  </div>

</template>

<script>
import Post from "./post.vue"

export default {
  name: "postsfeed",
  components: {
    Post
  }
}
</script>

<style scoped>
.postarea{
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
}
</style>
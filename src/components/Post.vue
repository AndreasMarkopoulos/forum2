<template>
  <div class="post">
    <div class="post-info">
      <img src="../assets/user2.svg" alt="" class="user-img">
      <h2 class="user">Maria Petropoulou</h2>
      <h3 class="date">3 days ago</h3>
    </div>
    <div class="content">
      <h1 class="p-title">Ethereum will use less energy now that it’s proof-of-stake</h1>
      <p class="p-text">Ethereum, the second-largest cryptocurrency, has switched to proof-of-stake, cutting its energy
        demands. The transition, which has been in the works since 2016, won’t change much for the average Ethereum
        user, but it sidelines miners.The switchover began on September 6th, when the Bellatrix upgrade was activated.
        It is now complete after the mining of the Terminal Total Difficulty block, which triggered the Paris upgrade.
        The technical part is done; now, we get to see what happens.</p>

    </div>
  </div>
</template>

<script>
export default {
  name: "Post"
}
</script>

<style scoped>

.p-text {

  font-weight: 200;

}

.content {
  margin-top: 35px;
}

.p-title {
  font-size: 20px;
  font-weight: normal;
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

.post {

  letter-spacing: 1px;
  padding: 20px 0 20px 0;
  color: white;
  font-family: 'poppins', sans-serif;
  position: relative;
  background-color: #232122;
  width: 80%;
  right: 0px;
  height: 300px;
  border-bottom: 2px solid #2b2a2b;
}

</style>
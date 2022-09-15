<template>
  <div class="sidebar">
    <div class="logo">O</div>
    <ul class="options">
      <router-link id="subheader" to="/">Posts</router-link>
      <router-link to="/homepage" id="subheader" href="">My Posts</router-link>
      <router-link id="subheader" href="">New Post</router-link>
      <router-link id="subheader" href="">Explore</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name:'sidebar'
}
</script>

<style scoped>

.active { background-color:white; }
/* to override the existing css for "a" tag */
#subheader.active { color: #fff; }


.options{
  overflow: hidden;
  padding: 100px 0 0 0;
  margin: 0;
  flex-basis: 100%;
}
.logo{
  cursor: pointer;
  user-select: none;
  font-family: 'Poppins';
  text-align: center;
  font-weight: bolder;
  font-size: 70px;
  color: #232122;
  top: 15px;
  position: absolute;
  background: #20d19b;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  /*overflow: hidden;*/
  /*-webkit-box-shadow:0px 0px 42px 4px rgba(45,255,196,0.79);*/
  /*-moz-box-shadow: 0px 0px 42px 4px rgba(45,255,196,0.5);*/
  /*box-shadow: 0px 0px 12px 4px rgba(45,255,196,0.2);*/
}
.sidebar{
  background-color:#232122;;
  display: flex;
  justify-content: center;
  font-family: 'poppins',sans-serif;
  z-index: 3;
  border-right:2px solid #2b2a2b;
  width: 15%;
  height: 100vh;
  position: fixed;
}

#subheader.active{
  background-color: red;
}

#subheader{
  cursor: pointer;
  display: inline-block;
  border: 1px solid #232122;
  text-decoration: none;
  color: white;
  width:100%;
  padding: 14px 0 14px 0;
  text-align: center;
  margin: 7px 0;
  left: 0px;
}
#subheader:hover{
  cursor: pointer;
  border-right: 2px solid #2b2a2b;
  background-color: rgba(45,255,196,0.59);
  /*-webkit-box-shadow:0px 0px 105px 45px #2b2a2b;*/
  /*-moz-box-shadow: 0px 0px 105px 45px #2b2a2b;*/
  /*box-shadow: 0px 8px 10px -7px #2b2a2b inset , 0px -10px 8px -7px #2b2a2b inset;*/
  box-shadow: rgba(0, 0, 0, 0.8) 0px 13px 13px -15px inset, rgba(0, 0, 0, 0.8) 0px -13px 13px -15px inset ;
}


</style>
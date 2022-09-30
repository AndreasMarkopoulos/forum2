<template>
  <navbar/>
  <sidebar/>
  <div class="postarea">
    <table class="users">
      <tr class="tableTitles">
        <td>Id</td>
        <td>Username</td>
        <td>Email</td>
        <td>Is admin</td>
        <td>Actions</td>
      </tr>
      <tr v-for="item in users" :key="item.id">
        <td class="id">{{ item.id }}</td>
        <td>{{ item.username }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.admin }}</td>
        <td class="actions">
          <button class="action-button" id="del" @click="delUser(item.id)">Ban user</button>
          <button class="action-button" id="demote" @click="demote(item.id)">Demote admin</button>
          <button class="action-button" id="promote" @click="makeAdmin(item.id)">Make admin</button>
        </td>
      </tr>

    </table>
  </div>
</template>

<script setup>

import axios from "axios";
import {onMounted, ref} from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";

const users = ref([]);

onMounted(() => {
  dataIn();
})

const dataIn = async () => {
  let result = await axios.get('http://localhost:3000/user/');
  users.value = result.data;
}

const makeAdmin = async (id) => {
  let result = await axios.patch("http://localhost:3000/user/" + id, {admin: 'true'});
  await dataIn();
}
const demote = async (id) => {
  let result = await axios.patch("http://localhost:3000/user/" + id, {admin: 'false'});
  await dataIn();

}
const delUser = async (id) => {
  let usr = await axios.get("http://localhost:3000/user/" + id);
  await axios.delete("http://localhost:3000/user/" + id);
  const userPosts = (await axios.get(`http://localhost:3000/posts?user=${usr.data.username}`)).data;
  userPosts.forEach(post => {
    axios.delete(`http://localhost:3000/posts/${post.id}`);
  })
  await dataIn();
}
</script>


<script>
export default {
  name: "UserEdit"
}
</script>

<style scoped>

.id {
  width: 20px !important;
}

#del {
  background-color: indianred;
}

#demote {
  background-color: indianred;
}

#promote {
  background-color: #22d09b;

}

.action-button {
  cursor: pointer;
  border-radius: 4px;
  width: 100px;
  border: none;
  padding: 5px;
  margin-left: 20px;
}

.actions {
  justify-content: center;
  display: flex;
}

h4 {
  margin-right: 20px;
}

td {

  padding: 5px 25px;
  color: #a19f9f;
  background-color: #2b2a2b;
}

.users {
  width: 60vw;
  color: #a19f9f;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
  margin-top: 100px;
}

.postarea {
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #232122;;
  margin-top: 0px;
  margin-left: 5px;
  width: 85%;
  right: 0;
  min-height: 100%;
}
</style>
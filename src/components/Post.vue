<template>
  <div class="post">
    <h2>Edit your post :</h2>
    <input v-model="editTitle" class="tandp" type="text" id="Title" placeholder="Title (min: 2 characters)"><br>
    <textarea v-model="editContent"
              placeholder="Write your post... (min: 10 characters)"></textarea><br>
    <button class="button-1" @click="submitChanges">Submit Changes</button>
    <button class="button-2" @click="cancelChanges">Cancel</button>

  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

const props = defineProps({
  eId: {
    type: Number,
    required: false
  }
})
const editTitle = ref('')
const editContent = ref('')
const editingId = ref('')

onMounted(async () => {
  const post = await axios.get(`http://localhost:3000/posts/${props.eId}`)
  editingId.value = props.eId;
  editTitle.value = post.data.title;
  editContent.value = post.data.content;
})
const emit = defineEmits(['done'])

const cancelChanges = () => {
  emit('done');
}

const submitChanges = async () => {
  let edited = {title: editTitle.value, content: editContent.value}
  let result = await axios.patch("http://localhost:3000/posts/" + props.eId, edited);
  if (result.status == 200) {
    emit('done');
  }
}

</script>


<script>
export default {
  name: "Post",
}
</script>

<style scoped>

textarea:focus {
  color: #a19f9f;

  outline: none !important;
}

.tandp:focus {

  outline: none !important;
}

h2 {
  margin-left: 20px;
  color: #22d09b;
}

.button-2 {
  font-family: 'poppins', sans-serif;
  font-size: 13px;
  text-decoration: none;
  position: absolute;
  cursor: pointer;
  bottom: 6px;
  left: 240px;
  transform: translateX(-50%);
  background-color: rgb(0, 0, 0, 0);
  border: 2px solid indianred;
  color: indianred;
  border-radius: 18px;
  padding: 6px 16px;
  letter-spacing: 1px;
  -webkit-box-shadow: 0px 0px 42px 4px rgba(205, 92, 92, 0.79);
  -moz-box-shadow: 0px 0px 42px 4px rgba(205, 92, 92, 0.5);
  box-shadow: 0px 0px 12px 4px rgba(205, 92, 92, 0.1);
}

.button-1 {

  font-family: 'poppins', sans-serif;
  font-size: 13px;
  text-decoration: none;
  position: absolute;
  cursor: pointer;
  bottom: 6px;
  left: 95px;
  transform: translateX(-50%);
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

.tandp {
  color: #a19f9f;
  margin-left: 5px;
  font-size: 18px;
  padding: 5px 25px;
  margin-bottom: 20px;
  border: none;
  border-radius: 43px;
  background: #232122;
  box-shadow: inset 8px 8px 16px #1a191a,
  inset -8px -8px 16px #2c292b;

  width: 95%;
  min-height: 30px;
  height: fit-content;
}

textarea {
  color: #a19f9f;
  float: left;
  resize: none;
  font-size: 16px;
  margin-bottom: 30px;
  padding: 25px;
  border-radius: 43px;
  background: #232122;
  box-shadow: inset 8px 8px 16px #1a191a,
  inset -8px -8px 16px #2c292b;
  border-color: #2b2a2b;
  width: 96%;
  min-height: 250px;
  height: fit-content;
}

.post {
  background-color: white;

  margin-top: 50px;
  border-radius: 5px;
  margin-bottom: 30px;
}

/*.post {*/

/*  letter-spacing: 1px;*/
/*  padding: 20px 0 20px 0;*/
/*  color: white;*/
/*  font-family: 'poppins', sans-serif;*/
/*  position: relative;*/
/*  background-color: #232122;*/
/*  width: 80%;*/
/*  right: 0px;*/
/*  height: 300px;*/
/*  border-bottom: 2px solid #2b2a2b;*/
/*}*/

</style>
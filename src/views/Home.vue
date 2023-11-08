<template>
  <div class="container">
    <ul>
    <li v-for="item in items" :key="item.id">
      <div class="list">
        <img
          :src="item.image"
          alt=""
          class="item_img"
        />
        <div class="item_info">
          <p>Name: {{ item.name }}</p>
          <p>Species: {{ item.species }}</p>
          <!-- <p>Episodes: {{ item.episode }}</p> -->
        </div>
      </div>
    </li>
  </ul>
  </div>
</template>

<script>
// export default {
//   name: "Home",
//   components: {},
// };

import axios from 'axios';

export default {
  data() {
    return {
      items: []
    }
  },
mounted() {
  axios.get('https://rickandmortyapi.com/api/character')
  .then(response => this.items = response.data.results)
},
methods() {
  console.log(items)
},
}

</script>

<style>
* {
  color: azure;
}
.container {
  max-height: 50vh;
  overflow: auto;
}

.container::-webkit-scrollbar {
  width: 10px;
}

.container::-webkit-scrollbar-track {
  background-color: rgb(59, 59, 59);
  border-radius: 100px;
}

.container::-webkit-scrollbar-thumb {
  background-color: #d4aa70;
  border-radius: 100px;
}

.list {
  border: 2px solid rgb(59, 59, 59);
  height: 120px;
  display: flex;
  align-items: center;
}

.item_img {
  width: 100px;
  height: 100px;
}

.item_info {
  margin-left: 30px;
display: inline-block;
}

</style>

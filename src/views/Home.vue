<template>
  <div class="container">
    <input type="text" v-model="searchString" />
    <button @click="clearSearch">clear</button>
    <ul>
      <li v-for="person in characterList" :key="person.id">
        <div class="list">
          <img :src="person.image" alt="" class="item_img" />
          <div class="item_info">
            <RouterLink :to="getCharacterLocation(person)">
              lol
            </RouterLink>
            <p>Name: {{ person.name }}</p>
            <p>Species: {{ person.species }}</p>
            <!-- <p>Episodes: {{ item.episode }}</p> -->
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { usePersonInfoStore } from "../stores/personsInfo";
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from 'pinia'

const personsStore = usePersonInfoStore();
const { persons } = storeToRefs(personsStore);
const { getPersonInfo } = personsStore;

const searchString = ref('');

const characterList = computed(() => {
  if (!searchString.value) return persons.value;

  console.log(searchString.value)
  return persons.value.filter(character => character.name.includes(searchString.value));
})

function getCharacterLocation(character) {
  return { path: 'character', query: { id: character.id } }
}

function clearSearch() {
  searchString.value = ''
}

onMounted(() => {
  getPersonInfo()
});
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

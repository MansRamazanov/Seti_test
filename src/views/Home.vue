<template>
  <div class="search-container">
      <div class="search">
        <img
          src="../img/search-icon.svg"
          alt="иконка поиска"
          class="search-icon"
        />
        <input class="search-input" type="text" placeholder="Имя персонажа" v-model="searchString"/>
        <select class="search-select" name="status">
          <option class="search-select-option" value="">Status</option>
          <option class="search-select-option" value="alive">Alive</option>
          <option class="search-select-option" value="dead">Dead</option>
          <option class="search-select-option" value="unknown">Unknown</option>
        </select>
      </div>
    </div>
  <div class="container">
    <ul>
      <li v-for="person in characterList" :key="person.id">
        <div class="list">
          <img :src="person.image" alt="" class="item_img" />
          <div class="item_info">
            <p>Name: <RouterLink :to="getCharacterLocation(person)">
              {{ person.name }}
            </RouterLink></p>
            <p>Species: {{ person.species }}</p>
          </div>
          <div class="episode_list-container">
            <p>Episodes:  </p>
            <ul class="episode_list">
              <li v-for="episode in person.episode" :hey="episode.data.id"> 
                <RouterLink :to="getEpisodeLocation(episode.data)">
                  {{ episode.data.name }}
              </RouterLink>
            </li>
            </ul>
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

// console.log(persons)



const characterList = computed(() => {
  if (!searchString.value) return persons.value;

  // console.log(searchString.value)
  return persons.value.filter(character => character.name.includes(searchString.value));
})

// console.log(characterList)

// const episodeList = computed(() => {
//   // console.log(persons.value)
//   persons.value.forEach(elem => {
//     // console.log(elem.episode)
//     return elem.episode
//     // forEach(el => {
//     //   console.log(el)
//       // el.data
//     // })
//   })
// }) 




function getCharacterLocation(character) {
  // console.log(character)
  return { path: '/character', query: { id: character.id } }
}

function getEpisodeLocation(episode) {

  console.log(episode)

  return { path: '/episode', query: { id: episode.id }
}}

// onMounted(async() => {
//   await getPersonInfo()
// });


</script>

<style>
* {
  color: rgb(104, 209, 167);
  font-size: 18px;
}
.container {
  margin-top: 20px;
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
  width: 110px;
  height: 110px;
}

.item_info {
  margin-left: 30px;
  display: inline-block;
  min-width: 170px;
}

.episode_list-container{
  margin-left: 30px;
  display: flex;
  align-items: center;
}

.episode_list {
margin-left: 15px;
list-style-type: none;
}

.search-input {
  margin-left: 10px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #444;
  color: white;
}

.search-select {
  margin-left: 10px;
  background: transparent;
  border: none;
  color: white;
}

.search-select-option {
  color: black;
}

.search-container {
  display: inline-block;
}

.search-icon {
  max-width: 30px;
}

.search {
  display: flex;
  align-items: stretch;
}

</style>

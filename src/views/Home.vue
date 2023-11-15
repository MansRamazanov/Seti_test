<template>
  <div class="container">
    <div class="list_container">
      <div class="search-container">
        <div class="search">
          <img
            src="../img/search-icon.svg"
            alt="иконка поиска"
            class="search-icon"
          />
          <input
            class="search-input"
            type="text"
            placeholder="Имя персонажа"
            v-model="searchString"
            v-on:change="onChangeSelected"
          />
          <label for="status" class="search_label"  v-on:change="onChangeSelected">Status</label>
          <select
            class="search-select"
            name="status"
            id="status"
            v-model="selectValue"
            v-on:change="onChangeSelected"
          >
          <option class="search-select-option" v-bind="{ status: Status }">
            Status
          </option>
            <option class="search-select-option" v-bind="{ status: Alive }">
              Alive
            </option>
            <option class="search-select-option" v-bind="{ status: Dead }">
              Dead
            </option>
            <option class="search-select-option" v-bind="{ status: Unknown }">
              unknown
            </option>
          </select>
        </div>
      </div>
      <ul>
        <li v-for="person in characterList" :key="person.id" class="list">
          <img :src="person.image" alt="" class="item_img" />
          <div class="item_info">
            <p>
              Name:
              <RouterLink :to="getCharacterLocation(person)">
                {{ person.name }}
              </RouterLink>
            </p>
            <p>Species: {{ person.species }}</p>
          </div>
          <div class="episode_list-container">
            <p>Episodes:</p>
            <ul class="episode_list">
              <li v-for="episode in person.episodes" :key="episode.id">
                <RouterLink :to="getEpisodeLocation(episode)">
                  {{ episode.name }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useCharacterListStore } from "../stores/characterList";
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";

const characterListStore = useCharacterListStore();
const { characters } = storeToRefs(characterListStore);
const { getCharactersInfo } = characterListStore;

onMounted(async () => {
  console.log(characters.value);
  await getCharactersInfo();
  console.log(characters.value);
});

let searchString = ref("");
let selectValue = ref();
console.log(selectValue);
console.log(searchString)

let characterList = computed(() => {
  console.log(characters.value);
  if (!searchString.value && selectValue._value === "Status") {
    return characters.value;
  } else if (!searchString.value && selectValue._value) {
    return characters.value.filter(
      (character) =>
        character.status
          .toLowerCase()
          .includes(selectValue._value.toLowerCase()) &&
          character.name
    );
  } else if (searchString.value && !selectValue._value) {
    return characters.value.filter((character) =>
      character.name
        .toLowerCase()
        .includes(searchString.value.trim().toLowerCase())
    );
  } else if (searchString.value && selectValue._value) {
    return characters.value.filter(
      (character) =>
        character.name
          .toLowerCase()
          .includes(searchString.value.trim().toLowerCase()) &&
        character.status
          .toLowerCase()
          .includes(selectValue._value.toLowerCase())
    );
  }
});



function onChangeSelected() {
  characterList = computed(() => {
  console.log(characters.value);
  if (!searchString.value && !selectValue._value) {
    return characters.value;
  } else if (!searchString.value && selectValue._value) {
    return characters.value.filter(
      (character) =>
        character.status
          .toLowerCase()
          .includes(selectValue._value.toLowerCase()) &&
          character.name
    );
  } else if (searchString.value && !selectValue._value) {
    return characters.value.filter((character) =>
      character.name
        .toLowerCase()
        .includes(searchString.value.trim().toLowerCase())
    );
  } else if (searchString.value && selectValue._value) {
    return characters.value.filter(
      (character) =>
        character.name
          .toLowerCase()
          .includes(searchString.value.trim().toLowerCase()) &&
        character.status
          .toLowerCase()
          .includes(selectValue._value.toLowerCase())
    );
  }
});
}

function getCharacterLocation(character) {
  return { path: "/character", query: { id: character.id } };
}

function getEpisodeLocation(episode) {
  return {
    path: "/episode",
    query: { id: episode.id },
  };
}

onChangeSelected();
</script>

<style>
* {
  color: rgb(104, 209, 167);
  font-size: 18px;
}
.container {
  margin: 0 auto;
  max-width: 70vw;
  margin-top: 40px;
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

/* .list_container {
  padding-top: 40px;
} */

.list {
  border: 2px solid rgb(59, 59, 59);
  border-right: none;
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
  width: 170px;
}

.episode_list-container {
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
  border-bottom: 1px solid #444;
  color: white;
}

.search-select-option {
  color: black;
}

.search_label {
  margin-top: 5px;
  margin-left: 15px;
}

.search-container {
  display: inline-block;
  position: fixed;
  top: 65px;
}

.search-icon {
  max-width: 30px;
}

.search {
  display: flex;
  align-items: stretch;
}
</style>

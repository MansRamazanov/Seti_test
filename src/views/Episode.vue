<template>
  <div>
    <div v-if="isFound" class="episode_container">
      {{ console.log(episode) }}
      <p class="episode_text">Name: {{ episode.name }}</p>
      <p class="episode_text">Date: {{ episode.air_date }}</p>
      <p class="episode_text">Characters: </p>
        <div class="character_container">
          <div class="img_container" v-for="character in episode.characters" :key="character.data.id">
          <RouterLink :to="getCharacterLocation(character)">
            <p class="img_name">{{ character.data.name }}</p>
            <img :src="character.data.image" :alt="character.data.name" class="character_img">
              </RouterLink>
      </div>
        </div>
        
      
    </div>
    <div v-else-if="isLoading">loading</div>
    <div v-else>not found</div>
  </div>
</template>

<script setup>
import { useEpisodeStore, EPISODE_STATE } from "../stores/episode";
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();
const episodeStore = useEpisodeStore();
const { episode, state } = storeToRefs(episodeStore);
const { getEpisode } = episodeStore;

const isFound = computed(() => state.value === EPISODE_STATE.FOUND);
const isLoading = computed(() => state.value === EPISODE_STATE.LOADING);

// console.log(episodeStore)

function getCharacterLocation(character) {
  return { path: "/character", query: { id: character.data.id } };
}

onMounted(async () => {
  console.log(route);
  const id = route.query.id;

  await getEpisode(id);
});
</script>

<style>

.episode_container {
  margin: 0 auto;
  margin-top: 40px;
  width: 70vw;
}

.character_container {
  margin-top: 20px;
display: flex;
flex-wrap: wrap;
justify-content: center;
max-width: 80vw;
max-height: 50vh;
overflow:auto;
gap: 5px;
}

.character_container::-webkit-scrollbar {
  width: 10px;
}

.character_container::-webkit-scrollbar-track {
  background-color: rgb(59, 59, 59);
  border-radius: 100px;
}

.character_container::-webkit-scrollbar-thumb {
  background-color: #d4aa70;
  border-radius: 100px;
}

.character_img {
max-width: 100px;
}

.img_name {
  text-align: center;
  max-width: 100px;
  max-height: 21px;
}

.episode_text {
  font-size: 30px;
}

</style>

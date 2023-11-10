<template>
  <div>
    <div v-if="isFound" class="episode_container">
      {{ episode }}
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

// console.log(chatacterStore)

onMounted(async () => {
  // console.log(route);
  const id = route.query.id;

  await getCharacter(id);
});
</script>

<style>

</style>

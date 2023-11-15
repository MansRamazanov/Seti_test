<template>
  <div>
    <div v-if="isFound" class="character_container">
      <img :src="character.image" alt="" />
      <div class="text_container">
        <p class="character_text">Name: {{ character.name }}</p>
        <p class="character_text">Species: {{ character.species }}</p>
        <p class="character_text">Location: {{ character.location.name }}</p>
              <!-- {{ character }} -->
      </div>

    </div>
    <div v-else-if="isLoading">loading</div>
    <div v-else>not found</div>
  </div>
</template>

<script setup>
import { useCharacterStore, CHARACTER_STATE } from "../stores/character";
import { onBeforeMount, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();
const characterStore = useCharacterStore();
const { character, state } = storeToRefs(characterStore);
const { getCharacter } = characterStore;

const isFound = computed(() => state.value === CHARACTER_STATE.FOUND);
const isLoading = computed(() => state.value === CHARACTER_STATE.LOADING);

// console.log(chatacterStore)

onBeforeMount(async () => {
  // console.log(route);
  const id = route.query.id;

  await getCharacter(id);
});
</script>

<style>

.character_container {
  margin: 0 auto;
  display: flex;
  max-width: 80vw;
  margin-top: 40px;
}

.character_text {
  font-size: 30px;
}

.text_container {
margin-left: 40px;
}

</style>

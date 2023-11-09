<template>
  <div>
    <div v-if="isFound">
      {{ character }}
    </div>
    <div v-else-if="isLoading">loading</div>
    <div v-else>not found</div>
  </div>
</template>

<script setup>
import { useCharacterStore, CHARACTER_STATE } from "../stores/character";
import { onMounted, ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();
const characterStore = useCharacterStore();
const { character, state } = storeToRefs(characterStore);
const { getCharacter } = characterStore;

const isFound = computed(() => state.value === CHARACTER_STATE.FOUND);
const isLoading = computed(() => state.value === CHARACTER_STATE.LOADING);

onMounted(async () => {
  console.log(route);
  const id = route.query.id;

  await getCharacter(id);
});
</script>

import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const CHARACTER_STATE = {
  FOUND: "found",
  LOADING: "loading",
  NOT_FOUND: "not found",
};

export const useCharacterStore = defineStore("characterStore", () => {
  const character = ref();
  const state = ref(CHARACTER_STATE.LOADING);

  async function getCharacter(id) {
    if (!id) {
      state.value = CHARACTER_STATE.NOT_FOUND;
      return;
    }

    state.value = CHARACTER_STATE.FOUND;

    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const characterData = response.data;
      console.log(response.data)

      if (!characterData) {
        state.value = CHARACTER_STATE.NOT_FOUND;
        return;
      }

      state.value = CHARACTER_STATE.FOUND;
      character.value = characterData;
    } catch (error) {
      console.error(error);
      state.value = CHARACTER_STATE.NOT_FOUND;
      return;
    }
  }

  return { character, getCharacter, state };
});

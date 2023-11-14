import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const EPISODE_STATE = {
  FOUND: "found",
  LOADING: "loading",
  NOT_FOUND: "not found",
};

export const useEpisodeStore = defineStore("episodeStore", () => {
  const episode = ref();
  const state = ref(EPISODE_STATE.LOADING);

  async function getEpisode(id) {
    if (!id) {
      state.value = EPISODE_STATE.NOT_FOUND;
      return;
    }

    state.value = EPISODE_STATE.FOUND;

    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/episode/${id}`
      );
      const episodeResult = response.data;
      console.log(response.data)

      if (!episodeResult) {
        state.value = EPISODE_STATE.NOT_FOUND;
        return;
      }

      episodeResult.characters = await getCharacters(episodeResult.characters);
      state.value = EPISODE_STATE.FOUND;
      episode.value = episodeResult;
    } catch (error) {
      console.error(error);
      state.value = EPISODE_STATE.NOT_FOUND;
      return;
    }
  }

  function getCharacters(characterUrls) {
    return Promise.all(characterUrls.map((url) => axios.get(url)));
  }

  return { episode, getEpisode, state };
});

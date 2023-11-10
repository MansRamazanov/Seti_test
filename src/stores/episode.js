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
      const episodeData = response.data;
      console.log(response.data)

      if (!characterData) {
        state.value = EPISODE_STATE.NOT_FOUND;
        return;
      }

      // characterData.episodes = await getEpisodes(characterData.episode);
      state.value = EPISODE_STATE.FOUND;
      episode.value = episodeData;
    } catch (error) {
      console.error(error);
      state.value = EPISODE_STATE.NOT_FOUND;
      return;
    }
  }

  // function getEpisodes(episodeUrls) {
  //   return Promise.all(episodeUrls.map((url) => axios.get(url)));
  // }

  return { character, getCharacter, state };
});

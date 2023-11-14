import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useCharacterListStore = defineStore("characterListStore", () => {
  const characters = ref([]);

  async function getCharactersInfo() {
    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );

      const charactersResult = response.data.results;

      const charactersWithEpisodesPromises = charactersResult.map(
        async (character) => {
          character.episodes = await getEpisodes(character);
          return character;
        }
      );

      const charactersWithEpisodes = await Promise.all(charactersWithEpisodesPromises);

      characters.value = charactersWithEpisodes;
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  }

  async function getEpisodes(character) {
    const episodePromises = character.episode
      .slice(0, 5)
      .map(async (episode) => {
        const result = await axios.get(episode);
        return result.data;
      });
    const episodes = await Promise.all(episodePromises);
    return episodes;
  }

  return { characters, getCharactersInfo };
});

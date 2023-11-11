import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

// / -> Home.vue
// /character?id=Rick Sanchez -> Character.vue


export const usePersonInfoStore = defineStore("personInfoStore", () => {
  // TODO: rename
  // characters
  const persons = ref();

  // getCharacters
  async function getPersonInfo() {
    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );

      const personsData = response.data.results;
      persons.value = personsData ;

      console.log(personsData)
      console.log(persons.value)
      
      personsData.forEach(async (person) =>{
        
        await getEpisodes(person)
        // console.log(person)
      })
      
      // personsData.episodes = await getEpisodes(personsData.episode); 
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  }

    async function getEpisodes(person) {
      // console.log(episodeUrls)person
      person.episode = await Promise.all(person.episode.slice(0, 5).map(episode => axios.get(`${episode}`)));
    }

  return { persons, getPersonInfo, getEpisodes };
});


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
 
      // console.log(personsData)
      // console.log(persons.value)
      
      // let res = await axios.get("https://rickandmortyapi.com/api/episode/1");
      // console.log(res.data)

      await personsData.forEach(async (person) =>{
        
       await getEpisodes(person)
        // console.log(person.episode[0].data.id)
        
      })

      // personsData.episodes = await getEpisodes(personsData.episode); 
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  }



    async function getEpisodes(person) {
      // console.log(person)

      // const episode_list = person.episode

      // let res = await axios.get("https://rickandmortyapi.com/api/episode/1");
      // console.log(res.data.result)

      // for (let episode = 0; episode < 5; episode++) {
        
      //   // console.log(episode_list[episode])
      //   let episode_link = episode_list[episode]
      //   let result = await axios.get(`${episode_link}`)
      //   console.log(result)
      // }

      // person.episode = await axios.get(`${person.episode[0]}`)
      person.episode = await Promise.all(person.episode.slice(0, 5).map(episode => axios.get(`${episode}`)))
    }

  return { persons, getPersonInfo, getEpisodes };
});


import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

// / -> Home.vue
// /character?id=Rick Sanchez -> Character.vue

export const usePersonInfoStore = defineStore("personInfoStore", () => {
  // TODO: rename
  // characters
  const persons = ref([]);

  // getCharacters
  async function getPersonInfo() {
    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );
      persons.value = response.data.results;
      console.log(persons.value);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  }

  return { persons, getPersonInfo };
});

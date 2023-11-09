import { defineStore } from "pinia";
import axios from "axios";

export const usePersonInfoStore = defineStore('personInfoStore', {
    state: () => ({
        persons: []
    }),
    actions: {
        // function getPersonInfo() {
            
        //     .then(response => )
        //     .then(console.log(response.data.results))
        // }

        async getPersonInfo() {
            try {
              const response = await axios.get('https://rickandmortyapi.com/api/character')
              this.persons = response.data.results
              }
              catch (error) {
                alert(error)
                console.log(error)
            }
        }
        
    }
})
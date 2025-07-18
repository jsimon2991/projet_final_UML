import { defineStore } from 'pinia'
import api from '../api'

export const usePetsStore = defineStore('pets', {
  state: () => ({
    pets: []
  }),
  actions: {
    async fetchPets() {
      const { data } = await api.get('/pets')
      this.pets = data
    }
  }
})

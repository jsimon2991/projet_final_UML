import { defineStore } from 'pinia'
import api from '../api'

export const useMatchesStore = defineStore('matches', {
  state: () => ({
    matches: []
  }),
  actions: {
    async fetchMatches() {
      const { data } = await api.get('/matches')
      this.matches = data
    }
  }
})

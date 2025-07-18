<template>
  <div>
    <Navbar />
    <div class="container">
      <h1>Mes matchs</h1>
      <div v-if="loading">Chargement...</div>
      <div v-else-if="matches.length === 0">Aucun match pour l’instant.</div>
      <div class="matches-list">
        <div class="pet-card" v-for="pet in matches" :key="pet.id">
          <img :src="pet.photos && pet.photos[0]" :alt="pet.name" class="pet-img" />
          <div>
            <h2>{{ pet.name }}, {{ pet.age }} ans</h2>
            <p>{{ pet.breed }} • {{ pet.size }}</p>
            <p>Énergie : {{ pet.energy }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Navbar from '../components/Navbar.vue'
import { ref, onMounted } from 'vue'
import api from '../store/axios'
const matches = ref([]), loading = ref(true)
onMounted(async () => {
  try {
    const { data } = await api.get('/matches')
    matches.value = (data.matches || []).map(pet => ({
      ...pet,
      photos: typeof pet.photos === 'string' ? JSON.parse(pet.photos) : pet.photos
    }))
  } finally {
    loading.value = false
  }
})
</script>

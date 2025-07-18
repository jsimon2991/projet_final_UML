<template>
  <div>
    <Navbar />
    <div class="home-container">
      <h1>Découvre les animaux à adopter</h1>
      <div v-if="loading" class="loading">Chargement...</div>
      <div v-else>
        <div v-if="currentPet" class="card-container">
          <div class="pet-card">
            <img
              :src="currentPet.photos && currentPet.photos[0]"
              :alt="currentPet.name"
              class="pet-img"
            />
            <div>
              <h2>{{ currentPet.name }}, {{ currentPet.age }} ans</h2>
              <p>{{ currentPet.breed }} • {{ currentPet.size }}</p>
              <p>Énergie : {{ currentPet.energy }}</p>
            </div>
            <div class="btn-row">
              <button @click="dislike" class="btn-dislike">❌</button>
              <button @click="like" class="btn-like">💚</button>
            </div>
          </div>
        </div>
        <div v-else class="finished">
          <div>
            <strong>Aucun animal à afficher. 😺</strong><br />
            <span>(Aucun animal n'est dispo dans la BDD ou API)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import api from '../store/axios'

const pets = ref([])
const index = ref(0)
const loading = ref(true)

const currentPet = computed(() => pets.value[index.value])

async function fetchPets() {
  loading.value = true
  try {
    const { data } = await api.get('/pets')
   
    pets.value = (Array.isArray(data) ? data : (data.pets || [])).map(pet => ({
      ...pet,
      photos: typeof pet.photos === "string" ? JSON.parse(pet.photos) : pet.photos
    }))
    index.value = 0
  } catch (e) {
    pets.value = []
    console.error('Erreur chargement pets:', e)
  } finally {
    loading.value = false
  }
}
function next() { index.value++ }
function like() { next() }
function dislike() { next() }
onMounted(fetchPets)
</script>


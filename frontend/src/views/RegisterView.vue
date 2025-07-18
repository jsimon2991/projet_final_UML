<template>
  <div>
    <Navbar />
    <div class="register-container">
      <form @submit.prevent="register">
        <h2>Créer un compte</h2>
        <input v-model="name" type="text" placeholder="Prénom" required />
        <input v-model="email" type="email" placeholder="Adresse mail" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit" :disabled="loading">
          <span v-if="loading">Inscription...</span>
          <span v-else>S'inscrire</span>
        </button>
        <div v-if="error" class="error">{{ error }}</div>
        <p>Déjà inscrit ? <RouterLink to="/login">Se connecter</RouterLink></p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import api from '../store/axios'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

async function register() {
  error.value = ''
  loading.value = true
  try {
    await api.post('/auth/register', {
      nom: name.value,
      email: email.value,
      password: password.value
    })
    loading.value = false
    router.push('/login')
  } catch (e) {
    loading.value = false
    const msg = 'Erreur lors de l\'inscription'
    error.value = (e && e.response && e.response.data && e.response.data.error)
      ? e.response.data.error
      : msg
  }
}
</script>



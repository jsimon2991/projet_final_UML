<template>
  <div>
    <Navbar />
    <div class="login-container">
      <form @submit.prevent="login">
        <h2>Connexion</h2>
        <input v-model="email" type="email" placeholder="Adresse mail" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit" :disabled="loading">
          <span v-if="loading">Connexion...</span>
          <span v-else>Se connecter</span>
        </button>
        <div v-if="error" class="error">{{ error }}</div>
        <p>Pas encore de compte ? <RouterLink to="/register">S'inscrire</RouterLink></p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import api from '../store/axios'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

async function login() {
  error.value = ''
  loading.value = true
  try {
    const res = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })
    localStorage.setItem('token', res.data.token)
    loading.value = false
    router.push('/profile')
  } catch (e) {
    loading.value = false
    error.value = (e && e.response && e.response.data && e.response.data.error)
      ? e.response.data.error
      : "Erreur lors de la connexion"
  }
}
</script>


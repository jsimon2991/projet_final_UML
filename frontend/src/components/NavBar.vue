<template>
  <nav class="navbar">
    <div class="logo">PetMatch</div>
    <div class="nav-links">
      <RouterLink to="/">Home</RouterLink>
      <template v-if="isLoggedIn">
        <RouterLink to="/matches">Matches</RouterLink>
        <RouterLink to="/profile">Profil</RouterLink>
        <a @click="logout" href="#">Déconnexion</a>
      </template>
      <template v-else>
        <RouterLink to="/login">Connexion</RouterLink>
        <RouterLink to="/register">Inscription</RouterLink>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// Remplace ce système par le tien (token localStorage, etc)
const isLoggedIn = computed(() => !!localStorage.getItem('token'))

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px; background: linear-gradient(90deg, #ff85a2, #b565ec);
}
.logo { font-weight: bold; font-size: 2rem; color: #fff; letter-spacing: 1px; }
.nav-links { display: flex; gap: 22px; }
.nav-links a, .nav-links .router-link-active {
  color: #fff; font-weight: 500; text-decoration: none; transition: color .2s;
}
.nav-links a:hover { color: #fffa; }
</style>

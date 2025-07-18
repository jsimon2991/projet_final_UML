<template>
  <div>
    <Navbar />
    <div class="profile-container">
      <div class="profile-card">
        <h2>Mon profil</h2>
        <form v-if="user" class="profile-form" @submit.prevent="onSave">
          <div class="field">
            <label>Prénom :</label>
            <span v-if="!editing">{{ user.name }}</span>
            <input v-else v-model="editUser.name" required />
          </div>
          <div class="field">
            <label>Email :</label>
            <span v-if="!editing">{{ user.email }}</span>
            <input v-else v-model="editUser.email" required type="email" />
          </div>
          <div class="field">
            <label>Espèces préférées :</label>
            <span v-if="!editing">{{ (user.preferred_species || []).join(', ') || '-' }}</span>
            <input v-else v-model="editUser.preferred_speciesString" placeholder="Ex: Chat, Chien" />
          </div>
          <div class="field">
            <label>Âge max :</label>
            <span v-if="!editing">{{ user.max_age || '-' }}</span>
            <input v-else v-model="editUser.max_age" type="number" min="0" />
          </div>
          <div class="field">
            <label>Tailles préférées :</label>
            <span v-if="!editing">{{ (user.preferred_size || []).join(', ') || '-' }}</span>
            <input v-else v-model="editUser.preferred_sizeString" placeholder="Ex: small, medium, large" />
          </div>
          <div class="field">
            <label>Énergie préférée :</label>
            <span v-if="!editing">{{ (user.preferred_energy || []).join(', ') || '-' }}</span>
            <input v-else v-model="editUser.preferred_energyString" placeholder="Ex: low, medium, high" />
          </div>
          <div class="profile-actions">
            <button v-if="!editing" type="button" @click="startEdit">Modifier</button>
            <button v-else type="submit">Enregistrer</button>
            <button v-if="editing" type="button" @click="cancelEdit" class="cancel">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import { ref, reactive, onMounted } from 'vue'
import api from '../store/axios'

const user = ref(null)
const editing = ref(false)
const editUser = reactive({})

async function fetchProfile() {
  const { data } = await api.get('/users/me', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
  user.value = data
}
onMounted(fetchProfile)

function startEdit() {
  editing.value = true
  Object.assign(editUser, {
    name: user.value.name,
    email: user.value.email,
    preferred_speciesString: (user.value.preferred_species || []).join(', '),
    preferred_sizeString: (user.value.preferred_size || []).join(', '),
    preferred_energyString: (user.value.preferred_energy || []).join(', '),
    max_age: user.value.max_age || ''
  })
}
function cancelEdit() {
  editing.value = false
}
async function onSave() {
 
  const payload = {
    name: editUser.name,
    email: editUser.email,
    preferred_species: editUser.preferred_speciesString.split(',').map(s => s.trim()).filter(Boolean),
    preferred_size: editUser.preferred_sizeString.split(',').map(s => s.trim()).filter(Boolean),
    preferred_energy: editUser.preferred_energyString.split(',').map(s => s.trim()).filter(Boolean),
    max_age: editUser.max_age || null
  }

  await api.put('/users/me', payload, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
  await fetchProfile()
  editing.value = false
}
</script>

<style scoped>
.profile-container { max-width: 600px; margin: 70px auto; }
.profile-card {
  background: #fff; border-radius: 28px; box-shadow: 0 3px 28px #e1d3fa33;
  padding: 48px; min-width: 390px;
}
h2 { font-size: 2.2rem; font-weight: bold; margin-bottom: 26px; }
.field { display: flex; align-items: center; margin-bottom: 20px; }
.field label { flex: 0 0 200px; font-weight: bold; color: #a369ea; }
.field span { font-size: 1.2rem; }
.field input { flex: 1; padding: 8px 12px; border: 1px solid #e2e2e2; border-radius: 6px; font-size: 1.1rem; }
.profile-actions { margin-top: 18px; display: flex; gap: 18px; }
button { padding: 7px 18px; background: linear-gradient(90deg,#f7971e,#a369ea); color: #fff; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;}
.cancel { background: #ddd; color: #7a7a7a; }
</style>

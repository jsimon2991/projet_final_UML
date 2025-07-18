import { ref } from 'vue'
import api from './axios'

export const user = ref(null)
export const token = ref(localStorage.getItem('token'))

export async function fetchCurrentUser() {
  if (!token.value) { user.value = null; return }
  try {
  
    const { data } = await api.get('/users/me', {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    user.value = data
  } catch (e) {
    user.value = null
    console.log('fetchCurrentUser error:', e)
  }
}

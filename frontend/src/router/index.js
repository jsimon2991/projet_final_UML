import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import MatchesView from '../views/MatchesView.vue'
import { token } from '../store/user'

const routes = [
  { path: '/', component: HomeView, meta: { requiresAuth: true } },
  { path: '/register', component: RegisterView },
  { path: '/login', component: LoginView },
  { path: '/profile', component: ProfileView, meta: { requiresAuth: true } },
  { path: '/matches', component: MatchesView, meta: { requiresAuth: true } }
]
const router = createRouter({ history: createWebHistory(), routes })
router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !token.value) next('/login')
  else next()
})
export default router

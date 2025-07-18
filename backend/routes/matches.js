import express from 'express'
import { createClient } from '@supabase/supabase-js'
import { requireAuth } from '../utils/authMiddleware.js'

const router = express.Router()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

function compat(user, pet) {
  let score = 0, total = 4
  if (user.preferred_species?.includes(pet.breed)) score++
  if (user.preferred_size?.includes(pet.size)) score++
  if (user.preferred_energy?.includes(pet.energy)) score++
  if (!user.max_age || pet.age <= user.max_age) score++
  return score / total
}

router.get('/', requireAuth, async (req, res) => {
  const userId = req.user?.id
  if (!userId) return res.status(401).json({ error: 'Non authentifié' })
  const { data: user } = await supabase.from('profiles').select('*').eq('id', userId).single()
  const { data: pets } = await supabase.from('pets').select('*')
  if (!user || !pets) return res.json({ matches: [] })
  const compatibles = pets
    .map(pet => ({
      ...pet,
      photos: typeof pet.photos === "string" ? JSON.parse(pet.photos) : pet.photos
    }))
    .filter(pet => compat(user, pet) >= 0.8)
  res.json({ matches: compatibles })
})

export default router

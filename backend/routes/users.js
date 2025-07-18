import express from 'express'
import { createClient } from '@supabase/supabase-js'
import { requireAuth } from '../utils/authMiddleware.js'

const router = express.Router()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

router.get('/me', requireAuth, async (req, res) => {
  const userId = req.user?.id
  if (!userId) return res.status(401).json({ error: 'Non authentifié' })

  const { data: user, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error || !user) return res.status(404).json({ error: 'Utilisateur non trouvé' })
  res.json(user)
})

router.put('/me', requireAuth, async (req, res) => {
  const userId = req.user?.id
  if (!userId) return res.status(401).json({ error: 'Non authentifié' })

  const updates = req.body
  delete updates.id

  const { data: user, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  if (error || !user) return res.status(400).json({ error: error?.message || 'Erreur modification utilisateur' })
  res.json(user)
})

export default router

import express from 'express'
import { createClient } from '@supabase/supabase-js'
import { requireAuth } from '../utils/authMiddleware.js'

const router = express.Router()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

router.get('/', async (req, res) => {
  const { espece, ageMax, taille, energie } = req.query
  let query = supabase.from('pets').select('*')
  if (espece) query = query.eq('species', espece)
  if (taille) query = query.eq('size', taille)
  if (energie) query = query.eq('energy', energie)
  if (ageMax) query = query.lte('age', Number(ageMax))
  const { data: pets, error } = await query
  if (error) return res.status(500).json({ error: error.message })
  res.json(pets)
})

router.post('/', requireAuth, async (req, res) => {
  const { data: pet, error } = await supabase
    .from('pets')
    .insert([req.body])
    .select()
    .single()
  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json(pet)
})

router.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  const { data: pet, error } = await supabase
    .from('pets')
    .update(req.body)
    .eq('id', id)
    .select()
    .single()
  if (error) return res.status(400).json({ error: error.message })
  res.json(pet)
})

router.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  const { error } = await supabase
    .from('pets')
    .delete()
    .eq('id', id)
  if (error) return res.status(400).json({ error: error.message })
  res.json({ message: 'Animal supprimé' })
})

export default router

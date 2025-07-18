import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createClient } from '@supabase/supabase-js'

const router = express.Router()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
const JWT_SECRET = process.env.JWT_SECRET

router.post('/register', async (req, res) => {
  try {
    const { nom, email, password } = req.body
    if (!nom || !email || !password) return res.status(400).json({ error: 'Tous les champs sont requis.' })
    const password_hash = await bcrypt.hash(password, 10)
    const { data, error } = await supabase
      .from('profiles')
      .insert([{
        email,
        name: nom,
        password_hash
      }])
      .select()
      .single()
    if (error) return res.status(400).json({ error: error.message })
    const user = data
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
    const { password_hash: _, ...userNoPwd } = user
    res.json({ token, user: userNoPwd })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const { data: user, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email)
    .single()
  if (error || !user) return res.status(401).json({ error: 'Email ou mot de passe invalide' })
  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid) return res.status(401).json({ error: 'Email ou mot de passe invalide' })
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
  const { password_hash: _, ...userNoPwd } = user
  res.json({ token, user: userNoPwd })
})

export default router

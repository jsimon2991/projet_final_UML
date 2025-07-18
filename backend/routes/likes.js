const express = require('express')
const router = express.Router()
const { createClient } = require('@supabase/supabase-js')
const { requireAuth } = require('../middleware/auth')
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

router.post('/:userId/like', requireAuth, async (req, res) => {
  try {
    const { userId } = req.params
    const { petId } = req.body
    const { data: dejaLike } = await supabase
      .from('likes')
      .select('*')
      .eq('user_id', userId)
      .eq('pet_id', petId)
      .single()
    if (dejaLike) return res.status(400).json({ error: 'Déjà liké' })
    await supabase.from('likes').insert([{ user_id: userId, pet_id: petId }])
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

module.exports = router

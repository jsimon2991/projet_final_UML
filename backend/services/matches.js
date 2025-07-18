import db from '../db.js'
function compatibilite(user, pet) {
  let score = 0, total = 4
  if (user.preferred_species?.includes(pet.breed)) score++
  if (user.preferred_size?.includes(pet.size)) score++
  if (user.preferred_energy?.includes(pet.energy)) score++
  if (!user.max_age || pet.age <= user.max_age) score++
  return score / total
}


export async function getMatchesForUser(userId) {
  const { data: user, error: userError } = await db.from('users').select('*').eq('id', userId).single()
  if (userError || !user) return []
  const { data: pets, error: petsError } = await db.from('pets').select('*')
  if (petsError || !pets) return []
  return pets.filter(pet => compatibilite(user, pet) >= 0.8)
}

import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next) {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ error: 'No auth header' })
  const [type, token] = auth.split(' ')
  if (type !== 'Bearer' || !token) return res.status(401).json({ error: 'Bad auth header' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

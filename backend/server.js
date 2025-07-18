import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import usersRouter from './routes/users.js'
import petsRouter from './routes/pets.js'
import matchesRouter from './routes/matches.js'



const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/pets', petsRouter)
app.use('/api/matches', matchesRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server démarré sur port ${PORT}`))

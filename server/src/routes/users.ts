import express from 'express'
import bcrypt from 'bcrypt'
import database from '../db/pool'
const router = express.Router()

// general
router.get('/', async (_request, response, next) => {
  try {
    const { rows } = await database.query("SELECT * FROM users")
    response.json(rows)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const { rows } = await database.query(
      "SELECT * FROM users WHERE id = $1", 
      [id]
    )
    response.json(rows[0])
  } catch (err) {
    next(err)
  }
})

router.post('/', async (request, response, next) => {
  try {
    const { username, email, password } = request.body
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const { rows } = await database.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    )
    response.json(rows)
  } catch(err) {
    next(err)
  } 
})

router.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const { rows } = await database.query(
      "DELETE FROM users WHERE id = $1",
      [id]
    )
    response.json(rows)
  } catch (err) {
    next(err)
  }
})

// user associated posts
router.get('/:id/posts', async (request, response, next) => {
  try {
    const { id } = request.params
    const { rows } = await database.query(
      "SELECT * FROM posts WHERE user_id = $1",
      [id]
    )
    response.json(rows)
  } catch (err) {
    next(err)
  }
})

export default router
import express from 'express'
import database from '../db/pool'
const router = express.Router()

router.get('/', async (_request, response, next) => {
  try {
    const { rows } = await database.query("SELECT * FROM posts")
    response.json(rows)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params
    const { rows } = await database.query(
      "SELECT * FROM posts WHERE id = $1", 
      [id]
    )
    response.json(rows[0])
  } catch (err) {
    next(err)
  }
})

export default router
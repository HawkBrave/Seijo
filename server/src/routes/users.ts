import express from 'express'
import database from '../db/pool'
const router = express.Router()

/* GET users listing. */
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

router.post('/', async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  try {
    let { username, email, password } = request.body
    const { rows } = await database.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, password]
    )
    response.json(rows)
  } catch(err) {
    next(err)
  } 
})

export default router
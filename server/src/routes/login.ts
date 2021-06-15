import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import database from '../db/pool'

const router = express.Router()

router.post('/', async (request, response, _next) => {
  console.log(request.body)
  const { username, password } = request.body
  try {
    const { rows } = await database.query(
      "SELECT * FROM users WHERE username = $1", 
      [username]
    )
    const user = rows[0]
    const passwordCorrect = await bcrypt.compare(password, user['password'])
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        err: 'invalid username or password'
      })
    }
    const userIdentity = {
      id: user['id'],
      username: user['username']
    } 
    const token = jwt.sign(
      userIdentity, 
      process.env.SECRET as jwt.Secret,
      { expiresIn: 60 * 60 }
    )
    return response.send({ token, username: user.username})
  } catch (err) {
    return response.status(401).json({ err })
  }
})

export default router
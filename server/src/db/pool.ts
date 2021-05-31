import { Pool } from 'pg'
const pool = new Pool()

const intface = {
  query: (text: string, params?: any) => pool.query(text, params),
}

export default intface
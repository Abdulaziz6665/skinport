import { Pool } from 'pg'
import env from './env'

const host = {
  host: env.database.DB_HOST,
  database: env.database.DB_NAME,
  user: env.database.DB_USER,
  password: env.database.DB_PASSWORD,
  port: env.database.DB_PORT,
}

const connectionString = `postgresql://${host.user}:${host.password}@${host.host}:${host.port}/${host.database}`

const pool = new Pool({ connectionString })

export default pool

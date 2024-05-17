import { PoolClient } from 'pg'
import pool from '../config/postgres'

export const fetch = async <T>(SQL: string, ...params: any[]): Promise<T | undefined> => {
  const client = await pool.connect()
  try {
    const {
      rows: [row],
    } = await client.query(SQL, params)
    return row
  } catch (e) {
    console.log(e, SQL, params)
  } finally {
    client.release()
  }
}

export const fetchAll = async <T>(SQL: string, ...params: any[]): Promise<T[] | any[]> => {
  const client = await pool.connect()
  try {
    const { rows } = await client.query(SQL, params)
    return rows || []
  } catch (e) {
    console.log(e, SQL, params)
    return []
  } finally {
    client.release()
  }
}

export const getPgClient = async (begin: 'BEGIN'): Promise<PoolClient> => {
  const client: PoolClient = await pool.connect()
  try {
    client.query(begin)

    return client
  } catch (error) {
    console.log(error)
  }
}

export const rollback = 'ROLLBACK'
export const commit = 'COMMIT'
export const transaction = async <T>(
  poolClient: PoolClient,
  SQL: string,
  ...params: any
): Promise<T> => {
  try {
    const {
      rows: [row],
    } = await poolClient.query(SQL, params)
    return row as T
  } catch (e) {
    console.log(e, SQL, params)
  }
}

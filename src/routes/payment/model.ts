import { PoolClient } from 'pg'
import { transaction } from '../../api/database'
import { IPayBody, IUser } from './types'

const GET_USER = `
SELECT id, balance FROM users WHERE id = $1`

function getUser(pgclient: PoolClient, id: number): Promise<IUser> {
  return transaction(pgclient, GET_USER, id)
}

const UPDATE_USER_BALANCE = `
UPDATE users SET balance = balance - $2 WHERE id = $1 returning id, balance`

function updateUserBalance(pgClient: PoolClient, data: IPayBody): Promise<IUser> {
  return transaction(pgClient, UPDATE_USER_BALANCE, data.userId, data.amount)
}

export default {
  getUser,
  updateUserBalance,
}

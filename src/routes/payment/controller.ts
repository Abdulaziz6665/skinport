import { FastifyReply, FastifyRequest } from 'fastify'
import { IPayBody } from './types'
import { commit, getPgClient, rollback } from '../../api/database'
import model from './model'

export default {
  USER_PAYMENT: async (req: FastifyRequest, reply: FastifyReply) => {
    const pgClient = await getPgClient('BEGIN')
    try {
      const data = req.body as IPayBody

      if (isNaN(data.amount) || isNaN(data.userId)) {
        reply.status(400)
        return { data: null, error: 'Bad user input' }
      }

      const user = await model.getUser(pgClient, data.userId)

      if (!user) {
        reply.status(400)
        return { data: null, error: 'User not found' }
      }

      if (user.balance < data.amount) {
        reply.status(400)
        return { data: null, error: 'Your account is low on funds' }
      }

      const updated = await model.updateUserBalance(pgClient, data)

      pgClient.query(commit)
      reply.send({ data: updated, error: null })
    } catch (error) {
      console.log(error)
      pgClient.query(rollback)
      reply.status(500).send('error')
    } finally {
      pgClient.release()
    }
  },
}

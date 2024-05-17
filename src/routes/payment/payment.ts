import { FastifyInstance } from 'fastify'
import controller from './controller'

async function payment(fastify: FastifyInstance) {
  fastify.post('/pay', controller.USER_PAYMENT)
}

export default payment

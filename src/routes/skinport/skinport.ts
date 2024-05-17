import { FastifyInstance } from 'fastify'
import controller from './controller'

async function skinport(fastify: FastifyInstance) {
  fastify.get('/skinport', controller.SKINPORT)
}

export default skinport

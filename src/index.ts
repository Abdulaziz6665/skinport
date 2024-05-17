import Fastify from 'fastify'
import env from './config/env'
import routes from './routes/routes'
import fastifyRedis from '@fastify/redis'

const fastify = Fastify()

fastify.register(fastifyRedis, { host: env.redis.REDIS_HOST, port: Number(env.redis.REDIS_PORT) })

for (const route of routes) {
  fastify.register(route)
}

fastify.listen({ port: Number(env.APP_PORT) }, () =>
  console.log(`http://localhost:${env.APP_PORT}`),
)

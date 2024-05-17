import { FastifyReply, FastifyRequest } from 'fastify'
import { ISkinport, TSkinport } from './types'

export default {
  SKINPORT: async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const redis = req.server.redis
      const cacheKey = 'mix_price_skinport'

      const cacheData = await redis.get(cacheKey)
      if (cacheData) return JSON.parse(cacheData)

      const tradable = await fetch('https://api.skinport.com/v1/items?tradable=true')
      const notTradable = await fetch('https://api.skinport.com/v1/items?tradable=false')

      const tradableData: ISkinport[] = await tradable.json()
      const notTradableData: ISkinport[] = await notTradable.json()

      const mixed: TSkinport[] = tradableData.map((tradable, idx) => {
        return {
          market_hash_name: tradable.market_hash_name,
          currency: tradable.currency,
          suggested_price: tradable.suggested_price,
          item_page: tradable.item_page,
          market_page: tradable.market_page,
          tradable_min_price: tradable.min_price,
          not_tradable_min_price: notTradableData[idx].min_price,
          max_price: tradable.max_price,
          mean_price: tradable.mean_price,
          median_price: tradable.median_price,
          quantity: tradable.quantity,
          created_at: tradable.created_at,
          updated_at: tradable.updated_at,
        }
      })

      const oneHoursInSecounds = 60 * 60
      await redis.set(cacheKey, JSON.stringify(mixed), 'EX', oneHoursInSecounds)

      reply.send(mixed)
    } catch (error) {
      console.log(error)
      reply.status(500).send('error')
    }
  },
}

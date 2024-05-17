type Currency =
  | 'AUD'
  | 'BRL'
  | 'CAD'
  | 'CHF'
  | 'CNY'
  | 'CZK'
  | 'DKK'
  | 'EUR'
  | 'GBP'
  | 'HRK'
  | 'NOK'
  | 'PLN'
  | 'RUB'
  | 'SEK'
  | 'TRY'
  | 'USD'

export interface ISkinport {
  market_hash_name: string // '10 Year Birthday Sticker Capsule'
  currency: Currency
  suggested_price: number // 0.87
  item_page: string // 'https://skinport.com/item/10-year-birthday-sticker-capsule'
  market_page: string // 'https://skinport.com/market?item=10%20Year%20Birthday%20Sticker%20Capsule&cat=Container'
  min_price: number // 0.75
  max_price: number // 4.05
  mean_price: number // 1.61
  median_price: number // 1.4
  quantity: number // 214
  created_at: Date // 1661324437
  updated_at: Date // 1715925019
}

export type TSkinport = Omit<ISkinport, 'min_price'> & {
  tradable_min_price: number
  not_tradable_min_price: number
}

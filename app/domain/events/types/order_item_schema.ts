import vine from '@vinejs/vine'

export const OrderItemSchema = vine.object({
  productId: vine.string(),
  sku: vine.string(),
  quantity: vine.number(),
})

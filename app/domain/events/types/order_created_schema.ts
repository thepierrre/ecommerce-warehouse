import vine from '@vinejs/vine'
import { OrderItemSchema } from './order_item_schema.js'

export const OrderCreatedEventSchema = vine.object({
  orderNumber: vine.string(),
  items: vine.array(OrderItemSchema),
  warehouseNumber: vine.string().optional(),
})

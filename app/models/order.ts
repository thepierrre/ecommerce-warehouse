import { BaseModel, column } from "@adonisjs/lucid/orm"
import { DateTime } from "luxon"
import type { OrderStatus } from "../types/order-status.js"
import { OrderItem } from "../types/order-item.js";

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare orderNumber: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  declare lastUpdatedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare reservedAt: DateTime

  @column()
  declare shippingMethod: string

  @column()
  declare shippingAddress: string

  @column()
  declare totalPrice: number;

  @column()
  declare status: OrderStatus;

  // For now, items are stored as JSON as a column.
  // In the future, I may create a separate table for order items with a one-to-many relation.
  // It may be useful for queries, e.g.:
  // * handle partial refunds or partial cancellations
  // * calculate how many of product X were sold this month
  // * search for all orders with a certain product id
  @column()
  declare items: OrderItem[]
}

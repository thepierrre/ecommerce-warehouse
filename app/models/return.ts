import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import type { OrderStatus } from '../types/order_status.js'
import { OrderItem } from '../types/order_item.js'

export default class Return extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare returnNumber: string

  @column()
  declare orderNumber: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  declare lastUpdatedAt: DateTime | null

  @column.dateTime()
  declare receivedAt: DateTime | null

  @column.dateTime()
  declare inspectedAt: DateTime | null

  @column.dateTime()
  declare completedAt: DateTime | null

  @column()
  declare conditionSummary: ReturnConditionSummary | null

  @column()
  declare notes: string | null

  @column()
  declare totalPrice: number

  @column()
  declare status: OrderStatus

  @column()
  declare items: OrderItem[]
}

export type ReturnConditionSummary = 'OK' | 'DAMAGED' | 'MIXED'

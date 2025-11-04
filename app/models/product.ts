import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { type HasMany } from '@adonisjs/lucid/types/relations'
import InventoryItem from './inventory_item.js'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare sku: string

  @column()
  declare name: string

  @column()
  declare unitPrice: number

  @column()
  declare category: string

  @column()
  declare isActive: boolean

  @hasMany(() => InventoryItem, { foreignKey: 'productId' })
  declare inventory: HasMany<typeof InventoryItem>
}

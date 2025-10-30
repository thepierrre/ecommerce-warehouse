import { BaseModel, column } from "@adonisjs/lucid/orm";

export default class Product extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare name: string

    @column()
    declare unitPrice: number

    @column()
    declare category: string

    @column()
    declare isActive: boolean

    @column()
    declare stockQuantity: number

    @column()
    declare reservedQuantity: number
}
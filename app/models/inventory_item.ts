import { BaseModel, belongsTo, column } from "@adonisjs/lucid/orm";
import { type BelongsTo } from "@adonisjs/lucid/types/relations";
import Product from "./product.js";

export default class InventoryItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: string;

  @column()
  declare productId: string;

  @column()
  declare sku: string;

  @column()
  declare location: string;

  @column()
  declare available: number;

  @column()
  declare reserved: number;

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>;
}

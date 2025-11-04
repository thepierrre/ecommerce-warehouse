import { BaseModel, column } from "@adonisjs/lucid/orm";
import { DateTime } from "luxon";
import type { OrderStatus } from "../types/order_status.js";
import { OrderItem } from "../types/order_item.js";

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare orderNumber: string;

  @column()
  declare warehouseNumber: string | null;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoUpdate: true })
  declare lastUpdatedAt: DateTime | null;

  @column.dateTime({ autoCreate: true })
  declare reservedAt: DateTime;

  @column()
  declare shippingMethod: string;

  @column()
  declare shippingAddress: string;

  @column()
  declare totalPrice: number;

  @column()
  declare status: OrderStatus;

  @column()
  declare missingSkus: string[] | null;

  @column()
  declare rejectionReason: string | null;

  /* ────────────────────────────────────────────────────────────────────────────────────────
  For now, the items are stored as JSON inside the column.
  In the future, I may create a separate table for order items with a one-to-many relation.
  It may be useful for queries such as:
    * handling partial refunds / partial cancellations
    * calculating how many of product X were sold this month
    * searching for all orders containing a certain product
  ─────────────────────────────────────────────────────────────────────────────────────────── */
  @column()
  declare items: OrderItem[];
}

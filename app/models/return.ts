import { BaseModel, column } from "@adonisjs/lucid/orm";
import { OrderItem, type ReturnStatus } from "@thepierrre/ecom-common";
import { DateTime } from "luxon";

export default class Return extends BaseModel {
  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare returnNumber: string;

  @column()
  declare orderNumber: string;

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoUpdate: true })
  declare lastUpdatedAt: DateTime | null;

  @column.dateTime()
  declare receivedAt: DateTime | null;

  @column.dateTime()
  declare inspectedAt: DateTime | null;

  @column.dateTime()
  declare completedAt: DateTime | null;

  @column()
  declare conditionSummary: ReturnConditionSummary | null;

  @column()
  declare notes: string | null;

  @column()
  declare totalPrice: number;

  @column()
  declare status: ReturnStatus;

  @column()
  declare items: OrderItem[];
}

export type ReturnConditionSummary = "OK" | "DAMAGED" | "MIXED";

import InventoryItem from "#models/inventory_item";
import { OrderItem } from "../../types/order_item.js";
import db from "@adonisjs/lucid/services/db";
export async function reserveStock(payload: { items: OrderItem[] }) {
  const { items } = payload;

  const trx = await db.transaction();

  for (const item of items) {
    await InventoryItem.query({ client: trx })
      .where("sku", item.sku)
      .decrement("available", item.quantity)
      .increment("reserved", item.quantity);
  }

  await trx.commit();
}

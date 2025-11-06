import InventoryItem from "#models/inventory_item";
import { OrderItem } from "@thepierrre/ecom-common";
import db from "@adonisjs/lucid/services/db";
export async function reserveStock(payload: { items: OrderItem[] }) {
  const { items } = payload;

  const trx = await db.transaction();

  try {
    for (const item of items) {
      await InventoryItem.query({ client: trx })
        .where("sku", item.sku)
        .decrement("available", item.quantity)
        .increment("reserved", item.quantity);
    }

    await trx.commit();
  } catch (err) {
    await trx.rollback();
    throw err;
  }
}

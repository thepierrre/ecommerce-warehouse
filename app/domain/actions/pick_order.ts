import db from "@adonisjs/lucid/services/db";
import InventoryItem from "#models/inventory_item";
import { emitOrderPicked } from "../events/event-emitters/emit_order_picked.js";
import { OrderItem } from "@thepierrre/ecom-common";

export async function pickOrder(payload: {
  orderNumber: string;
  items: OrderItem[];
  packerId?: string;
  weightKg?: number;
  dimensionsCm?: [number, number, number];
}) {
  const { orderNumber, items, packerId, weightKg, dimensionsCm } = payload;

  const trx = await db.transaction();

  try {
    for (const item of items) {
      await InventoryItem.query({ client: trx }).where("sku", item.sku).decrement("reserved", item.quantity);
    }

    await trx.commit();
  } catch (err) {
    await trx.rollback();
    throw err;
  }

  await emitOrderPicked({ orderNumber, packerId, weightKg, dimensionsCm });
}

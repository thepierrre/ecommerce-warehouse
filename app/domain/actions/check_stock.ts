import InventoryItem from "#models/inventory_item";
import { OrderItem } from "../../types/order_item.js";

export type StockCheckResultBase = {
  orderNumber: string;
  warehouseNumber?: string;
};

export type StockCheckResultAccepted = StockCheckResultBase & {
  status: "ACCEPTED";
};

export type StockCheckResultRejected = StockCheckResultBase & {
  status: "REJECTED";
  missingSkus?: string[];
  reason: string;
};

export type StockCheckResult = StockCheckResultAccepted | StockCheckResultRejected;

// TODO: Accept warehouse number as an obligatory param later
// TODO: Add multiple warehouses and the needed logic
export async function checkStock(payload: { items: OrderItem[] }): Promise<{ missingSkus: string[] }> {
  const missingSkus: string[] = [];

  const { items } = payload;

  // INCOMPLETE: Simplified logic for now
  for (const item of items) {
    const inv = await InventoryItem.query().where("sku", item.sku).first();

    if (!inv || inv.available < item.quantity) {
      missingSkus.push(item.sku);
    }
  }

  return { missingSkus };

  // if (missingSkus.length === 0) {
  //     return {
  //         status: "ACCEPTED",
  //         orderNumber,
  //     }
  // }

  // return {
  //     status: "REJECTED",
  //     orderNumber,
  //     missingSkus,
  //     reason: "Missing stock",
  // }
}

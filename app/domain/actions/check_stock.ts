import InventoryItem from "#models/inventory_item";
import { OrderItem } from "../../types/order_item.js";

export type StockCheckResultBase = {
    orderNumber: string,
}

export type StockCheckResultAccepted = StockCheckResultBase & {
    status: "ACCEPTED",
};

export type StockCheckResultRejected = StockCheckResultBase & {
    status: "REJECTED",
    missingSkus?: string[],
    reason: string,
}

export type StockCheckResult = StockCheckResultAccepted | StockCheckResultRejected;


export async function checkStock({ orderNumber, items }: { orderNumber: string, items: OrderItem[] }): Promise<StockCheckResult> {
    const missingSkus: string[] = [];

    // Simplified logic for now
    for (const item of items) {
        const inv = await InventoryItem.query().where('sku', item.sku).first();

        if (!inv || inv.available < item.quantity) {
            missingSkus.push(item.sku);
        }
    }

    if (missingSkus.length === 0) {
        return {
            status: "ACCEPTED",
            orderNumber,
        }
    }

    return {
        status: "REJECTED",
        orderNumber,
        missingSkus,
        reason: "Missing stock",
    }

}
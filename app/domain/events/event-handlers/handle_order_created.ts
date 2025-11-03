import vine from "@vinejs/vine";
import { checkStock } from "../../actions/check_stock.js";
import { emitOrderAccepted } from "../event-emitters/emit_order_accepted.js";
import { emitOrderRejected } from "../event-emitters/emit_order_rejected.js";
import { OrderCreatedSchema } from "../types/order_created_schema.js";
import Order from "#models/order";

export async function handleOrderCreated(raw: unknown) {

    const {
        orderNumber,
        items,
        warehouseNumber
    } = await vine.validate({ schema: OrderCreatedSchema, data: raw })

    const { missingSkus } = await checkStock({ items });

    // TODO: Add order rejected scenario when there's a problem with accessing the DB to check stock.
    // TODO: Add order partially accepted scenario (?)
    if (missingSkus.length > 0) {
        await emitOrderRejected({
            warehouseNumber,
            orderNumber,
            missingSkus,
            reason: "Missing stock"
        });

        await Order.create({
            orderNumber,
            warehouseNumber,
            status: "REJECTED",
            missingSkus,
            rejectionReason: "Missing stock"
        })

        return;
    }

    await emitOrderAccepted({ warehouseNumber, orderNumber });
}
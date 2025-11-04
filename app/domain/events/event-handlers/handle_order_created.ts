import vine from "@vinejs/vine";
import { checkStock } from "../../actions/check_stock.js";
import { emitOrderAccepted } from "../event-emitters/emit_order_accepted.js";
import { emitOrderRejected } from "../event-emitters/emit_order_rejected.js";
import { OrderCreatedEventSchema } from "../types/order_created_event_schema.js";
import Order from "#models/order";
import { reserveStock } from "../../actions/reserve_stock.js";

// TODO: Reserve stock for order items

export async function handleOrderCreated(raw: unknown) {
  const { orderNumber, items } = await vine.validate({
    schema: OrderCreatedEventSchema,
    data: raw,
  });

  let missingSkus: string[];
  try {
    const result = await checkStock({ items });
    missingSkus = result.missingSkus;
  } catch (err) {
    // TODO: Write a retry logic later here.
    // TODO: Add logging
    await emitOrderRejected({
      orderNumber,
      missingSkus: [],
      reason: "SYSTEM_ERROR",
    });

    return;
  }

  // RECHECK: Decide if we should add an order partially accepted scenario
  if (missingSkus.length > 0) {
    await emitOrderRejected({
      orderNumber,
      missingSkus,
      reason: "Missing stock",
    });

    await Order.create({
      orderNumber,
      status: "REJECTED",
      missingSkus,
      rejectionReason: "Missing stock",
    });

    return;
  }

  try {
    await reserveStock({ items });
    await emitOrderAccepted({ orderNumber });

    await Order.create({
      orderNumber,
      status: "PROCESSING",
    });
  } catch (err) {
    await emitOrderRejected({
      orderNumber,
      missingSkus: [],
      reason: "SYSTEM_ERROR",
    });
  }
}

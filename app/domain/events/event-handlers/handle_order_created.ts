import { checkStock } from "../../actions/check_stock";
import { emitOrderAccepted } from "../event-emitters/emit_order_accepted";
import { emitOrderRejected } from "../event-emitters/emit_order_rejected";
import { reserveStock } from "../../actions/reserve_stock";
import Order from "../../../models/order";
import { OrderCreatedEvent, OrderCreatedEventSchema } from "@thepierrre/ecom-common";

// TODO: Reserve stock for order items

export async function handleOrderCreated(raw: unknown) {
  const { orderNumber, items } = (await OrderCreatedEventSchema.validate(raw)) as OrderCreatedEvent;

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

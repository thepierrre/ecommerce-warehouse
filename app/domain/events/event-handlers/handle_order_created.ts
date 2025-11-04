import vine from "@vinejs/vine";
import { checkStock } from "../../actions/check_stock.js";
import { emitOrderAccepted } from "../event-emitters/emit_order_accepted.js";
import { emitOrderRejected } from "../event-emitters/emit_order_rejected.js";
import { OrderCreatedEventSchema } from "../types/order_created_schema.js";
import Order from "#models/order";

export async function handleOrderCreated(raw: unknown) {
  const { orderNumber, items, warehouseNumber } = await vine.validate({
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
      warehouseNumber,
      missingSkus: [],
      reason: "SYSTEM_ERROR",
    });

    await Order.create({
      orderNumber,
      warehouseNumber,
      status: "REJECTED",
      rejectionReason: "SYSTEM_ERROR",
    });

    return;
  }

  // RECHECK: Decide if we should add an order partially accepted scenario
  if (missingSkus.length > 0) {
    await emitOrderRejected({
      warehouseNumber,
      orderNumber,
      missingSkus,
      reason: "Missing stock",
    });

    await Order.create({
      orderNumber,
      warehouseNumber,
      status: "REJECTED",
      missingSkus,
      rejectionReason: "Missing stock",
    });

    return;
  }

  await emitOrderAccepted({ warehouseNumber, orderNumber });

  await Order.create({
    orderNumber,
    warehouseNumber,
    status: "PROCESSING",
  });
}

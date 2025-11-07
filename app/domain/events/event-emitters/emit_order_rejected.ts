import { v4 as uuid } from "uuid";
import { emit } from "../../../nats/client.js";
import { OrderRejectedEvent, WAREHOUSE_ORDER_REJECTED_SUBJECT } from "@thepierrre/ecom-common";

export async function emitOrderRejected(payload: { orderNumber: string; reason: string; missingSkus?: string[] }) {
  const { orderNumber, reason } = payload;

  const event: OrderRejectedEvent = {
    schemaVersion: 1,
    eventId: uuid(),
    occurredAt: new Date().toISOString(),
    rejectedAt: new Date().toISOString(),
    orderNumber,
    reason,
  };

  await emit(WAREHOUSE_ORDER_REJECTED_SUBJECT, event);
}

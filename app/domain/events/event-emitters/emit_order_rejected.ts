import { v4 as uuid } from "uuid";
import { emit } from "../../../nats/client.js";
import { WAREHOUSE_ORDER_REJECTED_EVENT } from "../event_names.js";

export async function emitOrderRejected(payload: { orderNumber: string; reason: string; missingSkus?: string[] }) {
  const { orderNumber, reason, missingSkus } = payload;

  await emit(WAREHOUSE_ORDER_REJECTED_EVENT, {
    schemaVersion: 1,
    eventId: uuid(),
    occurredAt: new Date().toISOString(),
    orderNumber,
    missingSkus,
    reason,
  });
}

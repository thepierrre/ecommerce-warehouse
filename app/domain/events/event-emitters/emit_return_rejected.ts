import { v4 as uuid } from "uuid";
import { emit } from "../../../nats/client";
import { WAREHOUSE_RETURN_REJECTED_EVENT } from "@thepierrre/ecom-common";

export async function emitReturnRejected(payload: {
  orderNumber: string;
  returnNumber: string;
  reason: string;
  missingSkus?: string[];
}) {
  const { orderNumber, returnNumber, reason, missingSkus } = payload;

  await emit(WAREHOUSE_RETURN_REJECTED_EVENT, {
    schemaVersion: 1,
    eventId: uuid(),
    occurredAt: new Date().toISOString(),
    orderNumber,
    returnNumber,
    missingSkus,
    reason,
  });
}

import { v4 as uuid } from "uuid";
import { emit } from "../../../nats/client";
import { ReturnRejectedEvent, WAREHOUSE_RETURN_REJECTED_SUBJECT } from "@thepierrre/ecom-common";

export async function emitReturnRejected(payload: {
  orderNumber: string;
  returnNumber: string;
  reason: string;
}) {
  const { orderNumber, returnNumber, reason } = payload;

  const event: ReturnRejectedEvent = { 
     schemaVersion: 1,
    eventId: uuid(),
    occurredAt: new Date().toISOString(),
    orderNumber,
    returnNumber,
    reason,
  }
    

  await emit(WAREHOUSE_RETURN_REJECTED_SUBJECT, event);
}

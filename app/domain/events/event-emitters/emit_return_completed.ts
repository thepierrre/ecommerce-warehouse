import { v4 as uuid } from "uuid";
import { emit } from "../../../nats/client";
import { ReturnCompletedEvent, ReturnItem, WAREHOUSE_RETURN_COMPLETED_SUBJECT } from "@thepierrre/ecom-common";

export async function emitReturnCompleted(payload: {
  orderNumber: string;
  returnNumber: string;
  reason: string;
  disposition: "accepted" | "partially_accepted" | "rejected";
  items: ReturnItem[]
}) {
  const { orderNumber, returnNumber, reason, disposition, items } = payload;

  const event: ReturnCompletedEvent = { 
     schemaVersion: 1,
    eventId: uuid(),
    occurredAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
    orderNumber,
    returnNumber,
    disposition,
    reason,
    items,
  }
    
  await emit(WAREHOUSE_RETURN_COMPLETED_SUBJECT, event);
}

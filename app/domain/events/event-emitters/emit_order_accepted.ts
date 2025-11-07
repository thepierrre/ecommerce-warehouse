import { v4 as uuid } from "uuid";
import { emit } from "../../../nats/client";
import { OrderAcceptedEvent, WAREHOUSE_ORDER_ACCEPTED_SUBJECT } from "@thepierrre/ecom-common";

export async function emitOrderAccepted(payload: { orderNumber: string; warehouseNumber?: string }) {
  const { orderNumber } = payload;

  const event: OrderAcceptedEvent = {
    schemaVersion: 1,
    eventId: uuid(),
    occurredAt: new Date().toISOString(),
    acceptedAt: new Date().toISOString(),
    orderNumber,
  }

  await emit(WAREHOUSE_ORDER_ACCEPTED_SUBJECT, event);
}

import { CARRIER_ORDER_DELIVERED_SUBJECT, OrderDeliveredEvent } from "@thepierrre/ecom-common";
import { emit } from "app/nats/client";
import { v4 as uuid } from "uuid";

export async function emitOrderDelivered(payload: { orderNumber: string; warehouseNumber?: string }) {
  const { orderNumber } = payload;

  const event: OrderDeliveredEvent = {
    schemaVersion: 1,
    eventId: uuid(),
    occurredAt: new Date().toISOString(),
    orderNumber,
    deliveredAt: new Date().toISOString(),
  };

  await emit(CARRIER_ORDER_DELIVERED_SUBJECT, event);
}

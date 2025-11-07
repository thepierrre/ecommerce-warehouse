import { OrderShippedEvent, WAREHOUSE_ORDER_SHIPPED_SUBJECT } from "@thepierrre/ecom-common";
import { emit } from "../../../nats/client";
import { v4 as uuid } from "uuid";

export async function emitOrderShipped(payload: { orderNumber: string; trackingNumber: string; carrier?: string }) {
  const { orderNumber, trackingNumber, carrier } = payload;

  const event: OrderShippedEvent = {
    schemaVersion: 1,
    eventId: uuid(),
    occurredAt: new Date().toISOString(),
    orderNumber,
    shippedAt: new Date().toISOString(),
    trackingNumber,
    carrier: carrier ?? null,
  };

  await emit(WAREHOUSE_ORDER_SHIPPED_SUBJECT, event);
}

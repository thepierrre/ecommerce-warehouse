import { OrderPickedEvent, WAREHOUSE_ORDER_PICKED_SUBJECT } from "@thepierrre/ecom-common";
import { emit } from "../../../nats/client";
import { v4 as uuid } from "uuid";

export async function emitOrderPicked(payload: {
  orderNumber: string;
  packerId?: string;
  weightKg?: number;
  dimensionsCm?: [number, number, number];
  shippingAddress: string;
}) {
  const { orderNumber, packerId, weightKg, dimensionsCm, shippingAddress } = payload;

  const event: OrderPickedEvent = {
    schemaVersion: 1,
    eventId: uuid(),
    occurredAt: new Date().toISOString(),
    orderNumber,
    pickedAt: new Date().toISOString(),
    pickerId: packerId ?? null,
    weightKg: weightKg ?? null,
    dimensionsCm: dimensionsCm ?? null,
    shippingAddress,
  }

  await emit(WAREHOUSE_ORDER_PICKED_SUBJECT, event);
}

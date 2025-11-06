import { WAREHOUSE_ORDER_SHIPPED_EVENT } from "@thepierrre/ecom-common";
import { emit } from "../../../nats/client";
import { v4 as uuid } from "uuid";

export async function emitOrderShipped(payload: {
  orderNumber: string;
  packerId?: string;
  weightKg?: number;
  dimensionsCm?: [number, number, number];
}) {
  const { orderNumber, packerId, weightKg, dimensionsCm } = payload;

  await emit(WAREHOUSE_ORDER_SHIPPED_EVENT, {
    schemaVersion: 1,
    eventId: uuid(),
    occurredAt: new Date().toISOString(),
    orderNumber,
    shippedAt: new Date().toISOString(),
    packerId: packerId ?? null,
    weightKg: weightKg ?? null,
    dimensionsCm: dimensionsCm ?? null,
  });
}

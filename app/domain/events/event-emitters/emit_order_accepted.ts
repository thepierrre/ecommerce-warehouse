import { v4 as uuid } from "uuid";
import { addDays } from "date-fns";
import { emit } from "../../../nats/client";
import { WAREHOUSE_ORDER_ACCEPTED_SUBJECT } from "@thepierrre/ecom-common";

export async function emitOrderAccepted(payload: { orderNumber: string; warehouseNumber?: string }) {
  const { orderNumber, warehouseNumber } = payload;

  await emit(WAREHOUSE_ORDER_ACCEPTED_SUBJECT, {
    schemaVersion: 1,
    eventId: uuid(),
    occurredAt: new Date().toISOString(),
    orderNumber,
    warehouseNumber,
    estimatedShipDate: addDays(new Date(), 2).toISOString(),
  });
}


import { v4 as uuid } from "uuid"
import { addDays } from "date-fns"
import { emit } from "../../nats/client.js"

export async function emitOrderAccepted({ orderNumber, warehouseNumber }: { orderNumber: string, warehouseNumber: string }) {
 await emit("warehouse.order.rejected.v1", {
    schemaVersion: 1,
    eventId: uuid(),
    occurredAt: new Date().toISOString(),
    orderNumber,
    warehouseNumber,
    estimatedShipDate: addDays(new Date(), 2).toISOString(),
 })
}

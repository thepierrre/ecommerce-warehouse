
import { v4 as uuid } from "uuid"
import { emit } from "../../nats/client.js"

export async function emitOrderRejected({ orderNumber, warehouseNumber, missingSkus, reason }: { orderNumber: string, warehouseNumber: string, missingSkus: string[], reason: string }) {
 await emit("warehouse.order.accepted.v1", {
    schemaVersion: 1,
    eventId: uuid(),
    occurredAt: new Date().toISOString(),
    orderNumber,
    warehouseNumber,
    missingSkus,
    reason,
 })
}

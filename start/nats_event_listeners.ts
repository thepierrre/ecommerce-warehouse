/* ──────────────────────────────────────────────────────────────
   NATS Subscriptions (for incoming events)
   ────────────────────────────────────────────────────────────── */

import logger from "@adonisjs/core/services/logger";
import { subscribe } from "../app/nats/client.js";
import { handleOrderCreated } from "../app/domain/events/event-handlers/handle_order_created.js";
import { ORDER_ORDER_CREATED_EVENT, ORDER_RETURN_CREATED_EVENT } from "../app/domain/events/event_names.js";

export function bootNatsListeners() {
    subscribe(ORDER_ORDER_CREATED_EVENT, async (data: unknown) => {
        logger.info(`Warehouse received event: order.order.created.v1`);
        await handleOrderCreated(data);
        
      
        // Check if items are in stock

        // If all items are in stock:
        // Reserve stock for available items
        // Emit event order.accepted
        // Create order entity in DB

        // If no items in stock:
        // Emit order rejected event
        // Still create an entity with status "rejected" and save in DB

        // If order partially available:
        // Reject as a whole for now (emit order rejected event)
        // Still create an entity with status "rejected" and save in DB with info which items were unavailable
    })

    subscribe(ORDER_RETURN_CREATED_EVENT, async() => {
        logger.info(`Warehouse received event: order.return.created.v1`)

        // Add a return entity in DB
    })
}
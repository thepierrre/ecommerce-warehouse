
import logger from "@adonisjs/core/services/logger";
import { subscribe } from "../app/nats/client.js";

export function bootNatsListeners() {
    subscribe("order.order.created.v1", async() => {
        logger.info(`Warehouse received event: order.order.created.v1`);
        
      
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

    subscribe("order.return.created.v1", async() => {
        logger.info(`Warehouse received event: order.return.created.v1`)

        // Add a return entity in DB
    })
}
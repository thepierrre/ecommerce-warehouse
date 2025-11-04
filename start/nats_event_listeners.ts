/* ──────────────────────────────────────────────────────────────
   NATS Subscriptions (for incoming events)
   ────────────────────────────────────────────────────────────── */

import logger from "@adonisjs/core/services/logger";
import { subscribe } from "../app/nats/client.js";
import { handleOrderCreated } from "../app/domain/events/event-handlers/handle_order_created.js";
import { ORDER_ORDER_CREATED_EVENT, ORDER_RETURN_CREATED_EVENT } from "../app/domain/events/event_names.js";
import { handleReturnCreated } from "../app/domain/events/event-handlers/handle_return_created.js";

export function bootNatsListeners() {
  subscribe(ORDER_ORDER_CREATED_EVENT, async (data: unknown) => {
    logger.info(`Warehouse received event: order.order.created.v1`);

    await handleOrderCreated(data);
  });

  subscribe(ORDER_RETURN_CREATED_EVENT, async (data: unknown) => {
    logger.info(`Warehouse received event: order.return.created.v1`);

    await handleReturnCreated(data);
  });
}

/* ──────────────────────────────────────────────────────────────
   Outgoing Events (emitted by this service)
   ────────────────────────────────────────────────────────────── */

export const WAREHOUSE_ORDER_ACCEPTED_EVENT = "warehouse.order.accepted.v1";
export const WAREHOUSE_ORDER_REJECTED_EVENT = "warehouse.order.rejected.v1";

export const WAREHOUSE_RETURN_ACCEPTED_EVENT = "warehouse.return.accepted.v1";
export const WAREHOUSE_RETURN_REJECTED_EVENT = "warehouse.return.rejected.v1";


/* ──────────────────────────────────────────────────────────────
   Incoming Events (consumed by this service)
   ────────────────────────────────────────────────────────────── */

export const ORDER_ORDER_CREATED_EVENT = "order.order.created.v1";

export const ORDER_RETURN_CREATED_EVENT = "order.return.created.v1";


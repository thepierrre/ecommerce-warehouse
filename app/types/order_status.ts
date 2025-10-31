export const OrderStatuses = [
    "PENDING_RESPONSE",
    "PROCESSING",
    "PACKED",
    "SHIPPED",
    "DELIVERED"
] as const;

export type OrderStatus = typeof OrderStatuses[number];
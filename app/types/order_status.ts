export const OrderStatuses = ["PROCESSING", "PACKED", "SHIPPED", "DELIVERED", "REJECTED", "RETURN_INITIATED"] as const;

export type OrderStatus = (typeof OrderStatuses)[number];

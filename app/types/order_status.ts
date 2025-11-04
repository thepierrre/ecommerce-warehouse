export const OrderStatuses = [
  'PROCESSING',
  'PACKED',
  'SHIPPED',
  'DELIVERED',
  'REJECTED',
] as const

export type OrderStatus = (typeof OrderStatuses)[number]

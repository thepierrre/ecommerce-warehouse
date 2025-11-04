import vine from "@vinejs/vine";
import { OrderItemSchema } from "./order_item_schema.js";

export const OrderCreatedEventSchema = vine.object({
  schemaVersion: vine.literal(1),
  eventId: vine.string().uuid(),
  occurredAt: vine.date({ formats: ["iso"] }),
  orderNumber: vine.string(),
  userId: vine.string(),
  amount: vine.number(),
  shippingMethod: vine.string(),
  shippingAddress: vine.string(),
  items: vine.array(OrderItemSchema),
});

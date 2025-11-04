import vine from "@vinejs/vine";
import { ReturnItemSchema } from "./return_item_schema.js";

export const ReturnCreatedEventSchema = vine.object({
  schemaVersion: vine.literal(1),
  eventId: vine.string().uuid(),
  occurredAt: vine.date({ formats: ["iso"] }),
  orderNumber: vine.string(),
  returnNumber: vine.string(),
  items: vine.array(ReturnItemSchema),
});

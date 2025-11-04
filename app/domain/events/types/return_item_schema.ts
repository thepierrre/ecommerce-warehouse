import vine from "@vinejs/vine";

export const ReturnItemSchema = vine.object({
  productId: vine.string(),
  sku: vine.string(),
  quantity: vine.number(),
  reason: vine.string(),
});

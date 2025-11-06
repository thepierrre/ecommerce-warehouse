import Return from "#models/return";
import db from "@adonisjs/lucid/services/db";
import Order from "#models/order";
import { emitReturnRejected } from "../event-emitters/emit_return_rejected";
import { ReturnCreatedEvent, ReturnCreatedEventSchema } from "@thepierrre/ecom-common";

export async function handleReturnCreated(raw: unknown) {
  const { orderNumber, returnNumber, items } = (await ReturnCreatedEventSchema.validate(raw)) as ReturnCreatedEvent;

  const trx = await db.transaction();

  try {
    await Return.create({
      orderNumber,
      returnNumber,
      items,
      status: "AWAITING",
    });

    await Order.query({ client: trx }).where("orderNumber", orderNumber).update({ status: "RETURN_INITIATED" });

    await trx.commit();
  } catch (err) {
    await trx.rollback();

    await emitReturnRejected({
      orderNumber,
      returnNumber,
      missingSkus: [],
      reason: "SYSTEM_ERROR",
    });
  }
}

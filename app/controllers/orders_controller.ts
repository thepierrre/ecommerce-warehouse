import Order from "#models/order";
import { HttpContext } from "@adonisjs/core/http";

export default class OrdersController {
    async index() {
        return await Order.all();
    }

    async show({ params }: HttpContext) {
       return await Order.findByOrFail(params.id);
    }

    accept() { }

    startProcessing() { }

    pack() { }

    ship() { }

    deliver() { }
}
import { OrderCreatedEvent, ReturnCreatedEvent } from "@thepierrre/ecom-common";

export type OrderEvent = OrderOrderEvent | OrderReturnEvent;

export type OrderOrderEvent = OrderCreatedEvent;

export type OrderReturnEvent = ReturnCreatedEvent;
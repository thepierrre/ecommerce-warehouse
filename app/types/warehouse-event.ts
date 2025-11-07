import {
  OrderAcceptedEvent,
  OrderDeliveredEvent,
  OrderDeliveryAttemptedEvent,
  OrderDeliveryFailedEvent,
  OrderOutForDeliveryEvent,
  OrderPickedEvent,
  OrderProcessingStartedEvent,
  OrderRejectedEvent,
  OrderReturnedToSenderEvent,
  OrderShippedEvent,
  ReturnCompletedEvent,
  ReturnReceivedEvent,
  ReturnRejectedEvent,
} from "@thepierrre/ecom-common";

export type WarehouseEvent = WarehouseOrderEvent | WarehouseReturnEvent;

export type WarehouseOrderEvent =
  | OrderAcceptedEvent
  | OrderDeliveredEvent
  | OrderDeliveryAttemptedEvent
  | OrderDeliveryFailedEvent
  | OrderOutForDeliveryEvent
  | OrderPickedEvent
  | OrderProcessingStartedEvent
  | OrderRejectedEvent
  | OrderReturnedToSenderEvent
  | OrderShippedEvent;

  export type WarehouseReturnEvent = ReturnCompletedEvent | ReturnReceivedEvent | ReturnRejectedEvent;
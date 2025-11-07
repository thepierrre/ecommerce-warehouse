import { ORDER_ORDER_CREATED_SUBJECT, ORDER_RETURN_CREATED_SUBJECT } from "@thepierrre/ecom-common";

export type OrderEventSubject = OrderOrderEventSubject | OrderReturnEventSubject;

export type OrderOrderEventSubject = typeof ORDER_ORDER_CREATED_SUBJECT;

export type OrderReturnEventSubject = typeof ORDER_RETURN_CREATED_SUBJECT;



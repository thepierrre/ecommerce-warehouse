export const ReturnStatuses = [
  "AWAITING",
  "IN_TRANSIT",
  "RECEIVED",
  "INSPECTED",
  "ACCEPTED",
  "REJECTED",
  "PARTIALLY_ACCEPTED",
] as const;

export type ReturnStatus = (typeof ReturnStatuses)[number];

export const ReturnReasons = [
  "WRONG_ITEM_RECEIVED",
  "DEFECTIVE_OR_BROKEN",
  "NOT_AS_DESCRIBED",
  "USER_CHANGED_MIND",
  "ORDERED_BY_MISTAKE",
  "FOUND_BETTER_ALTERNATIVE",
  "NO_REASON_PROVIDED",
] as const;

export type ReturnReason = (typeof ReturnReasons)[number];

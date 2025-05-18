import type { IpcSendEvent } from "@/shared/electron";

export const IpcEventList = [
  "ignore-mouse-event",
] as const satisfies IpcSendEvent["id"][];

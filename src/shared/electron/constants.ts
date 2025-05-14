import type { IpcEvent } from "./types";

export const IpcEventList = [
  "ignore-mouse-event",
] as const satisfies IpcEvent["id"][];

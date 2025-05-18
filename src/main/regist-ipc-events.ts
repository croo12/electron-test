import { type BrowserWindow, ipcMain as nativeIpcMain } from "electron";
import type { IpcSendEvent } from "@/shared/electron";
import { IpcEventList } from "./constants";

export function registIpcEvents(win: BrowserWindow) {
  for (const eventId of IpcEventList) {
    switch (eventId) {
      case "ignore-mouse-event": {
        nativeIpcMain.on(
          eventId,
          (
            event,
            payload: Extract<IpcSendEvent, { id: typeof eventId }>["payload"]
          ) => {
            process.stdout.write(JSON.stringify(event));
            process.stdout.write(JSON.stringify(payload));
            win.setIgnoreMouseEvents(payload, { forward: true });
          }
        );
        break;
      }
      default: {
        const exhaustiveCheck: never = eventId;
        return exhaustiveCheck;
      }
    }
  }
}

import { type BrowserWindow, ipcMain as nativeIpcMain } from "electron";
import type { IpcEvent } from "../types";
import { IpcEventList } from "../constants";

export function registIpcEvents(win: BrowserWindow) {
  for (const eventId of IpcEventList) {
    switch (eventId) {
      case "ignore-mouse-event": {
        nativeIpcMain.on(
          eventId,
          (
            event,
            payload: Extract<IpcEvent, { id: typeof eventId }>["payload"]
          ) => {
            console.log(event);
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

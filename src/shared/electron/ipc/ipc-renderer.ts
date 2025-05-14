import { ipcRenderer as nativeIpcRenderer } from "electron";
import type { IpcEvent } from "../types";

export function ipcRenderer(parameter: IpcEvent) {
  return nativeIpcRenderer.send(parameter.id, parameter.payload);
}

import type { IpcSendEvent } from "../types";

export function ipcRenderer(parameter: IpcSendEvent) {
  return window.electronAPI.send(parameter.id, parameter.payload);
}

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  send: (channel: string, data: any) => ipcRenderer.send(channel, data),
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  on: (channel: string, func: (...args: any[]) => void) => {
    ipcRenderer.on(channel, (_event, ...args) => func(...args));
  },
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  invoke: (channel: string, data: any) => ipcRenderer.invoke(channel, data),
});

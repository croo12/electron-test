interface IpcEventBase {
  id: string;
}

interface IgnoreMouseEvent extends IpcEventBase {
  id: "ignore-mouse-event";
  payload: boolean;
}

export type IpcSendEvent = IgnoreMouseEvent;

type SencFnPayload<T extends IpcSendEvent> = [T["id"], T["payload"]];

declare global {
  interface Window {
    electronAPI: {
      send: (...data: SencFnPayload<IpcSendEvent>) => void;
      // on: (channel: string, func: (...args: any[]) => void) => void;
      // invoke: (channel: string, data: any) => void;
    };
  }
}
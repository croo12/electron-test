interface IpcEventBase {
  id: string;
}

interface IgnoreMouseEvent extends IpcEventBase {
  id: "ignore-mouse-event";
  payload: boolean;
}

export type IpcEvent = IgnoreMouseEvent;

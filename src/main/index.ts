import { app, BrowserWindow, Menu, Tray } from "electron";
import { join } from "node:path";
import { registIpcEvents } from "./regist-ipc-events";

let tray: Tray | null = null;

function createWindow() {
  const win = new BrowserWindow({
    show: false,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    fullscreen: true,
    fullscreenable: true,
    autoHideMenuBar: true,
    skipTaskbar: true,
    webPreferences: {
      preload: join(__dirname, "src/main/preload.ts"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.setIgnoreMouseEvents(true, { forward: true });
  win.setFullScreen(true);

  registIpcEvents(win);

  // 개발 모드에서는 로컬 서버, 프로덕션에서는 빌드된 파일 로드
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(join(__dirname, "../dist/index.html"));
  }

  win.once("ready-to-show", () => {
    win.showInactive();
  });
}

function createTray() {
  tray = new Tray(join(__dirname, "public/tray-icon.png"));
  const contextMenu = Menu.buildFromTemplate([
    { label: "종료", click: () => app.quit() },
  ]);
  tray.setToolTip("Desktop Character 백그라운드 서비스");
  tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
  createWindow();
  createTray();
});

import { app, BrowserWindow } from 'electron';
import { join } from 'node:path';

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 개발 모드에서는 로컬 서버, 프로덕션에서는 빌드된 파일 로드
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(createWindow); 
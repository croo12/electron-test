import { contextBridge } from 'electron';

// 여기에 필요한 API를 노출할 수 있습니다
contextBridge.exposeInMainWorld('electronAPI', {
  // 예: 윈도우 드래그 기능
  startDrag: () => {
    // 드래그 관련 기능 구현
  }
}); 
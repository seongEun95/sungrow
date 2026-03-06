const { contextBridge, ipcRenderer } = require('electron');

// 렌더러 프로세스에 안전하게 API 노출
contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  platform: process.platform,
});

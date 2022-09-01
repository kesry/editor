const { contextBridge, ipcRenderer } = require('electron')

//主进程暴露给渲染进程的 api
contextBridge.exposeInMainWorld('electronAPI', {
  chooseDir: () => ipcRenderer.invoke('dialog:chooseDir')
})

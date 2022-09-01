const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  chooseDir: () => ipcRenderer.invoke('dialog:chooseDir')
})

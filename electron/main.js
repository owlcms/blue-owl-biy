const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const timekeeperRunner = require('../dist/scripts/timekeeper')


function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
    timekeeperRunner({
        mqttUsername: "test",
        mqttUrl: "mqtt://127.0.0.1:1883",
        mqttPassword: "test",
        port: "COM10",
    })
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
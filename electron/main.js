const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { spawn } = require('node:child_process');


function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
    console.log("forking")
    //let child = 
    //fork("dist/scripts/timekeeper.js", [], {
    const child = spawn("c:\\Program Files\\nodejs\\npm.cmd", ["run", "ts", "./src/scripts/timekeeper.ts"], {
      cwd: "c:\\Dev\\git\\blue-owl",
      env: {
        'BLUE_OWL_MQTT_PASSWORD': '',
        'BLUE_OWL_MQTT_URL': 'mqtt://127.0.0.1:1883',
        'BLUE_OWL_MQTT_USERNAME': '',
        'BLUE_OWL_PLATFORM': 'A',
        'BLUE_OWL_SERIAL_PORT': "COM10",
      },
      stdio: 'inherit',
    })
    child.on('error', (error) => {
      console.log('Error', error);
    })
    child.on('disconnect', () => {
      console.log('disconnect');
    })
    child.on('exit', () => {
      console.log('exit')
    })
    child.on('close', () => {
      console.log('close');
    })
    child.on('spawn', () => {
      console.log('spawned');
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
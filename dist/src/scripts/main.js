"use strict";
var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow, ipcMain = _a.ipcMain;
var startTimekeeper = require('../../dist/scripts/timekeeper');
var path = require('path');
function createWindow() {
    var mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    ipcMain.on('set-title', function (event, title) {
        var webContents = event.sender;
        var win = BrowserWindow.fromWebContents(webContents);
        win.setTitle(title);
        startTimekeeper({
            mqttUrl: 'mqtt://localhost:1883',
            port: 'COM6',
        });
    });
    mainWindow.loadFile('index.html');
}
app.whenReady().then(function () {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        app.quit();
});
//# sourceMappingURL=main.js.map
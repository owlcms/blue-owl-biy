import type { BrowserWindow } from 'electron';
import * as remoteMain from '@electron/remote/main';

export default class Main {
    static mainWindow: Electron.BrowserWindow;
    static application: Electron.App;
    static BrowserWindow;

    private static onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            Main.application.quit();
        }
    }

    private static onClose() {
        // Dereference the window object. 
        //Main.mainWindow = null;
    }

    private static onReady() {
        remoteMain.initialize();
        Main.mainWindow = new Main.BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                plugins: true, 
                backgroundThrottling: false,
                nativeWindowOpen: false,
                webSecurity: false,
            },
        });
        remoteMain.enable(Main.mainWindow.webContents);
        Main.mainWindow
            .loadURL('file://' + __dirname + '/../html/index.html');
        Main.mainWindow.on('closed', Main.onClose);
    }

    static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
        // we pass the Electron.App object and the  
        // Electron.BrowserWindow into this function 
        // so this class has no dependencies. This 
        // makes the code easier to write tests for 
        Main.BrowserWindow = browserWindow;
        Main.application = app;
        Main.application.on('window-all-closed', Main.onWindowAllClosed);
        Main.application.on('ready', Main.onReady);
    }
}
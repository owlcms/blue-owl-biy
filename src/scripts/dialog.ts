import type { MessageBoxOptions } from 'electron';
import { BrowserWindow, dialog } from '@electron/remote';
import { doRunner } from './timekeeper';


export function hello() {
    console.warn("allo!");
    doRunner({
        serialPort: "COM10",
        mqttPassword: "test",
        mqttUrl: "mqtt://127.0.0.1",
        mqttUsername: "test",
        platform: "A",
    });
    const options: MessageBoxOptions = {
        title: 'Some title',
        type: 'info',
        buttons: ['OK', 'Cancel'],
        message: 'Some message',
        detail: 'hello',
    };
    const win = BrowserWindow.getFocusedWindow();
    if (win) dialog.showMessageBox(win, options);
}

const button = document.getElementById('btnShowHello');
if (button) button.onclick=hello
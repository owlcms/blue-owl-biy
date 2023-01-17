import type { MessageBoxOptions } from 'electron';
import { BrowserWindow, dialog } from '@electron/remote';


export function hello() {
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

const button = document.getElementById('btnShowHello')
if (button) button.onclick = hello;

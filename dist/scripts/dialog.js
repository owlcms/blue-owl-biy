"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
var remote_1 = require("@electron/remote");
function hello() {
    console.warn("allo!");
    doRunner({
        serialPort: "COM10",
        mqttPassword: "test",
        mqttUrl: "mqtt://127.0.0.1",
        mqttUsername: "test",
        platform: "A",
    });
    var options = {
        title: 'Some title',
        type: 'info',
        buttons: ['OK', 'Cancel'],
        message: 'Some message',
        detail: 'hello',
    };
    var win = remote_1.BrowserWindow.getFocusedWindow();
    if (win)
        remote_1.dialog.showMessageBox(win, options);
}
exports.hello = hello;
var button = document.getElementById('btnShowHello');
if (button)
    button.onclick = hello;
//# sourceMappingURL=dialog.js.map
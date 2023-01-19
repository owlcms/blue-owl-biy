"use strict";
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
Object.defineProperty(exports, "__esModule", { value: true });
//import SerialPort from "serialport";
var johnny_five_1 = require("johnny-five");
console.error("preload");
window.addEventListener("DOMContentLoaded", function () {
    var replaceText = function (selector, text) {
        var element = document.getElementById(selector);
        if (element) {
            element.innerText = text;
        }
    };
    for (var _i = 0, _a = ["chrome", "node", "electron"]; _i < _a.length; _i++) {
        var type = _a[_i];
        var v = process.versions[type];
        if (v)
            replaceText("".concat(type, "-version"), v);
    }
    console.error("loaded");
    var button = window.document.getElementById('btnShowHello');
    if (button) {
        button.onclick = function () {
            console.error("allo");
            var board = new johnny_five_1.Board();
            board.on('ready', function () {
                var led = new johnny_five_1.Led(13);
                led.blink(500);
            });
        };
    }
});
//# sourceMappingURL=preload.js.map
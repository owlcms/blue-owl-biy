"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var electron_main_1 = __importDefault(require("./electron-main"));
electron_main_1.default.main(electron_1.app, electron_1.BrowserWindow);
//# sourceMappingURL=app.js.map
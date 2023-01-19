"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var johnny_five_1 = require("johnny-five");
exports.default = (function (options) {
    if (options === void 0) { options = {}; }
    var board = new johnny_five_1.Board(__assign({ repl: false }, options));
    return new Promise(function (resolve, reject) {
        board.on('ready', function () {
            resolve(board);
        });
        board.on('fail', function (_a) {
            var message = _a.message;
            reject(new Error(message));
        });
        board.on('error', function (error) {
            reject(error);
        });
    });
});
//# sourceMappingURL=board.js.map
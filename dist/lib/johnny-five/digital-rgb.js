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
var colors = [
    'blue',
    'green',
    'red',
];
var DigitalRgb = /** @class */ (function () {
    function DigitalRgb(options) {
        var baseOptions = {
            board: options.board,
            isAnode: options.anode,
        };
        this.leds = colors.reduce(function (leds, color) {
            leds[color] = new johnny_five_1.Led(__assign(__assign({}, baseOptions), { pin: options.pins[color] }));
            return leds;
        }, {});
    }
    DigitalRgb.prototype.green = function () {
        this.off();
        this.leds.green.on();
    };
    DigitalRgb.prototype.off = function () {
        this.leds.blue.off();
        this.leds.green.off();
        this.leds.red.off();
    };
    DigitalRgb.prototype.red = function () {
        this.off();
        this.leds.red.on();
    };
    DigitalRgb.prototype.white = function () {
        this.leds.blue.on();
        this.leds.green.on();
        this.leds.red.on();
    };
    return DigitalRgb;
}());
exports.default = DigitalRgb;
//# sourceMappingURL=digital-rgb.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var johnny_five_1 = require("johnny-five");
exports.default = (function (options) {
    var led = new johnny_five_1.Led({
        board: options.board,
        pin: options.led,
    });
    function flash(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.duration, duration = _c === void 0 ? 2000 : _c, _d = _b.speed, speed = _d === void 0 ? 300 : _d;
        led.blink(speed);
        setTimeout(reset, duration);
    }
    function reset() {
        led.stop().off();
    }
    return function (referee) {
        referee.on('initialized', function () {
            flash();
        });
        referee.on('decisionRequest', function () {
            flash();
        });
        referee.on('summon', function () {
            flash({ duration: 5000, speed: 100 });
        });
    };
});
//# sourceMappingURL=warning-led.js.map
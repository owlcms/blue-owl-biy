"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var johnny_five_1 = require("johnny-five");
exports.default = (function (options) {
    var leds = {
        bad: new johnny_five_1.Led({
            board: options.board,
            pin: options.badLiftLed,
        }),
        good: new johnny_five_1.Led({
            board: options.board,
            pin: options.goodLiftLed,
        }),
    };
    function flash(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.duration, duration = _c === void 0 ? 2000 : _c, _d = _b.speed, speed = _d === void 0 ? 300 : _d;
        leds.bad.blink(speed);
        leds.good.blink(speed);
        setTimeout(reset, duration);
    }
    function reset() {
        leds.bad.stop().off();
        leds.good.stop().off();
    }
    return function (referee) {
        referee.on('initialized', function () {
            flash();
        });
        referee.on('decisionConfirmed', function (_a) {
            var decision = _a.decision;
            reset();
            leds[decision].on();
            setTimeout(function () {
                leds[decision].off();
            }, 2000);
        });
    };
});
//# sourceMappingURL=confirmation-leds.js.map
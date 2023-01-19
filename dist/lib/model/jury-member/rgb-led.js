"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var digital_rgb_1 = __importDefault(require("lib/johnny-five/digital-rgb"));
exports.default = (function (options) {
    var led = new digital_rgb_1.default({
        anode: options.anode,
        board: options.board,
        pins: options.pins,
    });
    return function (juryMember) {
        juryMember.on('decision', function () {
            led.green();
        });
        juryMember.on('reset', function () {
            led.off();
        });
        juryMember.on('reveal', function (_a) {
            var decision = _a.decision;
            led[decision === 'good' ? 'white' : 'red']();
        });
    };
});
//# sourceMappingURL=rgb-led.js.map
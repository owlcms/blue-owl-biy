"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var digital_rgb_1 = __importDefault(require("lib/johnny-five/digital-rgb"));
var referee_1 = require("lib/model/referee");
exports.default = (function (options) {
    function refereePinsProperty(referee) {
        return "referee".concat(referee, "Pins");
    }
    var leds = referee_1.referees.reduce(function (_leds, referee) {
        var pinsProperty = refereePinsProperty(referee);
        _leds[pinsProperty] = new digital_rgb_1.default({
            anode: options.anode,
            board: options.board,
            pins: options[pinsProperty],
        });
        return _leds;
    }, {});
    return function (jury) {
        jury.on('refereeDecision', function (_a) {
            var decision = _a.decision, referee = _a.referee;
            var ledProperty = refereePinsProperty(referee);
            leds[ledProperty][decision === 'good' ? 'white' : 'red']();
        });
        jury.on('resetRefereeDecisions', function () {
            referee_1.referees.forEach(function (referee) {
                var ledProperty = refereePinsProperty(referee);
                leds[ledProperty].off();
            });
        });
    };
});
//# sourceMappingURL=referee-rgb-leds.js.map
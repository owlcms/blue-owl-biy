"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var referee_1 = require("lib/model/referee");
var johnny_five_1 = require("johnny-five");
exports.default = (function (options) {
    function refereeDecisionProperty(_a) {
        var decision = _a.decision, referee = _a.referee;
        var capitalizedDecision = decision.replace(/^(\w)/, function (character) { return character.toUpperCase(); });
        return "referee".concat(referee).concat(capitalizedDecision, "LiftLed");
    }
    var leds = referee_1.referees.reduce(function (_leds, referee) {
        referee_1.decisions.forEach(function (decision) {
            var ledProperty = refereeDecisionProperty({ decision: decision, referee: referee });
            _leds[ledProperty] = new johnny_five_1.Led({
                board: options.board,
                pin: options[ledProperty],
            });
        });
        return _leds;
    }, {});
    return function (jury) {
        jury.on('refereeDecision', function (_a) {
            var decision = _a.decision, referee = _a.referee;
            var ledProperty = refereeDecisionProperty({ decision: decision, referee: referee });
            leds[ledProperty].on();
            var otherLedProperty = refereeDecisionProperty({
                decision: decision === 'good' ? 'bad' : 'good',
                referee: referee,
            });
            leds[otherLedProperty].off();
        });
        jury.on('resetRefereeDecisions', function () {
            referee_1.referees.forEach(function (referee) {
                referee_1.decisions.forEach(function (decision) {
                    var ledProperty = refereeDecisionProperty({ decision: decision, referee: referee });
                    leds[ledProperty].off();
                });
            });
        });
    };
});
//# sourceMappingURL=referee-leds.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var referee_1 = require("lib/model/referee");
var johnny_five_1 = require("johnny-five");
exports.default = (function (options) {
    var buttons = {
        bad: new johnny_five_1.Button({
            board: options.board,
            isPullup: options.badLiftButtonPullUp,
            pin: options.badLiftButton,
        }),
        good: new johnny_five_1.Button({
            board: options.board,
            isPullup: options.goodLiftButtonPullUp,
            pin: options.goodLiftButton,
        }),
    };
    return function (juryMember) {
        referee_1.decisions.forEach(function (decision) {
            buttons[decision].on('press', function () {
                juryMember.publishDecision(decision);
            });
        });
    };
});
//# sourceMappingURL=buttons.js.map
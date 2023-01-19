"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var johnny_five_1 = require("johnny-five");
var actions = [
    'oneMinute',
    'start',
    'stop',
    'twoMinute',
];
exports.default = (function (options) {
    var buttons = actions.reduce(function (_buttons, action) {
        _buttons[action] = new johnny_five_1.Button({
            board: options.board,
            isPullup: options["".concat(action, "ButtonPullUp")],
            pin: options["".concat(action, "Button")],
        });
        return _buttons;
    }, {});
    return function (timekeeper) {
        actions.forEach(function (action) {
            buttons[action].on('press', function () {
                timekeeper["".concat(action, "Clock")]();
            });
        });
    };
});
//# sourceMappingURL=buttons.js.map
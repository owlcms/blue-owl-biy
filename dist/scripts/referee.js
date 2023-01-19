"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var referee_1 = __importDefault(require("lib/model/referee"));
var buttons_1 = __importDefault(require("lib/model/referee/buttons"));
var buzzer_1 = __importDefault(require("lib/model/referee/buzzer"));
var warning_led_1 = __importDefault(require("lib/model/referee/warning-led"));
var runner_1 = __importDefault(require("scripts/runner"));
(0, runner_1.default)(function (_a) {
    var board = _a.board, owlcms = _a.owlcms, platform = _a.platform;
    new referee_1.default({
        modules: [
            (0, buttons_1.default)({
                badLiftButton: 3,
                badLiftButtonPullUp: true,
                board: board,
                goodLiftButton: 4,
                goodLiftButtonPullUp: true,
            }),
            (0, buzzer_1.default)({
                board: board,
                piezo: 2,
            }),
            (0, warning_led_1.default)({
                board: board,
                led: 'A0',
            }),
        ],
        number: 1,
        owlcms: owlcms,
        platform: platform,
    });
    new referee_1.default({
        modules: [
            (0, buttons_1.default)({
                badLiftButton: 6,
                badLiftButtonPullUp: true,
                board: board,
                goodLiftButton: 7,
                goodLiftButtonPullUp: true,
            }),
            (0, buzzer_1.default)({
                board: board,
                piezo: 5,
            }),
            (0, warning_led_1.default)({
                board: board,
                led: 'A1',
            }),
        ],
        number: 2,
        owlcms: owlcms,
        platform: platform,
    });
    new referee_1.default({
        modules: [
            (0, buttons_1.default)({
                badLiftButton: 9,
                badLiftButtonPullUp: true,
                board: board,
                goodLiftButton: 10,
                goodLiftButtonPullUp: true,
            }),
            (0, buzzer_1.default)({
                board: board,
                piezo: 8,
            }),
            (0, warning_led_1.default)({
                board: board,
                led: 'A2',
            }),
        ],
        number: 3,
        owlcms: owlcms,
        platform: platform,
    });
});
//# sourceMappingURL=referee.js.map
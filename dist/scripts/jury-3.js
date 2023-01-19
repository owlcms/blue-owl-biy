"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jury_1 = __importDefault(require("lib/model/jury"));
var jury_member_1 = __importDefault(require("lib/model/jury-member"));
var buttons_1 = __importDefault(require("lib/model/jury-member/buttons"));
var rgb_led_1 = __importDefault(require("lib/model/jury-member/rgb-led"));
var buttons_2 = __importDefault(require("lib/model/jury/buttons"));
var referee_rgb_leds_1 = __importDefault(require("lib/model/jury/referee-rgb-leds"));
var runner_1 = __importDefault(require("scripts/runner"));
(0, runner_1.default)(function (_a) {
    var board = _a.board, owlcms = _a.owlcms, platform = _a.platform;
    new jury_1.default({
        members: [
            new jury_member_1.default({
                number: 1,
                modules: [
                    (0, buttons_1.default)({
                        badLiftButton: 23,
                        badLiftButtonPullUp: true,
                        board: board,
                        goodLiftButton: 25,
                        goodLiftButtonPullUp: true,
                    }),
                    (0, rgb_led_1.default)({
                        board: board,
                        pins: {
                            blue: 28,
                            green: 30,
                            red: 32,
                        },
                    }),
                ],
            }),
            new jury_member_1.default({
                number: 2,
                modules: [
                    (0, buttons_1.default)({
                        badLiftButton: 27,
                        badLiftButtonPullUp: true,
                        board: board,
                        goodLiftButton: 29,
                        goodLiftButtonPullUp: true,
                    }),
                    (0, rgb_led_1.default)({
                        board: board,
                        pins: {
                            blue: 34,
                            green: 36,
                            red: 38,
                        },
                    }),
                ],
            }),
            new jury_member_1.default({
                number: 3,
                modules: [
                    (0, buttons_1.default)({
                        badLiftButton: 31,
                        badLiftButtonPullUp: true,
                        board: board,
                        goodLiftButton: 33,
                        goodLiftButtonPullUp: true,
                    }),
                    (0, rgb_led_1.default)({
                        board: board,
                        pins: {
                            blue: 40,
                            green: 42,
                            red: 44,
                        },
                    }),
                ],
            }),
        ],
        modules: [
            (0, referee_rgb_leds_1.default)({
                board: board,
                referee1Pins: {
                    red: 2,
                    green: 3,
                    blue: 4,
                },
                referee2Pins: {
                    red: 5,
                    green: 6,
                    blue: 7,
                },
                referee3Pins: {
                    red: 8,
                    green: 9,
                    blue: 10,
                },
            }),
            (0, buttons_2.default)({
                badLiftButton: 45,
                badLiftButtonPullUp: true,
                board: board,
                deliberationButton: 43,
                deliberationButtonPullUp: true,
                goodLiftButton: 47,
                goodLiftButtonPullUp: true,
                resumeCompetitionButton: 53,
                resumeCompetitionButtonPullUp: true,
                summonAllRefereesButton: 17,
                summonAllRefereesButtonPullUp: true,
                summonReferee1Button: 14,
                summonReferee1ButtonPullUp: true,
                summonReferee2Button: 15,
                summonReferee2ButtonPullUp: true,
                summonReferee3Button: 16,
                summonReferee3ButtonPullUp: true,
                summonTechnicalControllerButton: 49,
                summonTechnicalControllerButtonPullUp: true,
                technicalBreakButton: 51,
                technicalBreakButtonPullUp: true,
            }),
        ],
        owlcms: owlcms,
        platform: platform,
    });
});
//# sourceMappingURL=jury-3.js.map
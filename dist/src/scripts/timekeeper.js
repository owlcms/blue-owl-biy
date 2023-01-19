"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var runner_1 = __importDefault(require("scripts/runner"));
var timekeeper_1 = __importDefault(require("lib/model/timekeeper"));
var buttons_1 = __importDefault(require("lib/model/timekeeper/buttons"));
exports.default = (function (config) {
    (0, runner_1.default)(function (_a) {
        var board = _a.board, owlcms = _a.owlcms, platform = _a.platform;
        new timekeeper_1.default({
            modules: [
                (0, buttons_1.default)({
                    board: board,
                    oneMinuteButton: 11,
                    oneMinuteButtonPullUp: true,
                    startButton: 9,
                    startButtonPullUp: true,
                    stopButton: 10,
                    stopButtonPullUp: true,
                    twoMinuteButton: 12,
                    twoMinuteButtonPullUp: true,
                }),
            ],
            owlcms: owlcms,
            platform: platform,
        });
    }, config);
});
//# sourceMappingURL=timekeeper.js.map
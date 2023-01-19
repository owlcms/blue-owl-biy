"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var referee_1 = __importDefault(require("lib/model/referee"));
var buttons_1 = __importDefault(require("lib/model/referee/buttons"));
var runner_1 = __importDefault(require("scripts/runner"));
(0, runner_1.default)(function (_a) {
    var board = _a.board, owlcms = _a.owlcms, platform = _a.platform;
    var options = {
        modules: [
            (0, buttons_1.default)({
                badLiftButton: 3,
                badLiftButtonPullUp: true,
                board: board,
                goodLiftButton: 4,
                goodLiftButtonPullUp: true,
            }),
        ],
        number: 1,
        owlcms: owlcms,
        platform: platform,
    };
    new referee_1.default(options);
    new referee_1.default(__assign(__assign({}, options), { number: 2 }));
    new referee_1.default(__assign(__assign({}, options), { number: 3 }));
});
//# sourceMappingURL=referee-single.js.map
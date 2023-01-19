"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.referees = exports.decisions = void 0;
var model_1 = __importDefault(require("lib/model"));
exports.decisions = [
    'bad',
    'good',
];
exports.referees = [
    1,
    2,
    3,
];
var Referee = /** @class */ (function (_super) {
    __extends(Referee, _super);
    function Referee(options) {
        var _this = _super.call(this, options) || this;
        _this.initialize();
        return _this;
    }
    Object.defineProperty(Referee.prototype, "debuggerName", {
        get: function () {
            return "referee:".concat(this.platform, ":").concat(this.number);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Referee.prototype, "number", {
        get: function () {
            return this.options.number;
        },
        enumerable: false,
        configurable: true
    });
    Referee.prototype.decisionConfirmed = function (decision) {
        this.debug("decision confirmed: ".concat(decision));
        this.emit('decisionConfirmed', { decision: decision });
    };
    Referee.prototype.decisionRequest = function () {
        this.debug('decision requested');
        this.emit('decisionRequest');
    };
    Referee.prototype._initialize = function () {
        var _this = this;
        this.owlcms.on('decision', function (_a) {
            var decision = _a.decision, platform = _a.platform, referee = _a.referee;
            if (platform !== _this.platform || referee !== _this.number) {
                return;
            }
            _this.decisionConfirmed(decision);
        });
        this.owlcms.on('decisionRequest', function (_a) {
            var platform = _a.platform, referee = _a.referee;
            if (platform !== _this.platform || referee !== _this.number) {
                return;
            }
            _this.decisionRequest();
        });
        this.owlcms.on('summon', function (_a) {
            var platform = _a.platform, referee = _a.referee;
            if (platform !== _this.platform || referee !== _this.number) {
                return;
            }
            _this.summon();
        });
    };
    Referee.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    Referee.prototype.publishDecision = function (decision) {
        this.debug(decision);
        this.owlcms.publishRefereeDecision({
            decision: decision,
            platform: this.platform,
            referee: this.number,
        });
    };
    Referee.prototype.summon = function () {
        this.debug('summon');
        this.emit('summon');
    };
    return Referee;
}(model_1.default));
exports.default = Referee;
//# sourceMappingURL=referee.js.map
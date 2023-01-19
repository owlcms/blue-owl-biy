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
var model_1 = __importDefault(require("lib/model"));
var Jury = /** @class */ (function (_super) {
    __extends(Jury, _super);
    function Jury(options) {
        var _this = _super.call(this, options) || this;
        _this.decisionCount = 0;
        _this.initialize();
        return _this;
    }
    Object.defineProperty(Jury.prototype, "debuggerName", {
        get: function () {
            return "jury:".concat(this.platform);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Jury.prototype, "members", {
        get: function () {
            return this.options.members;
        },
        enumerable: false,
        configurable: true
    });
    Jury.prototype._initialize = function () {
        var _this = this;
        this.decisions = {};
        this.members.forEach(function (member) {
            member.on('decision', function (_a) {
                var decision = _a.decision;
                _this.juryMemberDecision({
                    decision: decision,
                    number: member.number,
                });
            });
        });
        this.owlcms.on('decision', function (_a) {
            var decision = _a.decision, platform = _a.platform, referee = _a.referee;
            if (platform !== _this.platform) {
                return;
            }
            _this.refereeDecision({ decision: decision, referee: referee });
        });
        this.owlcms.on('resetDecisions', function (_a) {
            var platform = _a.platform;
            if (platform !== _this.platform) {
                return;
            }
            _this.resetJuryMemberDecisions();
            _this.resetRefereeDecisions();
        });
    };
    Jury.prototype.juryMemberDecision = function (_a) {
        var decision = _a.decision, number = _a.number;
        if (!this.decisions[number]) {
            this.decisionCount++;
        }
        this.decisions[number] = decision;
        this.owlcms.publishJuryMemberDecision({
            decision: decision,
            juryMember: number,
            platform: this.platform,
        });
        if (this.decisionCount !== this.members.length) {
            return;
        }
        this.members.forEach(function (member) {
            member.revealDecision();
        });
    };
    Jury.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    Jury.prototype.publishDecision = function (decision) {
        this.debug(decision);
        this.owlcms.publishJuryDecision({
            decision: decision,
            platform: this.platform,
        });
    };
    Jury.prototype.refereeDecision = function (_a) {
        var decision = _a.decision, referee = _a.referee;
        this.debug("referee decision ".concat(referee, " ").concat(decision));
        this.emit('refereeDecision', { decision: decision, referee: referee });
    };
    Jury.prototype.resetJuryMemberDecisions = function () {
        this.decisionCount = 0;
        this.decisions = {};
        this.members.forEach(function (member) {
            member.resetDecision();
        });
    };
    Jury.prototype.resetRefereeDecisions = function () {
        this.debug('reset referee decisions');
        this.emit('resetRefereeDecisions');
    };
    Jury.prototype.resumeCompetition = function () {
        this.debug('resume copetition');
        this.owlcms.resumeCompetition({ platform: this.platform });
    };
    Jury.prototype.startDeliberation = function () {
        this.debug('start deliberation');
        this.owlcms.startDeliberation({ platform: this.platform });
    };
    Jury.prototype.startTechnicalBreak = function () {
        this.debug('start technical break');
        this.owlcms.startTechnicalBreak({ platform: this.platform });
    };
    Jury.prototype.summonAllReferees = function () {
        this.debug('summon all referees');
        this.owlcms.summonAllReferees({
            platform: this.platform,
        });
    };
    Jury.prototype.summonReferee = function (referee) {
        this.debug("summon referee ".concat(referee));
        this.owlcms.summonReferee({
            platform: this.platform,
            referee: referee,
        });
    };
    Jury.prototype.summonTechnicalController = function () {
        this.debug('summon technical controller');
        this.owlcms.summonTechnicalController({ platform: this.platform });
    };
    return Jury;
}(model_1.default));
exports.default = Jury;
//# sourceMappingURL=jury.js.map
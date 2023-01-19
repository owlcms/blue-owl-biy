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
var core_1 = __importDefault(require("lib/model/core"));
var JuryMember = /** @class */ (function (_super) {
    __extends(JuryMember, _super);
    function JuryMember(options) {
        var _this = _super.call(this, options) || this;
        _this.decision = null;
        _this.initialize();
        return _this;
    }
    Object.defineProperty(JuryMember.prototype, "debuggerName", {
        get: function () {
            return "jury-member:".concat(this.number);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(JuryMember.prototype, "number", {
        get: function () {
            return this.options.number;
        },
        enumerable: false,
        configurable: true
    });
    JuryMember.prototype._initialize = function () {
        // Do nothing
    };
    JuryMember.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    JuryMember.prototype.publishDecision = function (decision) {
        this.debug(decision);
        this.decision = decision;
        this.emit('decision', { decision: decision });
    };
    JuryMember.prototype.resetDecision = function () {
        this.decision = null;
        this.emit('reset');
    };
    JuryMember.prototype.revealDecision = function () {
        this.emit('reveal', {
            decision: this.decision,
        });
    };
    return JuryMember;
}(core_1.default));
exports.default = JuryMember;
//# sourceMappingURL=jury-member.js.map
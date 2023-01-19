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
var Timekeeper = /** @class */ (function (_super) {
    __extends(Timekeeper, _super);
    function Timekeeper(options) {
        var _this = _super.call(this, options) || this;
        _this.initialize();
        return _this;
    }
    Object.defineProperty(Timekeeper.prototype, "debuggerName", {
        get: function () {
            return "timekeeper:".concat(this.platform);
        },
        enumerable: false,
        configurable: true
    });
    Timekeeper.prototype._initialize = function () {
        // Do nothing
    };
    Timekeeper.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    Timekeeper.prototype.oneMinuteClock = function () {
        this.debug('one minute');
        this.owlcms.oneMinuteClock({ platform: this.platform });
    };
    Timekeeper.prototype.startClock = function () {
        this.debug('start');
        this.owlcms.startClock({ platform: this.platform });
    };
    Timekeeper.prototype.stopClock = function () {
        this.debug('stop');
        this.owlcms.stopClock({ platform: this.platform });
    };
    Timekeeper.prototype.twoMinuteClock = function () {
        this.debug('two minute');
        this.owlcms.twoMinuteClock({ platform: this.platform });
    };
    return Timekeeper;
}(model_1.default));
exports.default = Timekeeper;
//# sourceMappingURL=timekeeper.js.map
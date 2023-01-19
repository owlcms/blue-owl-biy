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
var debug_1 = __importDefault(require("debug"));
var node_events_1 = __importDefault(require("node:events"));
var CoreModel = /** @class */ (function (_super) {
    __extends(CoreModel, _super);
    function CoreModel(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.modules.forEach(function (module) {
            module(_this);
        });
        return _this;
    }
    Object.defineProperty(CoreModel.prototype, "modules", {
        get: function () {
            return this.options.modules;
        },
        enumerable: false,
        configurable: true
    });
    CoreModel.prototype.initialize = function () {
        this.debug = (0, debug_1.default)("blue-owl:".concat(this.debuggerName));
        this._initialize();
        this.debug('initialized');
        this.emit('initialized');
    };
    return CoreModel;
}(node_events_1.default));
exports.default = CoreModel;
//# sourceMappingURL=core.js.map
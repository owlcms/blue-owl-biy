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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = __importDefault(require("debug"));
var node_events_1 = __importDefault(require("node:events"));
var mqtt_1 = __importDefault(require("mqtt"));
var Owlcms = /** @class */ (function (_super) {
    __extends(Owlcms, _super);
    function Owlcms(options) {
        var _this = _super.call(this) || this;
        Owlcms.requiredOptions.forEach(function (option) {
            if (!options[option]) {
                throw new Error("Missing required option: ".concat(option));
            }
        });
        _this.debug = (0, debug_1.default)('blue-owl:owlcms');
        var mqttOptions = {};
        if (options.mqttUsername) {
            mqttOptions.username = options.mqttUsername;
        }
        if (options.mqttPassword) {
            mqttOptions.password = options.mqttPassword;
        }
        _this.mqtt = mqtt_1.default.connect(options.mqttUrl, mqttOptions);
        return _this;
    }
    Owlcms.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.mqtt.on('message', function (topic, _message) {
                    var message = _message.toString();
                    _this.debug("".concat(topic, ": ").concat(message));
                    var _a = topic.split('/'), action = _a[2], platform = _a[3];
                    var data;
                    if (action === 'decision') {
                        var _b = message.split(' '), referee = _b[0], decision = _b[1];
                        data = {
                            decision: decision,
                            platform: platform,
                            referee: parseInt(referee),
                        };
                    }
                    else if (action === 'decisionRequest' || action === 'summon') {
                        var _c = message.split(' '), referee = _c[0], status_1 = _c[1];
                        if (status_1 === 'off') {
                            return;
                        }
                        data = {
                            platform: platform,
                            referee: parseInt(referee),
                        };
                    }
                    else if (action === 'clockStart' || action === 'resetDecisions') {
                        data = {
                            platform: platform,
                        };
                    }
                    else {
                        return;
                    }
                    _this.emit(action, data);
                });
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.mqtt.on('connect', function () {
                            _this.debug('connected');
                            _this.mqtt.subscribe('owlcms/fop/#', function (error) {
                                if (error) {
                                    console.error('Failed to subscribe to owlcms messages.');
                                    console.error(error);
                                    return;
                                }
                                _this.debug('subscribed to owlcms messages');
                                resolve();
                            });
                        });
                        _this.mqtt.on('error', function (error) {
                            _this.debug('client error');
                            reject(error);
                        });
                    })];
            });
        });
    };
    Owlcms.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.mqtt) {
                    return [2 /*return*/];
                }
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.mqtt.end(false, undefined, function () {
                            resolve();
                        });
                    })];
            });
        });
    };
    Owlcms.prototype.on = function (type, listener) {
        return _super.prototype.on.call(this, type, listener);
    };
    Owlcms.prototype.oneMinuteClock = function (_a) {
        var platform = _a.platform;
        this.mqtt.publish("owlcms/clock/".concat(platform), '60');
    };
    Owlcms.prototype.publishJuryDecision = function (_a) {
        var decision = _a.decision, platform = _a.platform;
        this.mqtt.publish("owlcms/jurybox/decision/".concat(platform), decision);
    };
    Owlcms.prototype.publishJuryMemberDecision = function (_a) {
        var decision = _a.decision, juryMember = _a.juryMember, platform = _a.platform;
        this.mqtt.publish("owlcms/jurybox/juryMember/decision/".concat(platform), "".concat(juryMember, " ").concat(decision));
    };
    Owlcms.prototype.publishRefereeDecision = function (_a) {
        var decision = _a.decision, platform = _a.platform, referee = _a.referee;
        this.mqtt.publish("owlcms/refbox/decision/".concat(platform), "".concat(referee, " ").concat(decision));
    };
    Owlcms.prototype.resumeCompetition = function (_a) {
        var platform = _a.platform;
        this.mqtt.publish("owlcms/jurybox/break/".concat(platform), 'stop');
    };
    Owlcms.prototype.startClock = function (_a) {
        var platform = _a.platform;
        this.mqtt.publish("owlcms/clock/".concat(platform), 'start');
    };
    Owlcms.prototype.startDeliberation = function (_a) {
        var platform = _a.platform;
        this.mqtt.publish("owlcms/jurybox/break/".concat(platform), 'deliberation');
    };
    Owlcms.prototype.startTechnicalBreak = function (_a) {
        var platform = _a.platform;
        this.mqtt.publish("owlcms/jurybox/break/".concat(platform), 'technical');
    };
    Owlcms.prototype.stopClock = function (_a) {
        var platform = _a.platform;
        this.mqtt.publish("owlcms/clock/".concat(platform), 'stop');
    };
    Owlcms.prototype.summon = function (_a) {
        var official = _a.official, platform = _a.platform;
        this.mqtt.publish("owlcms/jurybox/summon/".concat(platform), official.toString());
    };
    Owlcms.prototype.summonAllReferees = function (_a) {
        var platform = _a.platform;
        this.summon({
            official: 'all',
            platform: platform,
        });
    };
    Owlcms.prototype.summonReferee = function (_a) {
        var platform = _a.platform, referee = _a.referee;
        this.summon({
            official: referee,
            platform: platform,
        });
    };
    Owlcms.prototype.summonTechnicalController = function (_a) {
        var platform = _a.platform;
        this.summon({
            official: 'controller',
            platform: platform,
        });
    };
    Owlcms.prototype.twoMinuteClock = function (_a) {
        var platform = _a.platform;
        this.mqtt.publish("owlcms/clock/".concat(platform), '120');
    };
    Owlcms.requiredOptions = [
        'mqttUrl',
    ];
    return Owlcms;
}(node_events_1.default));
exports.default = Owlcms;
//# sourceMappingURL=owlcms.js.map
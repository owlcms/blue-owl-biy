"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var referee_1 = require("lib/model/referee");
var johnny_five_1 = require("johnny-five");
exports.default = (function (options) {
    var badLift = new johnny_five_1.Button({
        board: options.board,
        isPullup: options.badLiftButtonPullUp,
        pin: options.badLiftButton,
    });
    var goodLift = new johnny_five_1.Button({
        board: options.board,
        isPullup: options.goodLiftButtonPullUp,
        pin: options.goodLiftButton,
    });
    var deliberation = new johnny_five_1.Button({
        board: options.board,
        isPullup: options.deliberationButtonPullUp,
        pin: options.deliberationButton,
    });
    var summonAllReferees = options.summonAllRefereesButton
        ? new johnny_five_1.Button({
            board: options.board,
            isPullup: options.summonAllRefereesButtonPullUp,
            pin: options.summonAllRefereesButton,
        })
        : null;
    var summonTechnicalController = new johnny_five_1.Button({
        board: options.board,
        isPullup: options.summonTechnicalControllerButtonPullUp,
        pin: options.summonTechnicalControllerButton,
    });
    var resumeCompetition = new johnny_five_1.Button({
        board: options.board,
        isPullup: options.resumeCompetitionButtonPullUp,
        pin: options.resumeCompetitionButton,
    });
    var technicalBreak = new johnny_five_1.Button({
        board: options.board,
        isPullup: options.technicalBreakButtonPullUp,
        pin: options.technicalBreakButton,
    });
    var refereeButtons = referee_1.referees.reduce(function (buttons, referee) {
        var pinProperty = "summonReferee".concat(referee, "Button");
        var pullUpProperty = "summonReferee".concat(referee, "ButtonPullUp");
        buttons[referee] = new johnny_five_1.Button({
            board: options.board,
            isPullup: options[pullUpProperty],
            pin: options[pinProperty],
        });
        return buttons;
    }, {});
    return function (jury) {
        badLift.on('press', function () {
            jury.publishDecision('bad');
        });
        goodLift.on('press', function () {
            jury.publishDecision('good');
        });
        deliberation.on('press', function () {
            jury.startDeliberation();
        });
        resumeCompetition.on('press', function () {
            jury.resumeCompetition();
        });
        summonAllReferees === null || summonAllReferees === void 0 ? void 0 : summonAllReferees.on('press', function () {
            jury.summonAllReferees();
        });
        summonTechnicalController.on('press', function () {
            jury.summonTechnicalController();
        });
        technicalBreak.on('press', function () {
            jury.startTechnicalBreak();
        });
        referee_1.referees.forEach(function (referee) {
            refereeButtons[referee].on('press', function () {
                jury.summonReferee(referee);
            });
        });
    };
});
//# sourceMappingURL=buttons.js.map
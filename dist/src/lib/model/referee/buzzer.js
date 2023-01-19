"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var johnny_five_1 = require("johnny-five");
exports.default = (function (options) {
    var piezo = new johnny_five_1.Piezo({
        board: options.board,
        pin: options.piezo,
    });
    function play(song) {
        piezo.play({
            song: song,
            tempo: 600,
        }, function () {
            // For some reason, the pin tends to go high after playing,
            // so we manually set it low (off).
            piezo.off();
        });
    }
    return function (referee) {
        referee.on('decisionRequest', function () {
            play([
                ['c6', 2],
                [null, 1],
                ['c6', 2],
            ]);
        });
        referee.on('summon', function () {
            play([
                ['c4', 1],
                ['c5', 1],
                [null, 1],
                ['c4', 1],
                ['c5', 1],
            ]);
        });
    };
});
//# sourceMappingURL=buzzer.js.map
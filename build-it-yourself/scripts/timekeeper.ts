import runner from './runner';
import {
    Timekeeper,
    timekeeperButtons,
} from "blue-owl";
import type {
    Config,
} from './config';

export function doTimekeeper(conf?: Config) {
    runner(
        ({
            board,
            owlcms,
            platform,
        }) => {
            new Timekeeper({
                modules: [
                    timekeeperButtons({
                        board,
                        oneMinuteButton: 4,
                        oneMinuteButtonPullUp: true,
                        startButton: 6,
                        startButtonPullUp: true,
                        stopButton: 5,
                        stopButtonPullUp: true,
                        twoMinuteButton: 3,
                        twoMinuteButtonPullUp: true,
                    }),
                ],
                owlcms,
                platform,
            });
        },
        conf)
}

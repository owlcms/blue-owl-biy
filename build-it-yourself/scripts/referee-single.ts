import type {
    RefereeOptions,
} from 'blue-owl/dist/lib/model/referee';
import {
    DownSignal,
    Referee,
    refereeButtons,
    downSignalRelay,
} from "blue-owl";
import runner from './runner';
import type {
    Config,
} from './config';

export function doSoloReferee(conf?: Config) {
    runner(({
        board,
        owlcms,
        platform,
    }) => {
        const options: RefereeOptions = {
            modules: [
                refereeButtons({
                    badLiftButton: 11,
                    badLiftButtonPullUp: true,
                    board,
                    goodLiftButton: 10,
                    goodLiftButtonPullUp: true,
                }),
            ],
            number: 1,
            owlcms,
            platform,
        };
        new Referee(options);
        new Referee({ ...options, number: 2 });
        new Referee({ ...options, number: 3 });
        new DownSignal({
            modules: [
                downSignalRelay({
                    board,
                    duration: 1500,
                    pin: 'A0',   
                }),
                downSignalRelay({
                    board,
                    duration: 500,
                    pin: 'A1',
                }),
            ],
            owlcms,
            platform,
        })
    }, conf)
}

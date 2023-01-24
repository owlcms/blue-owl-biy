import type {
    RefereeOptions,
} from '../../src/lib/model/referee';
import Referee from '../../src/lib/model/referee';
import refereeButtons from '../../src/lib/model/referee/buttons';
import downSignalRelay from '../../src/lib/model/down-signal/relay'
import runner from './runner';
import type {
    Config,
} from '../../src/scripts/config';
import DownSignal from '../../src/lib/model/down-signal';

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

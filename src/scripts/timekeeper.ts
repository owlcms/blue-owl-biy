import runner from './runner';
import Timekeeper from '../lib/model/timekeeper';
import timekeeperButtons from '../lib/model/timekeeper/buttons';

//export default (config: Config) => {
    console.log('arguments ' + process.argv[2])
    runner(({
        board,
        owlcms,
        platform,
    }) => {
        new Timekeeper({
            modules: [
                timekeeperButtons({
                    board,
                    oneMinuteButton: 11,
                    oneMinuteButtonPullUp: true,
                    startButton: 9,
                    startButtonPullUp: true,
                    stopButton: 10,
                    stopButtonPullUp: true,
                    twoMinuteButton: 12,
                    twoMinuteButtonPullUp: true,
                }),
            ],
            owlcms,
            platform,
        });
    },
    {
        mqttPassword: "",
        mqttUrl: "mqtt://localhost:1883",
        mqttUsername: "",
        serialPort: process.argv[2],
        platform: 'A',
    });
//};

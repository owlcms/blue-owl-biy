import Jury from '../lib/model/jury';
import JuryMember from '../lib/model/jury-member';
import juryMemberButtons from '../lib/model/jury-member/buttons';
import juryMemberRgbLed from '../lib/model/jury-member/rgb-led';
import juryButtons from '../lib/model/jury/buttons';
import juryRefereeRgbLeds from '../lib/model/jury/referee-rgb-leds';
import runner from './runner';

runner(({
    board,
    owlcms,
    platform,
}) => {
    new Jury({
        members: [
            new JuryMember({
                number: 1,
                modules: [
                    juryMemberButtons({
                        badLiftButton: 11,
                        badLiftButtonPullUp: true,
                        board,
                        goodLiftButton: 12,
                        goodLiftButtonPullUp: true,
                    }),
                    juryMemberRgbLed({
                        board,
                        pins: {
                            blue: 41,
                            green: 40,
                            red: 39,
                        },
                    }),
                ],
            }),
            new JuryMember({
                number: 2,
                modules: [
                    juryMemberButtons({
                        badLiftButton: 14,
                        badLiftButton: 14,
                        badLiftButtonPullUp: true,
                        board,
                        goodLiftButton: 15,
                        goodLiftButton: 15,
                        goodLiftButtonPullUp: true,
                    }),
                    juryMemberRgbLed({
                        board,
                        pins: {
                            blue: 44,
                            green: 43,
                            red: 42,
                        },
                    }),
                ],
            }),
            new JuryMember({
                number: 3,
                modules: [
                    juryMemberButtons({
                        badLiftButton: 16,
                        badLiftButtonPullUp: true,
                        board,
                        goodLiftButton: 17,
                        goodLiftButtonPullUp: true,
                    }),
                    juryMemberRgbLed({
                        board,
                        pins: {
                            blue: 52,
                            green: 53,
                            red: 45,
                        },
                    }),
                ],
            }),
        ],
        modules: [
            juryRefereeRgbLeds({
                board,
                referee1Pins: {
                    red: 10,
                    green: 9,
                    blue: 8,
                },
                referee2Pins: {
                    red: 7,
                    green: 6,
                    blue: 5,
                },
                referee3Pins: {
                    red: 4,
                    green: 3,
                    blue: 2,
                },
            }),
            juryButtons({
                badLiftButton: 30,
                badLiftButtonPullUp: true,
                board,
                deliberationButton: 29,
                deliberationButtonPullUp: true,
                goodLiftButton: 31,
                goodLiftButtonPullUp: true,
                resumeCompetitionButton: 35,
                resumeCompetitionButtonPullUp: true,
                summonAllRefereesButton: 38,
                summonAllRefereesButtonPullUp: true,
                summonReferee1Button: 32,
                summonReferee1ButtonPullUp: true,
                summonReferee2Button: 33,
                summonReferee2ButtonPullUp: true,
                summonReferee3Button: 34,
                summonReferee3ButtonPullUp: true,
                summonTechnicalControllerButton: 37,
                summonTechnicalControllerButtonPullUp: true,
                technicalBreakButton: 36,
                technicalBreakButtonPullUp: true,
            }),
        ],
        owlcms,
        platform,
    });
});

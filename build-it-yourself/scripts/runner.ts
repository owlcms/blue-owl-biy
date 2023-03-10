import type {
    Board,
} from 'blue-owl';
import type {
    Config,
} from './config';

import {
    connectBoard,
    Owlcms,
} from 'blue-owl';
import parseConfig from './config';

export type Initializer = (options: InitializerOptions) => void;

export interface InitializerOptions {
    board: Board;
    config: Config;
    owlcms: Owlcms;
    platform: Config['platform'];
}

export default async (initializer: Initializer, config?: Config) => {
    config ||= parseConfig();

    const owlcms = new Owlcms({
        mqttPassword: config.mqttPassword,
        mqttUrl: config.mqttUrl,
        mqttUsername: config.mqttUsername,
    });

    try {
        await owlcms.connect();

        let board;
        if (config.serialPort) {
            board = await connectBoard({
                port: config.serialPort,
            });
        } else {
            board = await connectBoard();
        }

        initializer({
            board,
            config,
            owlcms,
            platform: config.platform,
        });
    } catch (error) {
        console.error(error);
        process.exitCode = 1;

        owlcms.disconnect();

        // If the process does not exit cleanly within five seconds, force close
        setTimeout(() => {
            process.exit(2);
        }, 5000);
    }
}

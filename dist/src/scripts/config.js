"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function () {
    return {
        mqttPassword: process.env['BLUE_OWL_MQTT_PASSWORD'],
        mqttUrl: process.env['BLUE_OWL_MQTT_URL'] || 'mqtt://127.0.0.1:1883',
        mqttUsername: process.env['BLUE_OWL_MQTT_USERNAME'],
        platform: process.env['BLUE_OWL_PLATFORM'] || 'A',
        serialPort: process.env['BLUE_OWL_SERIAL_PORT'],
    };
});
//# sourceMappingURL=config.js.map
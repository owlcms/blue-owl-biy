import type {
    Config,
} from '../../src/scripts/config';
import promptSync from 'prompt-sync';
import { doTimekeeper } from './timekeeper';
import { doReferees } from './referee';
import { doSoloReferee } from './referee-single';
import { doJury3 } from './jury-3';
import { doJury5 } from './jury-5';
import parseConfig from '../../src/scripts/config';
import { URL } from "url";

const envConfig = parseConfig();
const prompt = promptSync({ sigint: true });

const defaultPlatform = envConfig.platform ||= "A";
const defaultSerialPort = envConfig.serialPort;
const envUrl = process.env['BLUE_OWL_MQTT_URL'];
let defaultServer = "192.168.0.100";
let defaultMqttPort = "1883";
if (envUrl) {
    const parsedURL = new URL(envUrl)
    defaultServer = parsedURL.hostname ||= defaultServer;
    defaultMqttPort = parsedURL.port ||= defaultMqttPort
}
const defaultMqttUsername = envConfig.mqttUsername ||= "";
const defaultMqttPassword = envConfig.mqttPassword ||= "";

let configuration : Config;
let selectedDevice: string;

if (process.argv[2] == "-x") {
    // execute mode. take env values and run.
    // if using npm, this is comes after "--" in npm run script.ts -- -x
    selectedDevice = process.env['BLUE_OWL_DEVICE'] ||= "R";
    configuration = {
        mqttPassword: defaultMqttPassword,
        mqttUsername: defaultMqttUsername,
        mqttUrl: (defaultMqttPort[0] == "8" ? "mqtts://" : "mqtt://") + defaultServer + ":" + defaultMqttPort,
        platform: defaultPlatform,
        serialPort: defaultSerialPort == '' ? void 0 : defaultSerialPort,
    }
} else {
    // interactive mode
    selectedDevice = selectDevice();
    
    let selectedPlatform = prompt("platform ["+defaultPlatform+"] ")
    selectedPlatform ||= defaultPlatform;
    console.log();
    
    let selectedSerialPort = prompt("communication port ["+ (defaultSerialPort ? defaultSerialPort : "automatic detection") + "] ")
    selectedSerialPort ||= defaultSerialPort ? defaultSerialPort : '';
    console.log();
    
    let selectedMQTTServer = prompt("MQTT server address ["+defaultServer+"] ");
    selectedMQTTServer ||= defaultServer;
    
    let selectedMQTTPort = prompt("MQTT server port ["+defaultMqttPort+"] ");
    selectedMQTTPort ||= defaultMqttPort
    
    let selectedMQTTUsername = prompt("MQTT username ["+defaultMqttUsername+"] ")
    selectedMQTTUsername ||= defaultMqttUsername;
    
    let selectedMQTTPassword = prompt("MQTT password ["+defaultMqttPassword+"] ")
    selectedMQTTPassword ||= defaultMqttPassword;
    console.log()
    
    configuration = {
        mqttPassword: selectedMQTTPassword,
        mqttUsername: selectedMQTTUsername,
        mqttUrl: "mqtt://" + selectedMQTTServer + ":" + selectedMQTTPort,
        platform: selectedPlatform,
        serialPort: selectedSerialPort == '' ? void 0 : selectedSerialPort,
    }
}



//if (process.env) process.env['DEBUG'] = "blue-owl:*"

switch (selectedDevice) {
    case "T": {
        doTimekeeper(configuration);
        break;
    }
    case "R": {
        doReferees(configuration);
        break;
    }
    case "S": {
        doSoloReferee(configuration);
        break;
    }
    case "3": {
        doJury3(configuration);
        break;
    }
    case "5": {
        doJury5(configuration);
        break;
    }
    default: {
        console.log("Error: Expected R S T 3 or 5")
        break;
    }
}

function selectDevice() {
    const defaultDevice = process.env['BLUE_OWL_DEVICE'] ||= "R"
    const valid = new RegExp('[rRsStT35]');

    console.log("Please select the desired settings. ENTER selects the [default value]");
    console.log("");
    let selectedDevice = null;
    while (selectedDevice == null || !valid.test(selectedDevice)) {
        if (selectedDevice != null) {
            console.log("");
            console.log("Error: Invalid device choice.");
            console.log("");
        }
        console.log("Device types:");
        console.log("  R = 3 referees");
        console.log("  S = Single referee");
        console.log("  T = Timekeeper");
        console.log("  3 = 3-person Jury");
        console.log("  5 = 5-person Jury");
        selectedDevice = prompt("Type of device ? ["+defaultDevice+"] ");
        selectedDevice ||= defaultDevice;
    }
    return selectedDevice.toUpperCase();
}


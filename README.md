
> This repository is **obsolete**
> 
> For the Blue-owl official software, see [Blue Owl](https://github.com/scottgonzalez/blue-owl) 
> 
> For building your own devices or creating your own configurations, see [owlcms-firmata](https://github.com/owlcms/owlcms-firmata) 




# Blue Owl Build-it-yourself

[Blue Owl](https://github.com/scottgonzalez/blue-owl) provides Technical Official device integration for [OWLCMS](https://owlcms.github.io/owlcms4/). It relies on the [Johnny-Five](http://johnny-five.io/) library to control the refereeing devices' microprocessors using the [Firmata](https://github.com/firmata/protocol) protocol.

### About this repository

- This repository provides a way to use the Blue-Owl software with your own devices.  The original projects targets specially-built printed commercial circuit boards (PCB).  But you build your own devices, you don't have such constraints and the pin allocations in this version are more natural.
- This repository adds a `build-it-yourself` directory that contains
  - Diagrams for building your own devices.  An interactive version of the diagram can be loaded on  [wokwi.com](https://wokwi.com) to get the exact pin numbers etc.
  - Scripts for running the device using the blue-owl library, and a pre-built Windows executable.  If you build your own design and need to change pin assignments, then you can simply change the scripts, and even [rebuild your own executable](BUILDING.md))
  - Definitions of the build-it-yourself devices and instructions for running them on the [wokwi.com](https://wokwi.com) simulator.  You can actually connect the simulated devices to owlcms, click on the virtual buttons, see the virtual LEDs and hear the virtual beeps.

## Features

- No Arduino coding is required to build the devices.  The Firmata firmware (included in the downloads) is loaded on the devices, once.  A laptop provides power and a program (included) is used to control the devices.
- Schematics and configurations are provided for building the physical devices yourself.  If there are parts you don't need, simply omit them.
- If you need to change the pin assignments, there are instructions for doing so and rebuilding the control program.  The firmware does not change.

## Overview

The following diagram illustrates the concept. We use the Refereeing devices as an example, but the same applies to the Jury and Timekeeper devices.

![Firmata](build-it-yourself/overview.drawio.png)

- The Referee Control Box contains a tiny Arduino Nano microprocessor that is pre-loaded with the Firmata software.  It gets its power and instructions from the Countdown athlete-facing laptop.   A version with [Down Signal Relays](./build-it-yourself/diagrams/referee/refereeBoxDown.png) relays is also available.   The referee keypads are connected to the Arduino with a wire and only contain two buttons, a buzzer, and a LED.

  ![refBox](build-it-yourself/diagrams/referee/refereeBox.png)

- Blue Owl acts as a relay between owlcms and the Arduino.
  - The control box reads the buttons pressed by referees when they enter decisions.  it notifies Blue Owl using the Firmata protocol.  Blue Owl relays the events to owlcms using [MQTT messages](https://owlcms.github.io/owlcms4/#/MQTTMessages).
  - Blue Owl reads MQTT commands from owlcms and sends Firmata instructions to the referee control box. The control box can then activate the LEDs or buzzers on the referee devices.
  
- If owlcms is modified, the only thing that needs to change is the Blue Owl software on the laptop.
  - There are different launchers for each device that call the appropriate definition script for the device.
  - The jury Blue Owl would run on the jury laptop, the referee Blue Owl would run on the countdown laptop, and the timekeeper Blue Owl would run either on the announcer or timekeeper laptop.

## Running

The `Releases` directory in this fork contains a simple interactive Windows executable for launching the control program on a laptop (see [instructions](INSTALLING_Windows.md)). The necessary files for starting the program on Mac and Linux are also available (see [instructions](INSTALLING_Mac_Linux.md)).

## Supported Devices

### Referees

Referee control boxes may be used in compliance with the IWF Referee Light System as documented in TCRR 3.3.6. The referee control boxes support:

* White and red buttons for "Good lift" and "No lift".
* White and red LEDs to confirm decision entry.
* LED, buzzer, and vibration to signal when a decision is required.
* LED, buzzer, and vibration to signal when summoned to the jury table.

#### Down Signal

The down signal box may be used in compliance with the IWF Referee System as documented in TCRR 3.3.6.5. The down signal box supports:

* Visible signal via a relay.
* Audible signal via a relay.

#### Single Referee Mode

For competitions run with only one referee, simply configure all three referees with the same buttons. This will cause the single referee control box to send a decision for all three referees

### Timekeeper

The timekeeper control box may be used to fully control the timing clock as documented in TCRR 7.10. The timekeeper control box supports:

* Starting the clock.
* Stopping the clock.
* Resetting the clock to one minute.
* Resetting the clock to two minutes.

### Jury

The jury control panel and jury control units may be used to fulfill all jury member requirements as documented in TCRR 3.3.6.11, TCRR 3.3.6.12, and TCRR 7.5. The jury control panel supports:

* Displaying referee decisions in real-time.
* Displaying jury member decisions.
* Summoning a referee.
* Summoning the technical controller.
* Stopping the competition for deliberation.
* Stopping the competition for a technical break.
* Resuming the competition.

## API

Blue Owl is programmed in JavaScript using the Johnny-Five implementation of Firmata.  The full specification of the devices is documented in the [API](API.md) documentation.

Blue Owl talks to owlcms using MQTT messages.  The full list of messages supported by owlcms is documented: [MQTT messages](https://owlcms.github.io/owlcms4/#/MQTTMessages).

## About the names

Should you wonder,  OWL stands for Olympic Weightlifting. Blue is the color of the official's suits, and the name is a salute to their keen eyes.  Johnny-Five is a take on the [Johnny 5](https://robotics.fandom.com/wiki/Johnny_5) sentient robot from the Short-Circuit movie.

## License

Copyright Scott González. Released under the terms of the ISC license.

Build-it-yourself files and layouts are Copyright Jean-François Lamy, Released under the terms of the ISC license.

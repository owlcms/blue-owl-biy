# Diagrams

This directory contains definitions and diagrams for the devices

## Interactive diagrams

- The definitions use the Wokwi JSON format and can be run on the free wokwi.com simulator.
- It is actually easier to look at the diagrams on the wokwi site because mousing over the pins reveal their number.

To look at a file

1. go to the wokwi.com site and sign up/login
2. Go to your own projects (there is an icon at the top right)
3. Click on "+ New Project" at the top.
4. Start a new Arduino Nano project (except for the jury, which is Arduino Mega)
5. Go to the design directory you want in this area (jury, referee, timekeeper)
6. Select the content  `diagram.json` (select all) and paste it in the diagram.json window on Wokwi.
7. Select the content `sketch.ino` and paste it in the sketch.ino on Wokwi.

## Running a simulation

### Windows Instructions

1. (Initial installation, only once) Install the com0com package, version 2.2.2.0
   1. use the setup command prompt to create a pair of serial ports (e.g. COM5 and COM6)
      <br>`install PortName=COM5 PortName=COM6`
   2. You may close the program once the ports are created
2. Start your MQTT server
3. Start owlcms
4. Start Chrome or Edge (must be one or the other)
5. Go to https://wokwi.com and open your project
6. In the diagram.json window, click ONCE and hit `F1` .
7. Type the letters `load h` and select `Load HEX file and start simulation`
8. The browser will open a dialog asking for a serial port to open
   - Select the odd-numbered port (COM5)  that is the other member of the pair.
   - Click `Select`
9. Use the startdevice script and specify the other port (COM6 in the example)

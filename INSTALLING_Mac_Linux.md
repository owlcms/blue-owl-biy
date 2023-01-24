# macOS and Linux instructions

#### 

## Configuring the Device-hosting laptops

> The devices need to be connected to a laptop that provides power over USB. Blue Owl runs on the laptop and controls the physical device, also over USB.
>
> **These steps are necessary  on each machine that will have devices connected to it**



We will install two pieces of software, nvm and npm

- nvm  which is a tool for installing the Node.js software that actually executes Blue Owl.
- npm ("Node Package Manager") which is what we will be using to make sure Blue Owl has all its required pieces installed and to actually start things.

#### Installing NVM

- On Windows, Download the [latest release](https://github.com/coreybutler/nvm-windows/releases/latest/download/nvm-setup.exe) and execute it.
- For macOS, see [this article](https://collabnix.com/how-to-install-and-configure-nvm-on-mac-os/) .

- On Linux, there are different methods based on the distribution. For Ubuntu, see [this article](https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/)



#### Installing Node.js and NPM

nvm is now used to install npm. 

You now need to start a command shell.  On Windows 10/11 left-click *once* on `⊞` and type `cmd` (or use the  `⊞` `R` shortcut to run a command. and then type `cmd`). On a Mac or Linux, start a Terminal session.

Type the following commands to install the required version (16) and make it the default version.

```
nvm install 16
nvm use 16
nvm alias default 16
```



#### Installing the Blue Owl Packages

- on macOS or Linux, obtain the blue-owl.tar.gz or the zip from **https://github.com/owlcms/blue-owl/releases**  and unpack it it to a directory of your choice (for example `~/blue-owl`)

Then use a command line window to go to the directory and make everything available.

```
cd ~/blue-owl
npm install
```




## Starting the device on macOS or Linux

1. Start a terminal and go to your blue-owl installation area (`~/blue-owl` or whatever you used.)

2. Run the command 

   ```
   npm run ts build-it-yourself/scripts/startdevice.ts
   ```

   and answer the prompts.  Refer to the [Windows instructions](INSTALLING_Windows.md) for details about the values.
# Paw-ON

<img src="foto de LOGO" width="600">

## Introduction

If you have a dog, cat or any pet that needs to go into a kennel when travelling, and be left in the hands of airlines services, you know how stressful and problematic it is for your precious friends. 

The main problem thus is: The horrid care pets get when they are transported in the aircraft. 

<img src="https://i.ibb.co/zhMTTGJ/perro.png" width="600">

Sometimes we need to send pets with an airline service for travel to another country. How can we be sure they're fine at all times? Take into consideration how baggage is treated.

Always use technology to improve the world, if you are a black hat or gray hat hacker please abstain at this point ......... or at least leave your star to make me feel less guilty XP.

# Table of contents
* [Introduction](#introduction)
* [Solution](#solution)
* [Materials](#materials)
* [Connection Diagram](#connection-diagram)
* [Kit Setup](#kit-setup)
* [Wio Arduino Setup](#wio-arduino-setup)
* [Soracom Platform Setup](#soracom-platform-setup)
* [AWS IoT Setup](#aws-iot-setup)
* [AWS Lambda Setup](#aws-lambda-setup)
* [AWS SNS Setup](#aws-sns-setup)
* [AWS DynamoDB Setup](#aws-dynamodb-setup)
* [WEB Interface Setup](#web-interface-setup)
* [The Final Product](#the-final-product)

## Solution

<img src="https://animais.culturamix.com/blog/wp-content/gallery/animal-de-estimacao-no-aviao-2/Animal-De-Estima%C3%A7%C3%A3o-No-Aviao-5.jpg" width="1000">

I will make an integral IoT solution to monitor the pet’s environment based on RSL10-SENSE-DB-GEVK, in order to ensure their well-being throughout their journey. All this also integrated with a AWS as backend and NodeRed based platform which, in addition to showing the status of the package in real time, also sends notifications at the frequency that is convenient. 

The current monitoring solutions are restricted to only lifeless packages, this making the continuous monitoring of pets a novelty. It is useful because thanks to this system pet owners can be 100% sure that their pets will be well and can monitor and follow them throughout their flight or any travel.

## Materials:

List the hardware and software you will use to build this.

Hardware: 
- RSL10-SENSE-DB-GEVK.
- Smartphone APP Gateway. 
- Laptop as Server.

Software: 
- Node-RED.
- AWS.
  - AWS IoT.
  - AWS SNS.
  - AWS Lambda.
  - AWS Dynamo.

Optional Hardware:

- Tablet as UI.

## Connection Diagram:

 <img src="https://i.ibb.co/C2RZz5G/diagram.png" width="1000">

## Kit Setup:

Para la configuración correcta del kit, sera necesario descargar el IDE oficial de ON Semiconductor.

IDE Link: https://www.onsemi.com/PowerSolutions/gatedDocument.do?method=getGatedDocument&docId=1172113

El manual para configurar correctamente el IDE es el siguiente:

Link: https://www.onsemi.com/pub/Collateral/EVBUM2614-D.PDF

Todas las dependencias del programa están en la carpeta "Dependencies Pack", puedes descargarlas directamente desde la pagina de ON Semiconductor, pero recomiendo usar las que están en la carpeta.



1. Install and connect your environment:

1.1.Create a web account:

 - Go to https://www.brainium.com/portal and select ‘sign up’.
 - You will receive a key by e-mail, use it to validate your account creation.
 
 <img src="https://i.ibb.co/gTVr5G2/sing.png" width="1000">
 
1.2.Install your gateway:

https://play.google.com/store/apps/details?id=com.brainium.android.gateway&hl=es_MX

You can use an iOS, Android (phone or tablet), or a Linux Raspberry PI to act as a Gateway
for your Brainium solution and connect your SmartEdge Agile device to Brainium Cloud.

For iOS and Android gateway you need to install Brainium Gateway mobile app. There are
two ways to get Brainium gateway mobile application:

1) Scan QR code located on the Agile device packaging. You will be redirected to the
needed mobile app download page. If redirect brings you to www.brainium.com/apps,
tap on “Get it” button for iOS or Android.

2) Open the Equipment page on Brainium and click on “Get it” button for iOS or Android
to be redirected to the mobile app download page.

For Linux gateway, open the Equipment page on Brainium and click the “Get it” button for
Linux gateway. You will be redirected to www.brainium.com/apps/linux containing all the
instructions to download and install the Linux gateway application.

Install Brainium iOS, Android, or Linux gateway; then enter the gateway application with the
same credentials you used when registering on the web portal. Then your gateway will
appear in the web app list of gateways (Equipment → Gateways).

1.3.Pair Agile device:

Turn on your Agile device by pressing the button for more than 2 seconds. When device is
turned on, it will start blinking with blue light.

Note: If you turn on the device while being in charge, you will see one LED in red for charge
indication and one LED blinking blue at the same time. For detailed description of Agile
device light indication and button behavior see Know your Agile device section below.

Ensure that Brainium Gateway is always visible on your mobile, no screen lock (for iOS app
as it will not work in background). Ensure the Brainium Gateway is connected to the cloud.

Go to Brainium portal ‘Equipment’ page. You will see your gateway ID and gateway name.
The name can be changed as needed while ID always remains the same.

Press ‘+’ to connect the Agile device.

 <img src="https://i.ibb.co/j56Zdy2/bbbbm.png" width="1000">

You will be asked to accept the terms of Brainium discovery period. After that, each device
you add to the portal for the first time will have the following limits:

- up to 180 days of usage,
- up to 15GB of re-usable cloud storage,
- up to 2GB of telemetry tracking traffic.

Select your device in a list and click on “Connect” (Connection will be established in 20-30
seconds).

<img src="https://i.ibb.co/Ybcx6Nh/device1.png" width="1000">

Now you can rename your Agile device, view it in the list of devices and add it to your
project.

1.4.Firmware update:

Brainium Portal allows user to keep his device updated and push a new firmware for all the
users by using “Firmware Over the Air” update functionality.

You can get 2 types of updates: mandatory (the user will see a notification right after the
pairing and update will start automatically without user approval) and non-mandatory (the
user has possibility to choose whether/when she/he wants to update the device or not).

Go to Equipment → Device to check if any new FW is available. You can see a notification
on the page header also. 

The update will start when click the icon . The icon will change its state showing an update
progress:

After the firmware downloading, the icon will change its state again notifying the user about
device rebooting:

Important note: when firmware rebooting process is started don’t turn off the device and
gateway till the completion of the firmware update.

When updating process is finished you will get a notification message. Update icon will
disappear until a new firmware version is available. 

## Train:

  - We created a new workspace.
  
<img src="https://i.ibb.co/9rGSVnX/WS1.png" width="1000">

  - We give the project a name.
  
  <img src="https://i.ibb.co/cCvszMs/WS2.png" width="1000">

  - We select the device that will obtain the patterns of the machine.
  
  <img src="https://i.ibb.co/nfK3wCQ/WS3.png" width="1000">

  - In our case we connect the machine to our bridge simulator, as you can see in the following video to detect oscilation patterns.

[![SGD](https://img.interempresas.net/fotos/1843350.jpeg)](https://youtu.be/cFr_DeH4-iQ)

Sorry github does not allow embed videos.

- Once we have a large sample of patterns, we rename the patterns that are relevant to our model and we create the model.

<img src="https://i.ibb.co/qr4hqsf/Capture11.png" width="1000">

The patterns we recorded were the following, the most important for us and our notification that predictive maintenance is required is Max Vibration S:

- S1: Static State.
- Med Vibration S.
- S2: Static State.
- Max Vibration S.
- S3: Static State.

- Once the model is created, we go to the projects tab and create a new one.

<img src="https://i.ibb.co/Wyz3VrH/tab.png" width="1000">

- We assign to our project the BBBM device.

<img src="https://i.ibb.co/1Xb4kCB/bbbbbbbm.png" width="1000">

# IFTTT:

- First we need to create an account in IFTTT, fortunately Brainium has an integration with this platform for integration of services.

<img src="https://i.ibb.co/Bf9cYLg/Capture1.png" width="1000">

- We search for "Brainium" in the search bar.

<img src="https://i.ibb.co/tDLgCLW/Capture2.png" width="1000">

- We enter any of the applets and press on the author Brainium.

<img src="https://i.ibb.co/KbR8SJ8/Capture3.png" width="1000">

- We select "Connect" to make the connection with the Brainium platform.

<img src="https://i.ibb.co/SxMmKXB/Capture45.png" width="1000">

- We put our credentials to connect.

<img src = "https://i.ibb.co/LJ5R4MH/Capture55.png" width = "1000">

- We allow the access.

<img src = "https://i.ibb.co/6rg7qqx/Capture56.png" width = "1000">

- We selected the Applet "Get all Brainium alerts on your device".

<img src = "https://i.ibb.co/y42CbmL/Capture57.png" width = "1000">

- Turn ON and thats all!

<img src = "https://i.ibb.co/sJ23cFV/Capture58.png" width = "1000">

- To finish this, we need to install the IFTTT app on your device.

https://play.google.com/store/apps/details?id=com.ifttt.ifttt&hl=es_MX

## Demo:

In this video we will present the demo of our product and also we will show you the search for the best AI to do it, please enjoy it.

Video: Click on the image:

[![BBBM](https://i.ibb.co/zF0d7FV/BBBM.png)](https://youtu.be/IpRtHPIniXw)

Sorry github does not allow embed videos.

* [Table of Contents](#table-of-contents)
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

Nota: Toda la configuración del kit esta perfectamente documentada en el documento, asi que este tutorial empezara desde la configuración de la aplicación movil para este proyecto.

## App Setup - Part 1:
 
- Install your gateway from this link:

<img src="https://i.ibb.co/CHtGJZj/image.png" width="700">

iOS:https://apps.apple.com/us/app/rsl10-sense-and-control/id1451974010

<img src="https://i.ibb.co/q1c3S5h/image.png" width="700">

Android:https://play.google.com/store/apps/details?id=com.onsemi.rsl10senseandcontrol&hl=es_VE

- Selecciona el dispositivo que vas a configurar.

<img src="https://i.ibb.co/kcXVbxx/IMG-0090.png" width="250">

- Seleccionamos los sensores a utilizar.

<img src="https://i.ibb.co/0FRHJnc/IMG-0066.png" width="250">

- Si todo funciona bien, podremos ver los sensores obteniendo información.

<img src="https://i.ibb.co/4jzYsKM/IMG-0070.png" width="200"><img src="https://i.ibb.co/ZHXdWcH/IMG-0069.png" width="200"><img src="https://i.ibb.co/R7pjLfM/IMG-0068.png" width="200"><img src="https://i.ibb.co/6Pn7C8k/IMG-0067.png" width="200">

- Una de las principales dificultades para realizar la transmisión por MQTT correctamente, es saber a que Topic se esta mandando toda nuestra información, este Topic sera el mismo para todos los broker que configuremos, sin embargo para obtenerlo, deberemos realizar una pequeña prueba con algún Broker de MQTT que nos permita revisar todos los Topics, en el caso de AWS, no es posible hacer esto, asi que obtendremos el topic mediante un broker local de Mosquitto.

Link: https://mosquitto.org/download/

- Para acceder al broker de mosquitto tendremos que configurar el broker en nuestra app.

- Entra en el símbolo del engrane en la esquina superior derecha.

<img src="https://i.ibb.co/80qj6nV/IMG-00902.png" width="200">

- Presiona el switch "Enable Broadcast" y luego entra en la opción Manage Brokers.

<img src="https://i.ibb.co/WFxJYyX/IMG-0071.png" width="200">

- Presionamos el símbolo de + en la esquina superior derecha para agregar el broker.

<img src="https://i.ibb.co/4dxwFWb/IMG-0072.png" width="200">

- Configura las credenciales de la siguiente forma.

  - Client Name: "Any Name"
  - Protocol: tcp
  - URL: IP From the server in your local network.
  - Port Number: 1883
  - Username: null
  - Password: null

<img src="https://i.ibb.co/jV86Lwk/IMG-0095.png" width="200">

- Empieza el broadcast de los datos y en tu computadora ejecuta el siguiente comando en tu CMD or Terminal, para escuchar todos los topics de tu broker y por lo tanto el de tu device.

Nota: aveces el broker de mosquitto no se activa de forma automática en windows, les agrego en la carpeta "Scripts" dos archivos .bat que permiten encender y apagar el broker al darles clic, ejecútenlos como administrador.

Nota 2: En la mayoria de los brokers, el simbolo de # se usa como wildcard para los topics.

    mosquitto_sub -v -t #

- Tu topic se vera de la siguiente forma.

<img src="https://i.ibb.co/1nqFHmS/topic.png" width="1000">

Guarda ese topic ya que sera el topic de publicación en todos los brokers.

## AWS Setup:

AWS funciona a travez de roles, estos roles son credenciales que nosotros creamos para que los servicios se comuniquen entre si, para poder realizar toda nuestra integracion requerimos crear un role que permita la transmision efectiva de todos los servicios, por lo tanto eso sera lo primero a realizar.

Nota: siempre empezar por aqui cuando realicemos algun proyecto con AWS.

### IAM:

- Entramos a la consola de IAM.

<img src="https://i.ibb.co/CHBndXs/image.png" width="1000">

- Entramos en la pestaña de roles y presionamos "Create role".

<img src="https://i.ibb.co/1fm8rhr/image.png" width="1000">

- Creamos un role enfocado en la plataforma IoT.

<img src="https://i.ibb.co/42Vv4dY/image.png" width="1000">

- Presionamos Next hasta el review.

<img src="https://i.ibb.co/f22SfJ0/image.png" width="1000">

- Ahora tenemos que agregarle los permisos adicionales al Role, en la pestaña de roles entra al role que acabamos de crear y presiona el boton de Attach policies.

<img src="https://i.ibb.co/z5kVpXR/image.png" width="1000">

- Dentro de las policies agrega el siguiente:

  - AmazonDynamoDBFullAccess

<img src="https://i.ibb.co/7r0KcNJ/image.png" width="1000">

- Una vez terminado eso ahora si podemos empezar la configuración de la Rule dentro de AWS IoT Core.

### DynamoDB

En este caso la configuración de AWS IoT ya es proporcionada por la documentación oficial de ON semiconductor, sin embargo yo les mostrare como configurar las Rules para conectar el resto de servicios de AWS.

Link: https://www.onsemi.com/pub/Collateral/AND9831-D.PDF

- Una vez recibamos los datos a nuestro AWS IoT Core, configuraremos las Rules para conectar los siguientes servicios.

<img src="https://i.ibb.co/zhzZXGh/Create.png" width="1000">

- Le colocamos cualquier nombre a la rule.

<img src="https://i.ibb.co/Rj05MW5/image.png" width="1000">

- En el SQL Query colocaremos nuestro topic.

<img src="https://i.ibb.co/R6Yqh0V/image.png" width="1000">

- La primera rule que vamos a crear sera para guardar todos los datos en una DynamoDB.

<img src="https://i.ibb.co/nRm3WNy/image.png" width="1000">

- Presionamos "Create a new resource" para crear la tabla donde guardaremos los datos.

<img src="https://i.ibb.co/Hn4TYS2/image.png" width="1000">

- Para nuestra tabla usaremos los siguientes parámetros, sugiero que uses específicamente estos, ya que en nivel de producción todos los números de device serán diferentes y en la columna "Time" vamos a implementar una función especial de TIMESTAMP.

<img src="https://i.ibb.co/ZWR8GcG/image.png" width="1000">

- Una vez creado el recurso regresamos a 

<img src="https://i.ibb.co/YtjVBjd/image.png" width="1000">

La función especial en Sort Key value es:

    ${parse_time("yyyy.MM.dd G 'at' HH:mm:ss z", timestamp() )}

- Una vez este terminado eso, habremos terminado la primera rule, en este caso debido a que la rule para la lambda utiliza un SQL query diferente, ya no añaderemos mas acciones a esta rule.

### Lambda:

- Para crearemos una nueva rule pero utilizando el siguiente SQL Query.

<img src="https://i.ibb.co/Np6R5GQ/image.png" width="1000">

- Añadiremos a esta rule la siguiente acción:

<img src="https://i.ibb.co/n3H5576/image.png" width="1000">

- Presionamos el botón de "Create a new Lambda Function":

<img src="https://i.ibb.co/5sLHqy2/image.png" width="1000">

- Configuramos la lambda de la siguiente forma y la creamos:

<img src="https://i.ibb.co/68j2BXJ/image.png" width="1000">

- Una vez creada la lambda bajamos a la seccion de Execution role y presionamos el boton View the YOURROLE on the IAM console para poder agregar la police de SNS para los SMS:

<img src="https://i.ibb.co/K9QRFc4/image.png" width="1000">

- Agreamos el servicio de SNS   
    - AmazonSNSFullAccess 

<img src="https://i.ibb.co/xJV8jxX/image.png" width="1000">

- Una ves terminado eso, seleccionamos la lambda en nuestra rule para terminar de configurar el trigger de la lambda.

<img src="https://i.ibb.co/zh8Fq0C/image.png" width="1000">

- Antes de programar la Lambda tendremos que configurar el servicio de SMS a traves de SNS.

<img src="https://i.ibb.co/RbjHG8c/image.png" width="1000">

- Presionamos el boton de "Create Topic" para crear nuestro servicio de mensajes.

<img src="https://i.ibb.co/fNhCPfh/image.png" width="1000">

- Ponerle titulo al Topic y crearlo.

<img src="https://i.ibb.co/YDZXHC5/image.png" width="1000">

- Guarda el numero de ARN, ya que lo vamos a necesitar para configurar la lambda.

<img src="https://i.ibb.co/NpBxLj1/image.png" width="1000">

- Presionamos el botón de "Create subscription".

<img src="https://i.ibb.co/bvdLmBW/image.png" width="1000">

- Seleccionamos como "Protocol" SMS y en Endpoint pon tu numero de celular (Marcacion internacional).

<img src="https://i.ibb.co/Kw1F5SW/image.png" width="1000">

- Listo hemos terminado de crear los servicios necesarios para utilizar la lambda correctamente, ahora regresamos a la lambda y copia el código en la carpeta Lambda Code y pegalo en tu Lambda.

<img src="https://i.ibb.co/FztvcY8/image.png" width="1000">

- La parte mas importante del coodigo son los Thresholds, cada uno de ellos se obtuvo de las siguientes referencias.

- Air Quality: RSL10 Reference.
- Max Accel Limit: https://web.archive.org/web/20170104164718/http://www.au.af.mil/au/aupress/digital/pdf/book/b_0113_brulle_engineering_space_age.pdf
- Max Pressure on Flight: https://www.who.int/ith/mode_of_travel/cab/en/
- Max Degrees: 45 degrees maximum static friction before the dog slips
- Max Magnetic Field: https://www.who.int/peh-emf/publications/facts/fs322/en/
- Min and Max, Temperature and Humidity: http://www.dartmouth.edu/~cushman/courses/engs44/comfort.pdf
- Max Lux Level: https://www.engineeringtoolbox.com/light-level-rooms-d_708.html

## IoT Things:

Ya que tenemos todo nuestra plataforma lista, tenemos que crear los accesos para comunicarnos con ella, asi que tendremos que crear 2 Things en este caso, la primera se para nuestro modulo de RSL10 y la otra sera para la UI de NodeRed.

Nota: Para configurar la app, puedes usar el siguiente manual oficial de ON Semiconductor también.

Link: https://www.onsemi.com/pub/Collateral/AND9831-D.PDF

- First we have ti access our AWS console y look for the IoT core service:

<img src="https://i.ibb.co/KVbtQLR/image.png" width="600">

- Obtain your AWS endpoint, save it because we will use it to setup the RSL10 App and the webpage.

<img src="https://i.ibb.co/ZYwrdfR/image.png" width="600">

- In the lateral panel select the "Onboard" option and then "Get started".

<img src="https://i.ibb.co/gmKxc7P/image.png" width="600">

- Select "Get started".

<img src="https://i.ibb.co/XSxSxbF/image.png" width="600">

- In "Choose a platform" select "Linux/OSX", in AWS IoT DEvice SDK select "Python" and then click "Next".

<img src="https://i.ibb.co/JR69Fdd/image.png" width="600">

- In Name write any name,remember this process you will do it twice, so name things so that you can differentiate the credentials that you will put in NodeRed and in the RSL10 app, you'd like and then click on "Next step".

<img src="https://i.ibb.co/NNLqqM0/image.png" width="600">

- In the section, "Download connection kit for" press the button "Linux/OSX" to download the credential package (which we will use later) and click on "Next Step".

<img src="https://i.ibb.co/RHVTRpg/image.png" width="600">

- Click "Done".

<img src="https://i.ibb.co/N9c8jbG/image.png" width="600">

- Click "Done".

<img src="https://i.ibb.co/DtBxq0k/image.png" width="600">

- In the lateral bar, inside the Manage/Things section we can see our thing already created. Now we have to set up the policy of that thing for it to work without restrictions in AWS.

<img src="https://i.ibb.co/dQTFLZY/image.png" width="600">

- In the lateral bar, in the Secure/Policies section we can see our thing-policy, click on it to modify it:

<img src="https://i.ibb.co/jThNgtc/image.png" width="600">

- Click on "Edit policy document".

<img src="https://i.ibb.co/gV0tMtf/image.png" width="600">

Copy-paste the following text in the document and save it.

    {
    "Version": "2012-10-17",
    "Statement": [
        {
        "Effect": "Allow",
        "Action": "iot:*",
        "Resource": "*"
        }
    ]
    }

<img src="https://i.ibb.co/ydtTqB2/image.png" width="600">

- Once this is done, we will go to our pc and to the folder with the credentials previously downloaded and extract them.

<img src="https://i.ibb.co/mFKPxcY/image.png" width="600">



## App Setup - Part 2:

Android: si estas configurando AWS en un Android, pasa mediante USB los certificados para que puedas configurarlos fácilmente.

iPhone: si estas configurando AWS en un iPhone, lo mas sencillo es poner los certificados desde https://www.icloud.com/# en la aplicación de "iCloud Drive".

<img src="https://i.ibb.co/CJg26xW/image.png" width="1000">

Ya que tenemos los certificados para el device lo configuraremos de la siguiente forma.

- Entra en el símbolo del engrane en la esquina superior derecha.

<img src="https://i.ibb.co/80qj6nV/IMG-00902.png" width="200">

- Presiona el switch "Enable Broadcast" y luego entra en la opción Manage Brokers.

<img src="https://i.ibb.co/WFxJYyX/IMG-0071.png" width="200">

- Presionamos el símbolo de + en la esquina superior derecha para agregar el broker.

<img src="https://i.ibb.co/4dxwFWb/IMG-0072.png" width="200">

- Set Client Name, Device ID, Protocol, URL and Port Number.

  - Client Name: ANYNAME
  - Device ID: ANYNAME
  - Protocol: SSL
  - URL: Your AWS Endpoint
  - Port Number: 8883 (443 doesn't work)
  - Username and Password: Empty

<img src="https://i.ibb.co/55nJRcM/IMG-0073.png" width="200">

-  Import all the certificates (CA certificate inside "Cert" folder)

    - CA Certificate

    <img src="https://i.ibb.co/MfNQbCM/IMG-0074.png" width="200">

    - Thing Certificate

    <img src="https://i.ibb.co/mhQC9YB/IMG-0075.png" width="200">

    - Private Key Certificate

    <img src="https://i.ibb.co/pzhZx9K/IMG-0077.png" width="200">

    - Password Empty

    <img src="https://i.ibb.co/4gWLrNw/IMG-0078.png" width="200">

- Presiona "Save" en la esquina superior derecha para completar la configuración.
 
- Para empezar el broadcast hacia AWS presiona en la aplicación el siguiente botón.

<img src="https://i.ibb.co/GpWvN9m/IMG-0091.png" width="200">





Los valores en la base de datos se veran asi.

https://i.ibb.co/kB711xp/image.png

1.3. Selecciona el dispositivo que vas a configurar.

<img src="https://i.ibb.co/kcXVbxx/IMG-0090.png" width="250">

1.3. Selecciona el dispositivo que vas a configurar.

<img src="https://i.ibb.co/kcXVbxx/IMG-0090.png" width="250">

1.3. Selecciona el dispositivo que vas a configurar.

<img src="https://i.ibb.co/kcXVbxx/IMG-0090.png" width="250">

1.3. Selecciona el dispositivo que vas a configurar.

<img src="https://i.ibb.co/kcXVbxx/IMG-0090.png" width="250">

1.3. Selecciona el dispositivo que vas a configurar.

<img src="https://i.ibb.co/kcXVbxx/IMG-0090.png" width="250">

1.3. Selecciona el dispositivo que vas a configurar.

<img src="https://i.ibb.co/kcXVbxx/IMG-0090.png" width="250">

1.3. Selecciona el dispositivo que vas a configurar.

<img src="https://i.ibb.co/kcXVbxx/IMG-0090.png" width="250">













ou will be redirected to the
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
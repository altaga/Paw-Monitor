# Paw-ON

<img src="https://i.ibb.co/1sMns5D/Logo.png" width="600">

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
* [App Setup - Part 1](#app-setup---part-1)
* [AWS Setup](#aws-setup)
* [App Setup - Part 2](app-setup---part-2)
* [Node-Red Setup](#node-red-setup)
* [Product](#product)
* [Demo](#demo)

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

- Kit Assembly:

<img src="https://i.ibb.co/SrPz6NK/20200310-000100.jpg" width="1000">

- Connect the Antenna.

<img src="https://i.ibb.co/zhhnxW9/20200310-000117.jpg" width="1000">

- Put the battery in the socket.

<img src="https://i.ibb.co/Kw0VTcS/20200310-000131.jpg" width="1000">

- Perfect, your kit is assembled and ready to program!

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

- Si todo sale bien, deberemos ver en AWS IoT y DynamoDB lo Siguiente.

DynamoDB.

 <img src="https://i.ibb.co/kB711xp/image.png" width="1000">

AWS IoT.

 <img src="https://i.ibb.co/xC7M9cX/image.png" width="1000">

- Ya con esto, tenemos todo el backend en cloud del proyecto, por lo tanto ahora nos podemos concentrar en el frontend.

## Node-Red Setup:

- Node Red is a tool for NodeJS where we can integrate services easily, without code and, of course, create excellent dashboards.

- NodeJS installation guide: https://www.guru99.com/download-install-node-js.html

- NodeRED installation guide: https://nodered.org/docs/getting-started/windows

- NodeRED installation guide: https://flows.nodered.org/node/node-red-dashboard

- The file "flows.json" in the folder "Node-RED Flow", has all the information to import the flow into your NodeRED.

<img src = "https://i.ibb.co/c11ZJT8/image.png" width = "400">
<img src = "https://i.ibb.co/nBL3M23/image.png" width = "400">

- Once that is done we will edit the MQTT node to enter our credentials.

<img src = "https://i.ibb.co/B3qT5vm/image.png" width = "600">

- Set Server and Port.

<img src = "https://i.ibb.co/WHrcHCd/image.png" width = "600">

- Press in the pencil in TSL configuration to add the certificates.

- Note: RootCA certificate inside "Certs" folder.

<img src = "https://i.ibb.co/nMgtkRN/image.png" width = "600">

- If everything works fine press the "Deploy" button and enter the following URL to check the Dashboard.

http://localhost:1880/ui

<img src = "https://i.ibb.co/bzWytff/image.png" width = "800">

- El mapa de la localización en tiempo real del device es:

http://localhost:1880/worldmap/

<img src = "https://i.ibb.co/ydhWQVs/image.png" width = "800">

### Blocks Explanation:

- Este bloque realiza la función de actualizar cada 10 segundos la ubicación en el mapa, la ubicación la obtiene al llamar una API de localización gratuita, procesando con una función (escrita en Javascript) y mandándola al nodo de mapa.

Nota: también mandamos la ubicación a AWS IoT para poder realizar aviso en su debido caso si la ubicación del animal cambia de forma repentina.

<img src = "https://i.ibb.co/58dhD0n/image.png" width = "800">

- Este bloque recibe cada uno de los payloads de el broker, filtra según el sensor a que gráfica tiene que ir y lo manda a gráficar.

<img src = "https://i.ibb.co/YLzYM9F/image.png" width = "800">

- Este bloque es uno de los mas interesantes ya que su funcion es espera a que el dato de temperatura y humedad lleguen para poder hacer el calculo del Dew Point, que es uno de los estándares para la medición del confort en el ambiente.

<img src = "https://i.ibb.co/6v4RVJN/image.png" width = "800">

## Product:


<img src = "https://i.ibb.co/C2gvKSt/20200317-162807.jpg" width = "800">
<img src = "https://i.ibb.co/D9pkHvT/20200317-162814.jpg" width = "800">
<img src = "https://i.ibb.co/KLQhnwT/20200317-162827.jpg" width = "800">

Travel dog crate with the device:

<img src = "https://i.ibb.co/YR2KR84/vlcsnap-2020-03-17-16h43m47s334.png" width = "800">

My dog with the device:

<img src = "https://i.ibb.co/f0fMGnW/vlcsnap-2020-03-17-15h51m27s441.png" width = "800">
<img src = "https://i.ibb.co/26t19qz/20200314-142545.jpg" width = "800">
<img src = "https://i.ibb.co/7GnSzPw/20200314-142539.jpg" width = "800">

## Demo:

This my EPIC DEMO:

Video: Click on the image:

[![Demo](https://i.ibb.co/FwBCNNb/vlcsnap-2020-03-17-15h51m12s755.png)](https://youtu.be/yn9AhaSX8mg)

Sorry github does not allow embed videos.

* [Table of Contents](#table-of-contents)
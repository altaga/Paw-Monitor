# Paw-ON

<img src="https://i.ibb.co/1sMns5D/Logo.png" width="600">

# Introduction and problem

If you have a dog, cat or any pet that needs to go into a kennel when travelling, and be left in the hands of airlines or moving services, you know how stressful and problematic it is for your precious friends. 

The main problem thus is: The horrid care pets get when they are transported. 

<img src="https://i.ibb.co/zhMTTGJ/perro.png" width="600">

Regarding the pet's safety and comfort:

Sometimes we need to send pets with an airline service for travel to another country or just around the corner. How can we be sure they're fine at all times? Take into consideration how baggage is treated.

And secondly, have we ever feared that our dog goes astray and you can never find it again, the following project might have a solution for that.

Always use technology to improve the world, if you are a black hat or gray hat hacker please abstain at this point ......... or at least leave your star to make me feel less guilty XP.

# Table of contents
* [Introduction](#introduction)
* [Solution](#solution)
* [Materials](#materials)
* [Connection Diagram](#connection-diagram)
* [Kit Setup](#kit-setup)
* [App Setup - Part 1](#app-setup---part-1)
* [AWS Setup](#aws-setup)
* [App Setup - Part 2](#app-setup---part-2)
* [Node-Red Setup](#node-red-setup)
* [NFC Setup](#nfc-setup)
* [Product](#product)
* [Demo](#demo)

# Solution

<img src="https://animais.culturamix.com/blog/wp-content/gallery/animal-de-estimacao-no-aviao-2/Animal-De-Estima%C3%A7%C3%A3o-No-Aviao-5.jpg" width="1000">

Solving for the pet's safety and comfort:

I will make an integral IoT solution to monitor the pet’s environment based on RSL10-SENSE-DB-GEVK, in order to ensure their well-being throughout their journey. All this also integrated with a AWS as backend and NodeRed based platform which, in addition to showing the status of the package in real time, also sends notifications at the frequency that is convenient. 

The current monitoring solutions are restricted to only lifeless packages, this making the continuous monitoring of pets a novelty. It is useful because thanks to this system pet owners can be 100% sure that their pets will be well and can monitor and follow them throughout their flight or any travel.

For those lost and gone astray pets:

NFC technology has been used for many years in products, animals and even humans, however we do not have a solution that indicates if the dog has already been found once the tag has been scanned.

We will create a configuration for the NFC tag so that once the tag data is reviewed, it notifies us where it is and also shows the person who scanned the tag, the contact information to recover our best friend. 


# Materials:

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

# Connection Diagram:

 <img src="https://i.ibb.co/C2RZz5G/diagram.png" width="1000">

# Kit Setup:

- Kit Assembly:

<img src="https://i.ibb.co/SrPz6NK/20200310-000100.jpg" width="1000">

- Connect the Antenna.

<img src="https://i.ibb.co/zhhnxW9/20200310-000117.jpg" width="1000">

- Put the battery in the socket.

<img src="https://i.ibb.co/Kw0VTcS/20200310-000131.jpg" width="1000">

- Perfect, your kit is assembled and ready to program!

For the correct configuration of the kit, it will be necessary to download the official ON Semiconductor IDE.

IDE Link: https://www.onsemi.com/PowerSolutions/gatedDocument.do?method=getGatedDocument&docId=1172113

The manual to correctly configure the IDE is the following:

Link: https://www.onsemi.com/pub/Collateral/EVBUM2614-D.PDF

All the dependencies of the program are in the "Dependencies Pack" folder, you can download them directly from the ON Semiconductor page, but I recommend using the ones in the folder.

Note: All the configurations for the kit are perfectly documented in the document, so this tutorial will start from the configuration of the mobile application for this project.

# App Setup - Part 1:
 
- Install your gateway from this link:

<img src="https://i.ibb.co/CHtGJZj/image.png" width="700">

iOS:https://apps.apple.com/us/app/rsl10-sense-and-control/id1451974010

<img src="https://i.ibb.co/q1c3S5h/image.png" width="700">

Android:https://play.google.com/store/apps/details?id=com.onsemi.rsl10senseandcontrol&hl=es_VE

- Select the device you are going to configure.

<img src="https://i.ibb.co/kcXVbxx/IMG-0090.png" width="250">

- Select your sensors.

<img src="https://i.ibb.co/0FRHJnc/IMG-0066.png" width="250">

- If everything works well, we can see the sensors obtaining information.

<img src="https://i.ibb.co/4jzYsKM/IMG-0070.png" width="200"><img src="https://i.ibb.co/ZHXdWcH/IMG-0069.png" width="200"><img src="https://i.ibb.co/R7pjLfM/IMG-0068.png" width="200"><img src="https://i.ibb.co/6Pn7C8k/IMG-0067.png" width="200">

- One of the main difficulties to carry out the transmission by MQTT correctly, is to know the Topic in which all our information is being sent. This Topic will be the same for all the brokers that we configure, however to obtain it, we must carry out a small test with a Broker MQTT that allows us to review all Topics. In the case of AWS, it is not possible to do this, so we will obtain the topic through a local Mosquitto broker.

Link: https://mosquitto.org/download/

- To access the mosquitto broker we will have to configure the broker in our app.

- Tap the gear symbol in the upper right corner.

<img src="https://i.ibb.co/80qj6nV/IMG-00902.png" width="200">

- Press the "Enable Broadcast" switch and then enter the Manage Brokers option.

<img src="https://i.ibb.co/WFxJYyX/IMG-0071.png" width="200">

- We press the + symbol in the upper right corner to add the broker.

<img src="https://i.ibb.co/4dxwFWb/IMG-0072.png" width="200">

- Set up the credentials as follows.

  - Client Name: "Any Name"
  - Protocol: tcp
  - URL: IP From the server in your local network.
  - Port Number: 1883
  - Username: null
  - Password: null

<img src="https://i.ibb.co/jV86Lwk/IMG-0095.png" width="200">

- Start the data broadcast on your computer and execute the following command in your CMD or Terminal, to listen to all the topics of your broker and therefore that of your device.

Note: sometimes the mosquitto broker is not activated automatically in windows, I added two .bat files in the "Scripts" folder that allows you to turn the broker on and off by clicking them. Run them as administrator.

Note 2: In most brokers, the # symbol is used as a wildcard for topics.

    mosquitto_sub -v -t #

- You will see the Topic as follows

<img src="https://i.ibb.co/1nqFHmS/topic.png" width="1000">

Save that topic since it will be the publication topic in all brokers.

# AWS Setup:

AWS works through roles, these roles are credentials that we create so that the services can communicate with each other, in order to carry out all our integration we need to create a role that allows the effective transmission of all services, therefore that will be the first thing To make.

Note: always start here when doing a project with AWS.

## IAM:

- Enter the IAM console.

<img src="https://i.ibb.co/CHBndXs/image.png" width="1000">

- Enter through the role tab and click "Create role".

<img src="https://i.ibb.co/1fm8rhr/image.png" width="1000">

- Create a role focused on the IoT platform.

<img src="https://i.ibb.co/42Vv4dY/image.png" width="1000">

- Press next till review.

<img src="https://i.ibb.co/f22SfJ0/image.png" width="1000">

- Now we have to add the additional permissions to the Role, in the roles tab enter the role we just created and press the Attach policies button.

<img src="https://i.ibb.co/z5kVpXR/image.png" width="1000">

- Inside policies add the following:

  - AmazonDynamoDBFullAccess

<img src="https://i.ibb.co/7r0KcNJ/image.png" width="1000">

- Once that is finished, now we can start configuring the Rule within AWS IoT Core.

## DynamoDB

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

## Lambda:

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

# IoT Things:

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

# Node-Red Setup:

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

# NFC Setup: 

Una parte impoortante del utilizar nuetro kit RSL10 es su capacidad de ser un tag NFC, eso no nos abre un mundo de posibilidades para este producto, asi que expandiremos nuestro mercado a cualquier persona que pueda tener un perro, ademas de crear un ecosistema donde, cuando vayas a viajar con tu mascota puedas cuidarla durante el viaje, tambien sera una identificacion intenacional para tu mascota en caso de extravio.

- Esta seccion tiene dos componentes principales, la pagina web de identificacion y la API de notificacion al usuario, las explicaremos a detalle:

## WebPage:

En este caso creamos una pagina web sencilla mediante NodeJS y ReactJS.

https://reactjs.org/docs/getting-started.html

<img src = "https://i.ibb.co/0M5sZ9G/Screenshot-20200318-024208-Chrome.jpg" width = "300">

El código de la pagina web esta en la carpeta de "WebPage".

## API:

### Lambda Creation:

Create a "LocationLambdaPawnON" Lambda Function.

Note: Use your already created SNS ARN.

    // Load the AWS SDK
      var AWS = require("aws-sdk");
      // Set up the code to call when the Lambda function is invoked
      exports.handler = (event, context, callback) => {
            var sns = new AWS.SNS();
            var params = {
            Message: "Your dog's tag was scanned, located at this location: https://www.google.com.mx/maps/@19.42,-99.1663,15z",
            TopicArn: "arn:aws:sns:us-east-1:YOURSNSTOPIC"
            };
            sns.publish(params, context.done);
    };

### API Creation:

Sign in to the API Gateway console at https://console.aws.amazon.com/apigateway.

If this is API Gateway, you see a page that introduces you to the features of the service. Choose Get Started. When the Create Example API popup appears, choose OK.

If this is not your first time using API Gateway, choose Create API.

Create an empty API as follows:
- Under Choose the protocol, choose REST.
- Under Create new API, choose New API.
- Under Settings:
  - For API name, enter PawnON-API.
  - If desired, enter a description in the Description field; otherwise, leave it empty.

<img src = "https://i.ibb.co/71XxZS8/image.png" width = "800">

Leave Endpoint Type set to Regional:

- Choose Create API.
  - Create the paw-on-api resource as follows:
  - Choose the root resource (/) in the Resources tree.
  - Choose Create Resource from the Actions dropdown menu.
  - Leave Configure as proxy resource unchecked.

- For Resource Name, enter paw-on-api.
- Leave Resource Path set to /paw-on-api.
- Leave Enable API Gateway CORS unchecked.

<img src = "https://i.ibb.co/7JH6ZH6/image.png" width = "800">

Choose Create Resource.

In a proxy integration, the entire request is sent to the backend Lambda function as-is, via a catch-all ANY method that represents any HTTP method. The actual HTTP method is specified by the client at run time. The ANY method allows you to use a single API method setup for all of the supported HTTP methods: DELETE, GET, HEAD, OPTIONS, PATCH, POST, and PUT.

To set up the ANY method, do the following:

- In the Resources list, choose /paw-on-api.
- In the Actions menu, choose Create method.
- Choose ANY from the dropdown menu, and choose the checkmark icon
- Leave the Integration type set to Lambda Function.

<img src = "https://i.ibb.co/fX9NBdQ/image.png" width = "800">

Choose Use Lambda Proxy integration.

- From the Lambda Region dropdown menu, choose the region where you created the GetStartedLambdaProxyIntegration Lambda function.
- In the Lambda Function field, type any character and choose GetStartedLambdaProxyIntegration from the dropdown menu.
- Leave Use Default Timeout checked.
- Choose Save.
- Choose OK when prompted with Add Permission to Lambda Function.

Deploy and Test the API
- Deploy the API in the API Gateway console
- Choose Deploy API from the Actions dropdown menu.
- For Deployment stage, choose [new stage].
- For Stage name, enter test.
- If desired, enter a Stage description.
- If desired, enter a Deployment description.
- Choose Deploy.
- Note the API's Invoke URL.

<img src = "https://i.ibb.co/WxHLh2k/image.png" width = "800">

Checking the API with your invoke URL:

<img src = "https://i.ibb.co/jfbKvHS/Screenshot-20200318-031436-Messages.jpg" width = "300">

## NFC Write Commands:

Debido a la falta de documentacion del NFC, mostrare el proceso correcto para escribir comandos en etiquetas de NFC y la simulacion de esos comandos.

### Read the data in the NFC Tag:

Trate de leer la data dentro del tag segun el codigo de ON Semiconductor IDE.

<img src = "https://i.ibb.co/8cRbjnf/image.png" width = "500">
<img src = "https://i.ibb.co/Bqs70kW/image.png" width = "500">

Segun el codigo deberia poder leer el mensaje "This is just a test".

<img src = "https://i.ibb.co/ZBQfckS/Screenshot-20200318-150816-NFC-Tools-PRO.jpg" width = "400"><img src = "https://i.ibb.co/zfHVM8d/Screenshot-20200318-150811-NFC-Tools-PRO.jpg" width = "400">

En este caso el lector de mi celular, me dice que no es un Tag compatible, sin embargo lo que si pude hacer fue detectarlo como un Tag.

<img src = "https://i.ibb.co/3Mfghxq/Screenshot-20200318-150751-NFC-Tools-PRO.jpg" width = "400">

### Simulate Process:

Ya que podia detectar almenos el tag cree una simulacion con una aplicacion llamada "NFC ReTag" para poder realizar acciones con tags reciclados o que no es posible reescribirlos, en este caso en particular tag no compatible con lectura.

NFC ReTag : https://play.google.com/store/apps/details?id=com.widgapp.NFC_ReTAG_FREE&hl=en_US

<img src = "https://i.ibb.co/DVkQTNR/Screenshot-20200318-150842-NFC-Re-Tag-PRO.png" width = "400"><img src = "https://i.ibb.co/kJ8mpXN/Screenshot-20200318-150833-NFC-Re-Tag-PRO.jpg" width = "400">

Video de como funciona:

[![Demo](https://i.ibb.co/N2kvw0N/yt.png)](https://youtu.be/8_KsMeBGZYY)

### Real Process:

El proceso real para escribir en Tags de NFC es el siguiente, se hara uso de la app NFC Tools, dejo el ejemplo de como funcionaria en una tajeta de NFC reescribible, sin emnbargo cuando sean compatibles estos tags, con los lectores de celular, este seria el proceso correcto.

https://play.google.com/store/apps/details?id=com.wakdev.wdnfc&hl=en_US

<img src = "https://i.ibb.co/Wg5VvBy/image.png" width = "300">

Video de como funciona:

[![Demo](https://i.ibb.co/N2kvw0N/yt.png)](https://youtu.be/ShwMbDFksXA)

# Product:

<img src = "https://i.ibb.co/C2gvKSt/20200317-162807.jpg" width = "800">
<img src = "https://i.ibb.co/D9pkHvT/20200317-162814.jpg" width = "800">
<img src = "https://i.ibb.co/KLQhnwT/20200317-162827.jpg" width = "800">

Travel dog crate with the device:

<img src = "https://i.ibb.co/YR2KR84/vlcsnap-2020-03-17-16h43m47s334.png" width = "800">

My dog with the device:

<img src = "https://i.ibb.co/f0fMGnW/vlcsnap-2020-03-17-15h51m27s441.png" width = "800">
<img src = "https://i.ibb.co/26t19qz/20200314-142545.jpg" width = "800">
<img src = "https://i.ibb.co/7GnSzPw/20200314-142539.jpg" width = "800">

UI:

http://localhost:1880/ui

<img src = "https://i.ibb.co/bzWytff/image.png" width = "800">

- El mapa de la localización en tiempo real del device es:

http://localhost:1880/worldmap/

<img src = "https://i.ibb.co/ydhWQVs/image.png" width = "800">

UI:

<img src = "https://i.ibb.co/0M5sZ9G/Screenshot-20200318-024208-Chrome.jpg" width = "300">

SMS:

<img src = "https://i.ibb.co/NZ5WXmt/Screenshot-20200318-020153-Messages.jpg" width = "300"><img src = "https://i.ibb.co/jfbKvHS/Screenshot-20200318-031436-Messages.jpg" width = "300">

# Demo:

This my EPIC DEMO:

Video: Click on the image:

[![Demo](https://i.ibb.co/q1LQZgx/yt2.png)](https://youtu.be/yn9AhaSX8mg)

Sorry github does not allow embed videos.

* [Table of Contents](#table-of-contents)

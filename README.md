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

In this case the AWS IoT configuration is already provided by the official documentation by ON semiconductor, however I will show you how to configure the Rules to connect the rest of AWS services.

Link: https://www.onsemi.com/pub/Collateral/AND9831-D.PDF

- Once we receive the data to our AWS IoT Core, we will configure the Rules to connect the following services.

<img src="https://i.ibb.co/zhzZXGh/Create.png" width="1000">

- Set any name for the Rule.

<img src="https://i.ibb.co/Rj05MW5/image.png" width="1000">

- In the SQL Query we will place our topic.

<img src="https://i.ibb.co/R6Yqh0V/image.png" width="1000">

- The first rule we are going to create will be to save all the data in a DynamoDB.

<img src="https://i.ibb.co/nRm3WNy/image.png" width="1000">

- Press "Create a new resource" to create the table where we will save the data.

<img src="https://i.ibb.co/Hn4TYS2/image.png" width="1000">

- For our table we will use the following parameters, I suggest that you use these specifically, since at production level all the device numbers will be different and in the "Time" column we are going to implement a special TIMESTAMP function.

<img src="https://i.ibb.co/ZWR8GcG/image.png" width="1000">

- Once the resource is created we return to:

<img src="https://i.ibb.co/YtjVBjd/image.png" width="1000">

The Sort Key value special function is:

    ${parse_time("yyyy.MM.dd G 'at' HH:mm:ss z", timestamp() )}

- Once this is finished, we will have finished the first rule. In this case, because the rule for the lambda uses a different SQL query, we will no longer add any more actions to this rule.

## Lambda:

- To create a new rule but using the following SQL Query.

<img src="https://i.ibb.co/Np6R5GQ/image.png" width="1000">

- We will add to this rule the following action:

<img src="https://i.ibb.co/n3H5576/image.png" width="1000">

- Press the "Create a new Lambda Function" button:

<img src="https://i.ibb.co/5sLHqy2/image.png" width="1000">

- We configure the lambda in the following way and create it:

<img src="https://i.ibb.co/68j2BXJ/image.png" width="1000">

- Once the lambda has been created we go down to the Execution role section and press the View the YOURROLE button on the IAM console to be able to add the SNS police to the SMS:

<img src="https://i.ibb.co/K9QRFc4/image.png" width="1000">

- We add the SNS service  
    - AmazonSNSFullAccess 

<img src="https://i.ibb.co/xJV8jxX/image.png" width="1000">

- Once that is finished, we select the lambda in our rule to finish configuring the lambda trigger.

<img src="https://i.ibb.co/zh8Fq0C/image.png" width="1000">

- Before programming the Lambda we will have to configure the SMS service through SNS.

<img src="https://i.ibb.co/RbjHG8c/image.png" width="1000">

- Press the "Create Topic" button to create our message service.

<img src="https://i.ibb.co/fNhCPfh/image.png" width="1000">

- Give the Topic a title and create it.

<img src="https://i.ibb.co/YDZXHC5/image.png" width="1000">

- Save the ARN number, since we are going to need it to configure the lambda.

<img src="https://i.ibb.co/NpBxLj1/image.png" width="1000">

- Click "Create subscription".

<img src="https://i.ibb.co/bvdLmBW/image.png" width="1000">

- Select as "Protocol" SMS and in Endpoint put your cell number (International dialing).

<img src="https://i.ibb.co/Kw1F5SW/image.png" width="1000">

- Done, we have finished creating the necessary services to use the lambda correctly, now we return to the lambda and copy the code in the Lambda Code folder and paste it into your Lambda.

<img src="https://i.ibb.co/FztvcY8/image.png" width="1000">

- The most important part of the code is the Thresholds, each of them was obtained from the following references.

- Air Quality: RSL10 Reference.
- Max Accel Limit: https://web.archive.org/web/20170104164718/http://www.au.af.mil/au/aupress/digital/pdf/book/b_0113_brulle_engineering_space_age.pdf
- Max Pressure on Flight: https://www.who.int/ith/mode_of_travel/cab/en/
- Max Degrees: 45 degrees maximum static friction before the dog slips
- Max Magnetic Field: https://www.who.int/peh-emf/publications/facts/fs322/en/
- Min and Max, Temperature and Humidity: http://www.dartmouth.edu/~cushman/courses/engs44/comfort.pdf
- Max Lux Level: https://www.engineeringtoolbox.com/light-level-rooms-d_708.html

# IoT Things:

Since we have all our platform ready, we have to create the accesses to communicate with it. So we will have to create two Things in this case, the first is for our RSL10 module and the other will be for the NodeRed UI.

Note: To configure the app, you can use the following official ON Semiconductor manual as well.

Link: https://www.onsemi.com/pub/Collateral/AND9831-D.PDF

- First we have to access our AWS console y look for the IoT core service:

<img src="https://i.ibb.co/KVbtQLR/image.png" width="600">

- Obtain your AWS endpoint, save it because we will use it to setup the RSL10 App and the webpage.

<img src="https://i.ibb.co/ZYwrdfR/image.png" width="600">

- In the lateral panel select the "Onboard" option and then "Get started".

<img src="https://i.ibb.co/gmKxc7P/image.png" width="600">

- Select "Get started".

<img src="https://i.ibb.co/XSxSxbF/image.png" width="600">

- At "Choose a platform" select "Linux/OSX", in AWS IoT DEvice SDK select "Python" and then click "Next".

<img src="https://i.ibb.co/JR69Fdd/image.png" width="600">

- At Name, write any name, remember that you will have to do this process twice, so name things ion order that you can differentiate the credentials that you will put in NodeRed and in the RSL10 app. Then click on "Next step".

<img src="https://i.ibb.co/NNLqqM0/image.png" width="600">

- At "Download connection kit for" press the button "Linux/OSX" to download the credential package (which we will use later) and click on "Next Step".

<img src="https://i.ibb.co/RHVTRpg/image.png" width="600">

- Click "Done".

<img src="https://i.ibb.co/N9c8jbG/image.png" width="600">

- Click "Done".

<img src="https://i.ibb.co/DtBxq0k/image.png" width="600">

- On the lateral bar, inside the Manage/Things section we can see our thing already created. Now we have to set up the policy of that thing for it to work without restrictions in AWS.

<img src="https://i.ibb.co/dQTFLZY/image.png" width="600">

- At the lateral bar, in the Secure/Policies section we can see our thing-policy, click on it to modify it:

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

- Once this is done, we will go to our pc and to the folder with the credentials previously downloaded, extract them.

<img src="https://i.ibb.co/mFKPxcY/image.png" width="600">

## App Setup - Part 2:

Android: if you are configuring AWS on an Android, send the certificates through USB so you can easily configure them.

iPhone: If you are configuring AWS on an iPhone, the easiest way is to put the certificates from https://www.icloud.com/# in the "iCloud Drive" application.

<img src="https://i.ibb.co/CJg26xW/image.png" width="1000">

Since we have the certificates for the device, we will configure it as follows.

- Enter the gear symbol in the upper right corner.

<img src="https://i.ibb.co/80qj6nV/IMG-00902.png" width="200">

- Press the "Enable Broadcast" switch and then enter the Manage Brokers option.

<img src="https://i.ibb.co/WFxJYyX/IMG-0071.png" width="200">

- Press the + symbol in the upper right corner to add the broker.

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

- Press "Save" in the upper right corner to complete the setup.
 
- To start broadcasting to AWS, press the following button in the application.

<img src="https://i.ibb.co/GpWvN9m/IMG-0091.png" width="200">

- If everything goes well, we should see the following in AWS IoT and DynamoDB.

DynamoDB.

 <img src="https://i.ibb.co/kB711xp/image.png" width="1000">

AWS IoT.

 <img src="https://i.ibb.co/xC7M9cX/image.png" width="1000">

- With this, we have the entire cloud backend of the project, so now we can focus on the frontend.

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

- The device's real-time location map is at:

http://localhost:1880/worldmap/

<img src = "https://i.ibb.co/ydhWQVs/image.png" width = "800">

### Explanation for some nodes:

- This node performs the function of updating the location on the map every 10 seconds, the location is obtained by calling a free location API, processing with a function (written in Javascript) and sending it to the map node.

Note: We also send the location to AWS IoT so that we can notify you if the pet's location changes suddenly.

<img src = "https://i.ibb.co/58dhD0n/image.png" width = "800">

- This node receives each of the broker's payloads, filters according to the sensor which graph it has to go to and sends it to graph.

<img src = "https://i.ibb.co/YLzYM9F/image.png" width = "800">

- This Node is one of the most interesting since its function is to wait for the temperature and humidity data to arrive in order to calculate the Dew Point, which is one of the standards for measuring comfort in the environment.

<img src = "https://i.ibb.co/6v4RVJN/image.png" width = "800">

# NFC Setup: 

An important part of using our RSL10 kit is its ability to be an NFC tag. That opens up a world of possibilities for this product, so we may expand our market to anyone who has a dog. In addition to creating an ecosystem where, when you travel with your pet you can take care of it during the trip, it will also be an international ID for your pet in case it goes astray.

- This section has two main components, the identification web page and the API for user notification. We will explain them in detail:

## WebPage:

For this we create a simple web page using NodeJS and ReactJS.

https://reactjs.org/docs/getting-started.html

<img src = "https://i.ibb.co/0M5sZ9G/Screenshot-20200318-024208-Chrome.jpg" width = "300">

The code of the web page is in the "WebPage" folder.

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

In this API Gateway, you see a page that introduces you to the features of the service. Choose Get Started. When the Create Example API popup appears, choose OK.

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

Due to the lack of NFC documentation, I will show the correct process for writing commands to NFC tags and simulating those commands.

### Read the data in the NFC Tag:

Try to read the data inside the tag according to the ON Semiconductor IDE code.

<img src = "https://i.ibb.co/8cRbjnf/image.png" width = "500">
<img src = "https://i.ibb.co/Bqs70kW/image.png" width = "500">

According to the code you should be able to read the message "This is just a test".

<img src = "https://i.ibb.co/ZBQfckS/Screenshot-20200318-150816-NFC-Tools-PRO.jpg" width = "400"><img src = "https://i.ibb.co/zfHVM8d/Screenshot-20200318-150811-NFC-Tools-PRO.jpg" width = "400">

In this case the reader of my cell phone tells me that it is not a compatible Tag, however what I could do was detect it as a Tag.

<img src = "https://i.ibb.co/3Mfghxq/Screenshot-20200318-150751-NFC-Tools-PRO.jpg" width = "400">

### Simulated Process:

Since it could detect at least the tag, I created a simulation with an application called "NFC ReTag" to be able to perform actions with recycled tags or when it is not possible to rewrite them, in this case in particular a tag not compatible with reading.

NFC ReTag : https://play.google.com/store/apps/details?id=com.widgapp.NFC_ReTAG_FREE&hl=en_US

<img src = "https://i.ibb.co/DVkQTNR/Screenshot-20200318-150842-NFC-Re-Tag-PRO.png" width = "400"><img src = "https://i.ibb.co/kJ8mpXN/Screenshot-20200318-150833-NFC-Re-Tag-PRO.jpg" width = "400">

Video of how it works:

[![Demo](https://i.ibb.co/N2kvw0N/yt.png)](https://youtu.be/8_KsMeBGZYY)

### Real Process:

The real process to write on NFC tags is the following one. We will make use of the NFC tools app, here I leave the example of how it works on a rewritable NFC tag, nevertheless when these tags are compatible with cellphone readers, this would be the process.

https://play.google.com/store/apps/details?id=com.wakdev.wdnfc&hl=en_US

<img src = "https://i.ibb.co/Wg5VvBy/image.png" width = "300">

Video of how it works:

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

- The device's real-time location map is:

http://localhost:1880/worldmap/

<img src = "https://i.ibb.co/ydhWQVs/image.png" width = "800">

UI:

<img src = "https://i.ibb.co/0M5sZ9G/Screenshot-20200318-024208-Chrome.jpg" width = "300">

SMS:

<img src = "https://i.ibb.co/NZ5WXmt/Screenshot-20200318-020153-Messages.jpg" width = "300"><img src = "https://i.ibb.co/jfbKvHS/Screenshot-20200318-031436-Messages.jpg" width = "300">

# Demo:

This my DEMO:

Video: Click on the image:

[![Demo](https://i.ibb.co/q1LQZgx/yt2.png)](https://youtu.be/yn9AhaSX8mg)

Sorry github does not allow embed videos.

* [Table of Contents](#table-of-contents)

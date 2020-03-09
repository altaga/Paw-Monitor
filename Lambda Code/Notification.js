   // Load the AWS SDK
   var AWS = require("aws-sdk");
   // Set up the code to call when the Lambda function is invoked
   exports.handler = (event, context, callback) => {
      
   // thresholds
   
   // Sensor Datasheet
   var maxAir = 200 
   //(10 G) Stunt Safety Limit
   var accel = 100 
   // WHO NOM Limits kPa
   var maxP = 82 
   var minP = 74 
   // Max 45 Degrees 
   var maxD = 45 
   // Normal sensor values on a flat surface
   var xnom=-3
   var ynom = -8
   var znom = 98
   // WHO max µTeslas
   var maxMag = 100 
   // dartmouth college standard
   var maxTemp = 30 
   var minTemp = 15
   var maxH = 80
   var minH = 20
   // Standard max Lux value
   var maxLux = 2000
   
   // Function
   
   var eventText = JSON.parse(JSON.stringify(event, null, 2));
   var sensor;
   var value;
   if (eventText["ALS-NOA1305_9"] != undefined) {
      sensor="Light"
      value=parseInt(eventText["ALS-NOA1305_9"])
       if(value > maxLux)
      {
         var sns = new AWS.SNS();
         var params = {
         Message: "Excessive brightness",
         TopicArn: "arn:aws:sns:us-east-1:312945189004:Noti"
         };
         sns.publish(params, context.done);
      }
   }
   else if (eventText["Air Quality_8"] != undefined) {
      sensor="Air"
      value=parseInt(eventText["Air Quality_8"])
       if(value > maxAir)
      {
         var sns = new AWS.SNS();
         var params = {
         Message: "Very low air quality",
         TopicArn: "arn:aws:sns:us-east-1:312945189004:Noti"
         };
         sns.publish(params, context.done);
      }
   }
   else if (eventText["Accelerometer_A"] != undefined) {
      sensor="Accel"
      var x = Math.abs(parseInt(eventText["Accelerometer_A"].split(",")[0])*0.1);
      var y = Math.abs(parseInt(eventText["Accelerometer_A"].split(",")[1])*0.1);
      var z = Math.abs(parseInt(eventText["Accelerometer_A"].split(",")[2])*0.1);
      value=eventText["Accelerometer_A"]
      if(x > accel  || y > accel || z > accel )
      {
         var sns = new AWS.SNS();
         var params = {
         Message: "Excessive movement detected",
         TopicArn: "arn:aws:sns:us-east-1:312945189004:Noti"
         };
         sns.publish(params, context.done);
      }
   }
   else if (eventText["Gyroscope_G"] != undefined) {
      sensor="Gyro"
      var x = parseInt(eventText["Gyroscope_G"].split(",")[0])*0.1;
      var y = parseInt(eventText["Gyroscope_G"].split(",")[1])*0.1;
      var z = parseInt(eventText["Gyroscope_G"].split(",")[2])*0.1;
      value=eventText["Gyroscope_G"]
       if(Math.abs(x-xnom) > maxMag  || Math.abs(y-ynom) > maxMag || Math.abs(z-znom) > maxMag )
      {
         var sns = new AWS.SNS();
         var params = {
         Message: "Strange position detected",
         TopicArn: "arn:aws:sns:us-east-1:312945189004:Noti"
         };
         sns.publish(params, context.done);
      }
   }
   else if (eventText["Magnetometer_M"] != undefined) {
      sensor="Magnet"
      var  x = Math.abs(parseInt(eventText["Magnetometer_M"].split(",")[0])*0.1);
      var y = Math.abs(parseInt(eventText["Magnetometer_M"].split(",")[1])*0.1);
      var z = Math.abs(parseInt(eventText["Magnetometer_M"].split(",")[2])*0.1);
      value=eventText["Magnetometer_M"]
      if(x > maxMag  || y > maxMag || z > maxMag )
      {
         var sns = new AWS.SNS();
         var params = {
         Message: "High magnetic field detected.",
         TopicArn: "arn:aws:sns:us-east-1:312945189004:Noti"
         };
         sns.publish(params, context.done);
      }
   }
   else if (eventText["Temperature_6"] != undefined) {
      sensor="Temp"
      value=parseInt(eventText["Temperature_6"])
      
     if(value > maxH)
      {
         var sns = new AWS.SNS();
         var params = {
         Message: "High Temperature Detected",
         TopicArn: "arn:aws:sns:us-east-1:312945189004:Noti"
         };
         sns.publish(params, context.done);
      }
      else if(value < minH)
      {
         var sns = new AWS.SNS();
         var params = {
         Message: "Low Temperature Detected",
         TopicArn: "arn:aws:sns:us-east-1:312945189004:Noti"
         };
         sns.publish(params, context.done);
      }
      
   }
   else if (eventText["Pressure_5"] != undefined) {
      sensor="Press"
      value=parseInt(eventText["Pressure_5"])
      if(value > maxP)
      {
         var sns = new AWS.SNS();
         var params = {
         Message: "High Pressure Detected",
         TopicArn: "arn:aws:sns:us-east-1:312945189004:Noti"
         };
         sns.publish(params, context.done);
      }
      else if(value < minP)
      {
         var sns = new AWS.SNS();
         var params = {
         Message: "Low Pressure Detected",
         TopicArn: "arn:aws:sns:us-east-1:312945189004:Noti"
         };
         sns.publish(params, context.done);
      }
   }
   else if (eventText["Humidity_7"] != undefined) {
      sensor="Hum"
      value=parseInt(eventText["Humidity_7"])
      if(value > maxH)
      {
         var sns = new AWS.SNS();
         var params = {
         Message: "High Humidity Detected",
         TopicArn: "arn:aws:sns:us-east-1:312945189004:Noti"
         };
         sns.publish(params, context.done);
      }
      else if(value < minH)
      {
         var sns = new AWS.SNS();
         var params = {
         Message: "Low Humidity Detected",
         TopicArn: "arn:aws:sns:us-east-1:312945189004:Noti"
         };
         sns.publish(params, context.done);
      }
   }
   else{
      // Nothing
   }
   return [sensor,x]
    
};
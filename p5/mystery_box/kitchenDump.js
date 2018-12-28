// //Dump and temporary testing code goes here
//
//
// // Serial communication protocol variable declaration
// let serial;
// let portName = '/dev/cu.usbmodem1411';
// let inData;
// let sensorReadings = [];
//
// //General global variables
// let canvas;
// let gameLevel = 0;
//
// // Level 0: Switch puzzle variables
// let switchPlug = 0;
//
// // Level 1: Connector puzzle variables
// let connection1 = 0, connection2 = 0, connection3 = 0;
//
// //Level 2: Keypad puzzle variables
// let keyPadMessage = 0;
//
// function setup() {
//
//   // Serial communication protocols
//   // !!!!!!!!! Check the IPV4 address and enter it in the line below !!!!!!!!!!
//   serial = new p5.SerialPort('10.17.151.170'); // make a new instance of the serialport library
//   serial.on('list', printList); // set a callback function for the serialport list event
//   serial.on('data', serialEvent);     // callback for when new data arrives
//
//   serial.list();   // list the serial ports
//   serial.open(portName);   // open a serial port
//
//   canvas = createCanvas(620, 620);
//   canvas.position((windowWidth - width)/2, (windowHeight - height)/2);
//
// }
//
// function serialEvent(){
//   inData = serial.readStringUntil('\r\n');
//   // Don't do console logs unless you are debugging *insert profanity here*
//   console.log('got ' + inData);
//
//   if (inData.length > 0 ) {
//      sensorReadings = split(inData, ',');  // split the string on the commas
//     if (sensorReadings.length > 0) {
//
//       //Serial read from Digital 9 pin for the 1st puzzle
//       switchPlug = sensorReadings[0];
//
//       // Serial read from Digital 10 to Digital 12 pin for the 2nd puzzle
//       connection1 = sensorReadings[1];
//       connection2 = sensorReadings[2];
//       connection3 = sensorReadings[3];
//
//       // Serial read from Digital 2 to Digital 8 pin for the 3rd puzzle
//       keyPadMessage = sensorReadings[4];
//
//     }
//   }
// }
//
//
// function draw() {
//   background(20);
//   fill(25);
//   noStroke();
//   ellipse(width/2, height/2, 620, 620);
//
//   switch(gameLevel){
//     case 0:
//           levelZero();
//           break;
//     case 1:
//           levelOne();
//           break;
//     case 2:
//           levelTwo();
//           break;
//     default:
//           fill(255);
//           text("Welcome to reality Agent Smith", 50, 300);
//   }
// }
//
// function levelZero(){
//   fill(255);
//   textSize(20);
//
//   // Only connection 1 logic success
//   if(switchPlug == 0){
//     text("Device Disconnected: Connect Device!!!", 50, 300);
//   } else if(switchPlug == 1){
//     text("Device Connected!", 50, 200);
//     gameLevel = 1;
//   }
// }
//
// function levelOne(){
//   fill(255);
//   textSize(20);
//
//   // Only connection 1 logic success
//   if(connection1 == 0){
//     text("Connection 1 error", 20, 20);
//   } else if(connection1 == 1){
//     text("Stage 1 complete: Simone defeated the trolls", 20, 20);
//   }
//
//   // Only connection 2 logic success
//   if(connection2 == 0){
//     text("Connection 2 error", 20, 100);
//   } else if(connection2 == 1){
//     text("Stage 2 complete: Steve Jobs says he is the best", 20, 100);
//   }
//
//   // Only connection 3 logic success
//   if(connection3 == 0){
//     text("Connection 3 error", 20, 200);
//   } else if(connection2 == 1){
//     text("Stage 3 complete: Get it done - Tim Gunn, declared as the best quote ever!", 20, 200);
//   }
//
//   // When all connections are complete level sucess
//   if(connection1 == 1 && connection2 == 1 && connection3 == 1){
//     gameLevel = 2;
//   }
// }
//
// function levelTwo(){
//   fill(255);
//   textSize(36);
//
//   // Keypad success logic goes here
//   if(keyPadMessage == 0){
//     text("#PI*", 120, 300);
//   } else if(keyPadMessage == 1){
//     text("Welcome to reality Agent Smith", 70, 300);
//     gameLevel = 3;
//   }
// }
//
//
//
// // get the list of portList
// // Run this only when programming on a new device
// function printList(portList) {
//   console.log("Run commented script to view ports");
//  // for (let i = 0; i < portList.length; i++) {
//  // Display the list the console:
//  // console.log(i + " " + portList[i]);
//  // console.log('\n');
//  // }
// }



// Connection 1 success/failure logic
// if(connectionOne == 0){
//   text("Connection 1 absent", 20, 20);
// } else if(connectionOne == 1){
//   text("Connection 1 present", 20, 20);
// }
//
// // Connection 2 success/failure logic
// if(connectionTwo == 0){
//   text("Connection 2 absent", 20, 100);
// } else if(connectionTwo == 1){
//   text("Connection 2 present", 20, 100);
// }
//
// // Connection 3 success/failure logic
// if(connectionThree == 0){
//   text("Connection 3 absent", 20, 200);
// } else if(connectionThree == 1){
//   text("Connection 3 present", 20, 200);
// }
//
// // Connection 4 success/failure logic
// if(connectionFour == 0){
//   text("Connection 4 absent", 20, 300);
// } else if(connectionFour == 1){
//   text("Connection 4 present", 20, 300);
// }


// if (isLoaded) {
  frameRate(180);
  glitch.show();
// }




if (Serial.available() > 0) { // if there's serial data available
 int inByte = Serial.read();   // read it
 Serial.write(inByte);         // send it back out as raw binary data
 analogWrite(5, inByte);

 // map the mouseY to a range from 0 to 255:
 outByte = int(map(mouseY, 0, height, 0, 255));
 // send it out the serial port:
 serial.write(outByte);

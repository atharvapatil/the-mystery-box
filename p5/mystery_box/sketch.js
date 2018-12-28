//Code for the mystery machine box by Arnab Charavarty, Atharva Patil and Lillian Ritchie
// Written and developed originally for our Physical computing class at ITP by Jeff Fedderson

// Serial communication protocol variable declaration
let serial;
let portName = '/dev/cu.usbmodem1421';
let inData;
let sensorReadings = [];
// Serial communication variables end here.

//Global variables begin here
let canvas;
let gameLevel = 0;
//Golbal variables end here

// Level 1 VAR: Switch puzzle variables
let switchPlug = 1010;
let LDRCounter = 0;
// let isLoaded = false;
let glitch;
// Level 1 end of variables

//  Level 2 VAR: Connector variables
let connectionOne = 0,
  connectionTwo = 0,
  connectionThree = 0,
  connectionFour = 0;
let glitchImage;
let signalOne = 0,
  signalTwo = 0,
  signalThree = 0,
  signalFour = 0;
let sumGlitch = 0;
// Level 2 end of variables

// Level 3 VAR: Syncing sine waves

// Variable to change from serial communication //
let amplitudeOne = 0;
let amplitudeTwo = 50;
let frequencyOne = 0,
  frequencyTwo = 0;
let sineSound;
let waveCounter = 0;

let c1;
let c2;
let c3;
let c4;

let sineAlpha = 50;

// Do not touch these varibales
let yPoint = 0;
let timePeriod = 100;
let angularVelocity = 6.28 / timePeriod;
let time = 0;
let numOfParticles;
let phaseDifference = 0;
let diameter = 8;
// end of do not touch these variables

//  Level 3 end of variables

// Level 4 VAR: slider flow Connector

// General variables
let gridBackground;
let rectSize = 120;

// Declaring and initialising the slider positions.
let boxHeight1 = 120;
let boxHeight2 = 240;
let boxHeight3 = 320;

//Slider one completion lines
let alphaOne = 60;
let alphaTwo = 20;
let alphaThree = 20;

//Slider two completion lines
let alphaFour = 20;
let alphaFive = 20;
let alphaSix = 20;

//Slider three completion lines
let alphaSeven = 20;

// Booleans to checkCollison
let sliderOneSuccess = 0,
  sliderTwoSuccess = 0,
  sliderThreeSuccess = 0;

// Level 4 end of variables

// Level 5 VAR: Perlin noise control

let yoff = 0;
let noiseControlOne = 5;
let noiseControlTwo = 6;

// Level 5 end of variables
let perlinColor;
let perlinCounter = 0;


// Level 6 VAR: flip switch
let gridShape = [];
let boxSize = 80;

let flipSwitchOne = 0;
let flipSwitchTwo = 0;
let flipSwitchThree = 0;
let flipSwitchFour = 0;
let flipSwitchFive = 0;

let switchColor;

// Level 6 end of variables

// Level 7 antenna
// let flexValue;
// let currFlexValue;
// let prevFlexValue;

// Level 8 VAR: enter keypad code
let keypadCodeImage;
let keyPadMessage = 0;
let antennaSignal = 0;
// Level 7 end of variables

// Level 9 VAR: flip switch
let flipSwitchImage;
let launchButton = 0;
// Level 8 end of variables

let worldSavedImage;

function preload() {
  // preload image for level 4
  gridBackground = loadImage("gridBackground.png");
  glitchImage = loadImage("glitchImage.png");
  backgroundImage = loadImage("background.png");
  backgroundImage_1a = loadImage("Dashboard_UI_1a.png");
  backgroundImage_1b = loadImage("Dashboard_UI_1b.png");
  image_levelComplete2 = loadImage("Dashboard_UI_2.png");
  image_levelComplete3 = loadImage("Dashboard_UI_3.png");
  image_levelComplete4 = loadImage("Dashboard_UI_4.png");
  image_levelComplete5 = loadImage("Dashboard_UI_5.png");
  image_levelComplete6 = loadImage("Dashboard_UI_6.png");
  image_levelComplete7 = loadImage("Dashboard_UI_7.png");
  keypadCodeImage = loadImage("Dashboard_UI_11.png");
  flipSwitchImage = loadImage("Dashboard_UI_9.png");
  worldSavedImage = loadImage("Dashboard_UI_10.png");
  // sineSound = loadSound('SineWave.mp3');
}


function setup() {

  colorMode(RGB, 100);
  // Serial communication protocols
  // !!!!!!!!! Check the IPV4 address and enter it in the line below !!!!!!!!!!
  serial = new p5.SerialPort('10.17.246.29'); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('data', serialEvent); // callback for when new data arrives

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port

  // Creating a canvas and centering it in the screen
  canvas = createCanvas(620, 620);
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  //Part of level 2 setup

  numOfParticles = width / diameter;


  glitch = new Glitch(glitchImage);

  for (i = 0; i < 50; i++) {
    gridShape[i] = [];
    for (j = 0; j < 50; j++) {
      gridShape[i][j] = 0;
    }
  }

  for (let i = 0; i < 32; i++) {
    for (let j = 0; j < 32; j++) {
      gridShape[i][j] = new Grid(i * boxSize, j * boxSize);
    }
  }

  //Level 6 setup
  perlinColor = color(255, 0, 0, 20);

}

// Recieve serial communication here
function serialEvent() {
  inData = serial.readStringUntil('\r\n');
  // Don't do console logs unless you are debugging
  //console.log('got ' + inData);

  if (inData.length > 0) {
    sensorReadings = split(inData, ','); // split the string on the commas
    if (sensorReadings.length > 0) {

      // Level 1: Serial read from Analog 0 pin for the switch connect
      switchPlug = sensorReadings[0];

      // Level 2: Serial read from A1 to A4 for the headphone puzzle
      connectionOne = sensorReadings[1]; // Pink
      connectionTwo = sensorReadings[2]; // Orange
      connectionThree = sensorReadings[3]; // yellow
      connectionFour = sensorReadings[4]; // green

      //Level 3: Serial read from Analog pins A5 to A8 for the sync waves

      //Data from pins A5 and A6
      amplitudeOne = floor(map(sensorReadings[5], 10, 1010, 50, 150));
      frequencyOne = floor(map(sensorReadings[6], 10, 1010, 1, 8));

      // Date from pins A7 and A8
      frequencyTwo = floor(map(sensorReadings[8], 10, 1010, 1, 8));
      amplitudeTwo = floor(map(sensorReadings[7], 10, 1010, 50, 150));

      // Level 4: Serial read from A9 to A11 for the slider positions
      boxHeight1 = floor(map(sensorReadings[9], 0, 1023, 20, 600));
      boxHeight2 = floor(map(sensorReadings[10], 1023, 0, 20, 600));
      boxHeight3 = floor(map(sensorReadings[11], 1023, 0, 20, 600));

      // Level 5: Serial read from A12 & A13 for voltmeter pots perlin noise control
      noiseControlOne = floor(map(sensorReadings[12], 0, 1023, 1, 100));
      noiseControlTwo = floor(map(sensorReadings[13], 0, 1023, 1, 100));

      // Level 6: Serial read flip switches and states from Digital pins
      flipSwitchOne = sensorReadings[14];
      flipSwitchTwo = sensorReadings[15];
      flipSwitchThree = sensorReadings[16];
      flipSwitchFour = sensorReadings[17];
      flipSwitchFive = sensorReadings[18];

      //Level 7: Antenna
      //flexValue=sensorReadings[19];

      // Level 8: Keypad code entering from Digital pins
      keyPadMessage = sensorReadings[19];
    //  antennaSignal = sensorReadings[20];


      // Level 9: Launch ignition
      launchButton = sensorReadings[20];
    }
  }
}

// So after waves we have sliders then perlin noise and then flips and then keypad and then the launch button right?

function draw() {

  //Drawing elements on the canvas.
  background(20);
  fill(25);
  noStroke();
  ellipse(width / 2, height / 2, 620, 620);

  // Game levels logic and their cases controlled by the VAR gameLevel are here
  switch (gameLevel) {
    case 0:
      levelOne(); //Ethernet cable connector puzzle, gameLevel == 0
      break;
    case 1:
      levelTwo(); //Headphone jack puzzle, gameLevel == 1
      break;
    case 2:
      levelThree(); //Wave syncing puzzle, gameLevel == 2
      break;
    case 3:
      levelFour(); //Slider syncing level, gameLevel == 3
      break;
    case 4:
      levelFive(); //Voltmeter + perlin noise syncing level, gameLevel == 4
      break;
    case 5:
      levelSix(); //flip switch syncing level, gameLevel == 5
      break;
    case 6:
      levelSeven(); //keypad code level, gameLevel == 6
      break;
    case 7:
      levelEight(); //launch flip level, gameLevel == 7
      break;

      case 8:
        levelNine(); //launch flip level, gameLevel == 7
        break;
        case 9:
          finalState(); //launch flip level, gameLevel == 7
          break;
    default:
      // fill(255);
      // textSize(24);
      // textAlign(CENTER);
      // text("Welcome to reality, Agent Smith", 310, 310);
      image(worldSavedImage, 0, 0);
  }
}

function levelOne() {

  image(backgroundImage_1a, 0, 0);

  if (switchPlug < 960) {

    LDRCounter++;
    //gameLevel = 1;
  }

  if (LDRCounter > 6) {
    image(backgroundImage_1b, 0, 0);
  }

  if (LDRCounter > 12) {
    gameLevel = 1;
  }


  // Hack to skip levels for debugging or if something breaks midway.
  if (key == '2') {
    gameLevel = 2;
  }
  //End of hack statement

}

function levelTwo() {

  glitch.show();
  //
  // // //pinkcable=3
  // if (connectionOne == 91 || connectionOne == 90 || connectionOne == 92 || connectionOne == 89 || connectionOne == 88 || connectionOne == 92) {
  //   signalThree = 1;
  // } else {
  //   signalThree = 0;
  // }
  // //orange cable=2
  // if (connectionTwo == 100 || connectionTwo == 101 || connectionTwo == 102 || connectionTwo == 103 || connectionTwo == 104 || connectionTwo == 105 || connectionTwo == 106 || connectionTwo == 107 || connectionTwo == 108 || connectionTwo == 109 || connectionTwo == 117 || connectionTwo == 118 || connectionTwo == 119 || connectionTwo == 120 || connectionTwo == 121 || connectionTwo == 122 || connectionTwo == 123 || connectionTwo == 124 || connectionTwo == 125 || connectionTwo == 126 || connectionTwo == 127 || connectionTwo == 128 || connectionTwo == 129 || connectionTwo == 130 || connectionTwo == 131) {
  //   signalTwo = 1;
  // } else {
  //   signalTwo = 0;
  // }
  // // yellow cable=4
  // if (connectionThree == 853 || connectionThree == 852 || connectionThree == 854 || connectionThree == 852 || connectionThree == 855) {
  //   signalFour = 1;
  // } else {
  //   signalFour = 0;
  // }
  // // green cable=1
  // if (connectionFour == 930 || connectionFour == 929 || connectionFour == 931 || connectionFour == 928 || connectionFour == 932) {
  //   signalOne = 1;
  // } else {
  //   signalOne = 0;
  // }

  // //pinkcable=3
  if (connectionOne != 0) {
    signalThree = 1;
  } else {
    signalThree = 0;
  }
  //orange cable=2
  if (connectionTwo != 0) {
    signalTwo = 1;
  } else {
    signalTwo = 0;
  }
  // yellow cable=4
  if (connectionThree != 0) {
    signalFour = 1;
  } else {
    signalFour = 0;
  }
  // green cable=1
  if (connectionFour != 0) {
    signalOne = 1;
  } else {
    signalOne = 0;
  }

  sumGlitch = signalOne + signalTwo + signalThree + signalFour;

  //console.log(sumGlitch);

  if (sumGlitch == 0) {
    frameRate(5);
  } else if (sumGlitch == 1) {
    frameRate(5);
  } else if (sumGlitch == 2) {
    frameRate(60);
  } else if (sumGlitch == 3) {
    frameRate(180);
  }

  // if (sumGlitch == 4) {
  //   image(image_levelComplete2, 0, 0)
  //   setTimeout(changeLevel2, 3000);
  //   gameLevel = 2;
  // }

  if (connectionOne != 0 && connectionTwo != 0 && connectionThree != 0 && connectionFour != 0) {
    image(image_levelComplete2, 0, 0)
    setTimeout(changeLevel2, 3000);
    //gameLevel = 2;
  }

  // Hack to skip levels for debugging or something breaks.
  if (key == '3') {
    gameLevel = 2;
  }
  //End of hack statement
}

function levelThree() {

  frameRate(60);

  c1 = color(229, 57, 53, sineAlpha);
  c2 = color(0, 0, 199, sineAlpha);
  c3 = color(0, 254, 37, sineAlpha);

  if (amplitudeOne == amplitudeTwo) {
    sineAlpha = 100;
    //gameLevel = 3;
  } else {
    sineAlpha = 50;
  }

  if (frequencyOne == frequencyTwo) {
    c1 = c3;
    c2 = c3;
    //gameLevel = 3;
  } else {
    sineAlpha = 50;
  }


  image(gridBackground, 0, 0);


  //Progressig sine wave
  time += 1;
  //Progresing sine wave end

  // Drawing wave 1 with amplitudeOne & frequencyOne as veriables
  for (let i = 0; i < numOfParticles + 1; i++) {
    fill(c1);
    yPoint = sin(angularVelocity * (time - phaseDifference)) * amplitudeOne;
    ellipse(i * diameter, height / 2 + yPoint, diameter, diameter);
    phaseDifference += frequencyOne;
  }

  // Drawing wave 2 with amplitudeTwo & frequencyTwo as veriables
  for (let j = 0; j < numOfParticles + 1; j++) {
    fill(c2);
    yPoint = sin(angularVelocity * (time - phaseDifference)) * amplitudeTwo;
    ellipse(j * diameter, height / 2 + yPoint, diameter, diameter);
    phaseDifference += frequencyTwo;
  }

  // resetting for the next draw
  phaseDifference = 0;

  // console.log(amplitudeOne, amplitudeTwo, frequencyOne, frequencyTwo);

  // if(!sineSound.isPlaying()){
  // sineSound.play();
  //   while(abs(frequencyOne - frequencyTwo) == 5){
  //     sineSound.rate(0.01);
  //   }
  //   while(abs(frequencyOne - frequencyTwo) == 4 || abs(frequencyOne - frequencyTwo) == 3){
  //     sineSound.rate(1);
  //   }
  //   while(abs(frequencyOne - frequencyTwo) == 2 || abs(frequencyOne - frequencyTwo) == 1){
  //     sineSound.rate(2);
  //   }
  //   while(abs(frequencyOne - frequencyTwo) == 0){
  //     sineSound.rate(4);
  //   }
  // }

  // if(key == "s"){
  //   sineSound.stop();
  // }
  //console.log(amplitudeOne, amplitudeTwo);
  //console.log(frequencyOne, frequencyTwo);


  if ((amplitudeOne - amplitudeTwo) <3 && (frequencyOne - frequencyTwo)<3) {
    image(image_levelComplete3, 0, 0)
    setTimeout(changeLevel3, 3000);
  }

  // Hack to skip levels for debugging or something breaks.
  if (key == '4') {
    gameLevel = 3;
  }
  //End of hack statement
}

function levelFour() {


  // Switch plug connected logic success
  if (sliderOneSuccess == 0 || sliderTwoSuccess == 0 || sliderThreeSuccess == 0) {
    // text("Device Disconnected: Connect Device!!!", 150, 300);
    image(gridBackground, 0, 0);
    colorMode(RGB, 100);
    controlUI();
    checkCollison();
    drawBox();

  } else if (sliderOneSuccess == 1 && sliderTwoSuccess == 1 && sliderThreeSuccess == 1) {
    image(image_levelComplete4, 0, 0)
    setTimeout(changeLevel4, 3000);
  }

  // Hack to skip levels for debugging or if something breaks midway.
  if (key == '5') {
    gameLevel = 4;
  }
  //End of hack statement
}

function levelSix() {

  //console.log("level six");
  //tint(255, 60);

  let diff = abs(noiseControlOne - noiseControlTwo);

  if (diff == 0) {
    diff = 1;
  }

  if (diff <= 10 && (noiseControlOne < 30 || noiseControlTwo < 30)) {
    tint(255, 60);
    image(gridBackground, 0, 0);
    perlinColor = color(0, 255, 0, 30);
    //fill(perlinColor);
  } else {
    //tint(255, 60);
    image(gridBackground, 0, 0);
    perlinColor = color(0, 0, 255, 30);
    //fill(perlinColor);
  }


  fill(perlinColor);
  // We are going to draw a polygon out of the wave points
  beginShape();

  var xoff = 0; // Option #1: 2D Noise
  //var xoff = yoff; // Option #2: 1D Noise

  // Iterate over horizontal pixels
  for (var x = 0; x <= width; x += 5) {
    // Calculate a y value according to noise, map to

    // Option #1: 2D Noise
    var y = map(noise(xoff, yoff), 0, 0.2, 50, 150);

    // Option #2: 1D Noise
    //var y = map(noise(xoff), 0, 1, 200,300);

    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += (diff) / 100;
  }
  // increment y dimension for noise
  yoff += (diff) / 100;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  console.log(abs(noiseControlOne - noiseControlTwo));

  if (diff <= 10 && (noiseControlOne < 30 || noiseControlTwo < 30)) {
    perlinCounter++;
    //gameLevel = 6;
  }

  if (perlinCounter > 90) {
    image(image_levelComplete6, 0, 0);
    setTimeout(changeLevel6, 1000);
  }


  // Hack to skip levels for debugging or if something breaks midway.
  if (key == '7') {
    gameLevel = 6;
  }
  //End of hack statement
}

function levelFive() {

  //console.log("here!");

  image(backgroundImage, 0, 0);

  colorMode(RGB, 100);
  switchColor = (255, 255, 255, 10);
  for (let i = 0; i < 32; i++) {
    for (let j = 0; j < 32; j++) {
      gridShape[i][j].display();
    }
  }

  //changeGrid();

  if (flipSwitchOne == 1 && flipSwitchTwo == 1 && flipSwitchThree == 0 && flipSwitchFour == 0 && flipSwitchFive == 0) {
    image(image_levelComplete5, 0, 0);
    setTimeout(changeLevel5, 3000);
  }

  // Hack to skip levels for debugging or if something breaks midway.
  if (key == '6') {
    gameLevel = 5;
  }
  //End of hack statement

}

// function levelSeven() {
//
//   // console.log(flexValue);
//
// }

function levelSeven() {

  background(20);
  noStroke();
  fill(255);
  textSize(36);

  // Keypad success logic goes here
  if (keyPadMessage == 0) {
    image(keypadCodeImage, 0, 0);
  } else if (keyPadMessage == 1) {
    gameLevel = 7;
  }

  // Hack to skip levels for debugging or if something breaks midway.
  if (key == '8') {
    gameLevel = 7;
  }
  //End of hack statement
}

function levelEight() {

console.log(launchButton);
  // fill(255);
  // text("Flip the switch! Save the world", 310, 310);

  if (launchButton == 0) {
    image(flipSwitchImage, 0, 0);
    //finalState();

  }



  if (launchButton == 1) {
    gameLevel = 9;
    //finalState();

  }

  // Hack to skip levels for debugging or if something breaks midway.
  if (key == '9') {
    image(worldSavedImage, 0, 0);
  }
  //End of hack statement


}

// get the list of portList
// Run this only when programming on a new device
function printList(portList) {
  console.log("Run commented script to view ports");
  // for (let i = 0; i < portList.length; i++) {
  // Display the list the console:
  // console.log(i + " " + portList[i]);
  // console.log('\n');
  // }
}

function checkCollison() {

  if (boxHeight1 > 180 && boxHeight1 < 190) {
    sliderOneSuccess = 1;
    alphaOne = alphaTwo = 60;
  } else {
    sliderOneSuccess = 0;
    alphaOne = alphaTwo = alphaThree = alphaFour = alphaFive = alphaSix = alphaSeven = 20;
  }

  if ((boxHeight2 > 415 && boxHeight2 < 425) && sliderOneSuccess == 1) {
    sliderTwoSuccess = 1;
    alphaThree = alphaFour = 60;
  } else {
    sliderTwoSuccess = 0;
    alphaThree = alphaFour = alphaFive = alphaSix = alphaSeven = 20;
  }

  if ((boxHeight3 > 225 && boxHeight3 < 235) && sliderOneSuccess == 1 && sliderTwoSuccess == 1) {
    sliderThreeSuccess = 1;
    alphaFive = alphaSix = alphaSeven = 60;
  } else {
    sliderThreeSuccess = 0;
    alphaFive = alphaSix = alphaSeven = 20;
  }

}

function drawBox() {

  noStroke();
  c = color(0, 254, 37, 25);
  fill(c);

  box1a = rect(0 + 70, 0, rectSize, boxHeight1, 2);
  box1b = rect(0 + 70, boxHeight1 + 15, rectSize, width - boxHeight1, 2);

  box2a = rect(0 + 70 + rectSize + rectSize / 2, 0, rectSize, boxHeight2, 2);
  box2b = rect(0 + 70 + rectSize + rectSize / 2, boxHeight2 + 15, rectSize, width - boxHeight2, 2);

  box3a = rect(0 + 70 + (rectSize + rectSize / 2) * 2, 0, 120, boxHeight3, 2);
  box3b = rect(0 + 70 + (rectSize + rectSize / 2) * 2, boxHeight3 + 15, rectSize, width - boxHeight3, 2);


  c = color(0, 0, 199, 60);
  fill(c);
  singalBox1 = rect(0, 305, 60, 5);
  signalBox2 = rect(55, 190, 5, 115);

  c3 = color(0, 0, 199, alphaOne);
  fill(c3);
  singalBox3 = rect(60, 190, 170, 5);

  c4 = color(0, 0, 199, alphaTwo);
  fill(c4);
  signalBox4 = rect(225, 195, 5, 235);

  c5 = color(0, 0, 199, alphaFour);
  fill(c5);
  singalBox5 = rect(230, 425, 160, 5);

  c6 = color(0, 0, 199, alphaFour);
  fill(c6);
  signalBox6 = rect(390, 240, 5, 190);

  c7 = color(0, 0, 199, alphaFive);
  fill(c7);
  singalBox7 = rect(390, 235, 170, 5);

  c8 = color(0, 0, 199, alphaSix);
  fill(c8);
  signalBox8 = rect(560, 235, 5, 75);

  c9 = color(0, 0, 199, alphaSeven);
  fill(c9);
  singalBox9 = rect(565, 305, 60, 5);

}

function controlUI() {

  if (keyIsDown(83) && boxHeight1 < 455) {
    boxHeight1 += 1;
  }

  if (keyIsDown(87) && boxHeight1 > 150) {
    boxHeight1 -= 1;
  }

  if (keyIsDown(68) && boxHeight2 < 455) {
    boxHeight2 += 1;
  }

  if (keyIsDown(69) && boxHeight2 > 150) {
    boxHeight2 -= 1;
  }

  if (keyIsDown(70) && boxHeight3 < 455) {
    boxHeight3 += 1;
  }

  if (keyIsDown(82) && boxHeight3 > 150) {
    boxHeight3 -= 1;
  }
}

function Grid(locX, locY) {

  this.x = locX;
  this.y = locY;
  this.display = function() {

    noStroke();

    if (flipSwitchOne == 0) {
      fill(switchColor);
      triangle(this.x, this.y, this.x + (boxSize / 2), this.y, this.x, this.y + (boxSize / 2));
    }

    if (flipSwitchOne == 1) {
      fill(switchColor);
      triangle(this.x + (boxSize / 2), this.y + (boxSize / 2), this.x + (boxSize / 2), this.y, this.x, this.y + (boxSize / 2));
    }

    if (flipSwitchTwo == 1) {
      fill(switchColor);
      triangle(this.x + (boxSize / 2), this.y, this.x + (boxSize), this.y, this.x + (boxSize / 2), this.y + (boxSize / 2));
    }

    if (flipSwitchTwo == 0) {
      fill(switchColor);
      triangle(this.x + (boxSize), this.y + (boxSize / 2), this.x + (boxSize), this.y, this.x + (boxSize / 2), this.y + (boxSize / 2));
    }


    if (flipSwitchThree == 0) {

      triangle(this.x, this.y + (boxSize / 2), this.x + (boxSize / 2), this.y + (boxSize / 2), this.x, this.y + (boxSize));
    }

    if (flipSwitchThree == 1) {
      fill(switchColor);
      triangle(this.x + (boxSize / 2), this.y + (boxSize), this.x + (boxSize / 2), this.y + (boxSize / 2), this.x, this.y + (boxSize));
    }

    if (flipSwitchFour == 1) {
      fill(switchColor);
      triangle(this.x + (boxSize / 2), this.y + (boxSize / 2), this.x + (boxSize), this.y + (boxSize / 2), this.x + (boxSize / 2), this.y + (boxSize));
    }

    if (flipSwitchFour == 0) {
      fill(switchColor);
      triangle(this.x + (boxSize), this.y + (boxSize), this.x + (boxSize), this.y + (boxSize / 2), this.x + (boxSize / 2), this.y + (boxSize));
    }


    if (flipSwitchFive == 1) {
      switchColor = color(255, 255, 255, 10);
    }


    if (flipSwitchFive == 0) {
      switchColor = color(0, 99, 10, 50);
    }

  }

}


function changeGrid() {
  if (key === 'a') {
    switch1 = !switch1;
  }

  if (key === 's') {
    switch2 = !switch2;
  }

  if (key === 'd') {
    switch3 = !switch3;
  }

  if (key === 'f') {
    switch4 = !switch4;
  }

  if (key === 'g') {
    switch5 = !switch5;
  }
  // uncomment to prevent any default behavior
  return false;
}

function changeLevel2() {
  gameLevel = 2;
}

function changeLevel3() {
  gameLevel = 3;
}

function changeLevel4() {
  gameLevel = 4;
}

function changeLevel5() {
  gameLevel = 5;
}

function changeLevel6() {
  gameLevel = 7;
}

function changeLevel7() {
  gameLevel = 7;
}

function finalState(){

  image(worldSavedImage, 0, 0);
}

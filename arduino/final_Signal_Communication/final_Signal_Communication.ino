#include <LiquidCrystal.h>
//#include <Key.h>
#include <Keypad.h>
#include <Password.h>

int switchPLug = 10;

// Variables for keypad puzzle
Password password = Password( "0451" );

const byte ROWS = 4; //four rows
const byte COLS = 3; //three columns
char keys[ROWS][COLS] = {
  {'1','2','3'},
  {'4','5','6'},
  {'7','8','9'},
  {'*','0','#'}
};
byte rowPins[ROWS] = {5, 6, 7, 8}; //connect to the row pinouts of the keypad
byte colPins[COLS] = {2, 3, 4}; //connect to the column pinouts of the keypad

Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS );

int passKey = 0;

int startFlag=0;

LiquidCrystal lcd(7, 8, 9, 10, 11 , 12);

void setup() {

  Serial.begin(9600);

  lcd.begin(16, 2);
  lcd.setCursor(0,1);
  lcd.write("SOLVE THE PUZZLE");

  pinMode(switchPLug, INPUT);
  
  keypad.addEventListener(keypadEvent); //add an event listener for this keypad

  Serial.flush();

}

void loop() {

   keypad.getKey();
  
 // Singals for Level 1: Switch plug BEGIN HERE
   int sensorValue = analogRead(A0);
   Serial.print(sensorValue);
   Serial.print(",");


  // Signals for Level 2: Headphone jack connector BEGIN HERE
//
  // parse connection 1 reading here:
   sensorValue = analogRead(A1);
   Serial.print(sensorValue);
   Serial.print(",");

  // parse connection 2 reading here:
   sensorValue = analogRead(A2);
   Serial.print(sensorValue);
   Serial.print(",");
//
//   // parse connection 3 reading here:
   sensorValue = analogRead(A3);
   Serial.print(sensorValue);
   Serial.print(",");
//
//   // parse connection 4 reading here:
   sensorValue = analogRead(A4);
   Serial.print(sensorValue);
   Serial.print(",");

  // Signals for Level 2: Headphone jack connector END HERE


 // Signals for Level 3: syncing waves BEGIN HERE
  
//   parse wave 1 amplitude :
   sensorValue = analogRead(A5);
   Serial.print(sensorValue);
   Serial.print(","); 
//   
//   // parse wave 1 frequency:
   sensorValue = analogRead(A6);
   Serial.print(sensorValue);
   Serial.print(",");
//   
//   // parse wave 2 frequency:
   sensorValue = analogRead(A7);
   Serial.print(sensorValue);
   Serial.print(",");
//    
//    // parse wave 2 amplitude:
    sensorValue = analogRead(A8);
    Serial.print(sensorValue);
    Serial.print(",");

  // Signals for Level 3: syncing waves END HERE

  // Signals for level 4: Slider syncing BEGIN HERE

//    // parse slide 1 value
    sensorValue = analogRead(A9);
    Serial.print(sensorValue);
    Serial.print(",");
//
//    // parse slide 2 value
    sensorValue = analogRead(A10);
    Serial.print(sensorValue);
    Serial.print(",");
//
//    // parse slide 3 value
    sensorValue = analogRead(A11);
    Serial.print(sensorValue);
    Serial.print(",");

  // Signals for level 4: Slider syncing END HERE

  // Signals for level 5: Perlin noise syncing BEGIN HERE

  // parse pot 1 value
    sensorValue = analogRead(A12);
    Serial.print(sensorValue);
    Serial.print(",");

// parse pot 2 value
    sensorValue = analogRead(A13);
    Serial.print(sensorValue);
    Serial.print(",");
  
// Signals for level 5: Perlin noise syncing END HERE

// Signals for level 6: flip switch syncing BEGIN HERE

    // parse flip 1 value
    sensorValue = digitalRead(22);
    Serial.print(sensorValue);
    Serial.print(",");
//
//    // parse flip 2 value
    sensorValue = digitalRead(23);
    Serial.print(sensorValue);
    Serial.print(",");
//
//    // parse flip 3 value
    sensorValue = digitalRead(24);
    Serial.print(sensorValue);
    Serial.print(",");
//
//    // parse flip 4 value
    sensorValue = digitalRead(25);
    Serial.print(sensorValue);
    Serial.print(",");
//
//    // parse flip 5 value
    sensorValue = digitalRead(26);
    Serial.print(sensorValue);
    Serial.print(",");


  // Signals for Level 6: keypad scrambler BEGIN here

    // parse Keypad state;
    Serial.print(passKey);
    Serial.print(",");

    
    sensorValue = digitalRead(27);
    Serial.println(sensorValue);

//delay(100);

}


// KEYPAD PASSOWRD LOGIC: DON"T TOUCH
void keypadEvent(KeypadEvent eKey){
  switch (keypad.getState()){
    case PRESSED:
//  Serial.print("Pressed: ");
//  Serial.println(eKey);
  switch (eKey){
    case '*': checkPassword(); break;
    case '#': password.reset(); break;
    default: password.append(eKey);
     }
  }
}

void checkPassword(){
  if (password.evaluate()){
//    Serial.println("Success");
    passKey = 1;
  }else{
//    Serial.println("Wrong");
    passKey = 0;
  }
}

// KEYPAD PASSOWRD LOGIC: DON"T TOUCH

/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  //key codes
  var KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    W: 87,
    A: 65,
    S: 83,
    D: 68,
  }
  //x-coordinate location for player 1
  var location1X = 0;
  //y-coordinate location for player 1
  var location1Y = 0;
  //x-axis speed for player 1
  var speed1X = 0;
  //y-axis speed for player 1
  var speed1Y = 0;
  //x-coordinate location for player 2
  var location2X = 0;
  //y-coordinate location for player 2
  var location2Y = 0;
  //x-axis speed for player 2
  var speed2X = 0;
  //x-axis speed for player 2
  var speed2Y = 0;

  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);  
  $(document).on('keydown', handleKeyDown2);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp2); 
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    checkPosition();
    checkPosition2();
    checkCollision();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.DOWN) {
      speed1Y = 5;
    }
    if (event.which === KEY.UP) {
      speed1Y = -5;
    }
    if (event.which === KEY.RIGHT) {
      speed1X = 5;
    }
    if (event.which === KEY.LEFT) {
      speed1X = -5;
    }
  }  
  function handleKeyDown2(event) {
    if (event.which === KEY.S) {
      speed2Y = 5;
    }
    if (event.which === KEY.W) {
      speed2Y = -5;
    }
    if (event.which === KEY.D) {
      speed2X = 5;
    }
    if (event.which === KEY.A) {
      speed2X = -5;
    }
  }

  function handleKeyUp(event) {
    if (event.which !== KEY.DOWN) {
      speed1Y = 0;
    }
    if (event.which !== KEY.UP) {
      speed1Y = 0;
    }
    if (event.which !== KEY.RIGHT) {
      speed1X = 0;
    }
    if (event.which !== KEY.DOWN) {
      speed1X = 0;
    }
  }
  function handleKeyUp2(event) {
    if (event.which !== KEY.S) {
      speed2Y = 0;
    }
    if (event.which !== KEY.W) {
      speed2Y = 0;
    }
    if (event.which !== KEY.D) {
      speed2X = 0;
    }
    if (event.which !== KEY.A) {
      speed2X = 0;
    }
  }
function checkPosition() {
  if (location1X > 390) {
    location1X = 390;
  }
  if (location1Y > 390) {
    location1Y = 390;
  }
  if (location1X < 0) {
    location1X = 0;
  }
  if (location1Y < 0) {
    location1Y = 0;
  }
}
function checkPosition2() {
  if (location2X > 390) {
    location2X = 390;
  }
  if (location2Y > 390) {
    location2Y = 390;
  }
  if (location2X < 0) {
    location2X = 0;
  }
  if (location2Y < 0) {
    location2Y = 0;
  }
}
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  //repositions walker when keys are pressed
  function repositionGameItem() {
    location1X += speed1X;
    location1Y += speed1Y;
    location2X += speed2X;
    location2Y += speed2Y;
  }
  //redraws walker each time it moves
  function redrawGameItem() {
    $('#walker').css("left", location1X);
    $('#walker').css('top', location1Y);
    $('#walker2').css("left", location2X);
    $('#walker2').css('top', location2Y);
  }
  
  function checkCollision() {
    if (location1X == location2X && location1Y == location2Y) {
      console.log('Collision')
      if ($('#walker').css('background-color') === 'red') {
        $('#walker').css('background-color', 'teal');
        $('#walker2').css('background-color', 'red');
      } else if ($('#walker2').css('background-color') === 'red') {
        $('#walker2').css('background-color', 'teal');
        $('#walker').css('background-color', 'red');
      }
    }
  }
  function endGame() { 
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}

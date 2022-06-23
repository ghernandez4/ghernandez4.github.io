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
    C: 67
  }
var walker1 = fF('#walker');
var walker2 = fF('#walker2');
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  //enables controls for players 1 and 2
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);   
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
    checkWalls(walker1, walker2);
  }
  function fF(id) {
    var tempobj = {};
    tempobj.id = id;
    tempobj.x = parseFloat($(id).css('left'));
    tempobj.y = parseFloat($(id).css('top'));
    tempobj.speedX = 0;
    tempobj.speedY = 0;
    tempobj.width = $(id).width();
    tempobj.height = $(id).height();
    return tempobj;
  }
  /* 
  Called in response to events.
  */
 //movement function for player 1
  function handleKeyDown(event) {
    if (event.which === KEY.DOWN) {
      walker1.speedY = 5;
    }
    if (event.which === KEY.UP) {
      walker1.speedY = -5;
    }
    if (event.which === KEY.RIGHT) {
      walker1.speedX = 5;
    }
    if (event.which === KEY.LEFT) {
      walker1.speedX = -5;
    }
    if (event.which === KEY.S) {
      walker2.speedY = 5;
    }
    if (event.which === KEY.W) {
      walker2.speedY = -5;
    }
    if (event.which === KEY.D) {
      walker2.speedX = 5;
    }
    if (event.which === KEY.A) {
      walker2.speedX = -5;
    }
    if (event.which === KEY.C) {
      swapTeams();
    }
  } 
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT) {
      walker1.speedX = 0;
    }
    if (event.which === KEY.UP || event.which === KEY.DOWN) {
      walker1.speedY = 0;
    }
    if (event.which === KEY.S || event.which === KEY.W) {
      walker2.speedY = 0;
    }
    if (event.which === KEY.D || event.which === KEY.A) {
      walker2.speedX = 0;
    }
  } 
  //movement function for player 2
  // function handleKeyDown2(event) {
  //   if (event.which === KEY.S) {
  //     walker2.speedY = 5;
  //   }
  //   if (event.which === KEY.W) {
  //     walker2.speedY = -5;
  //   }
  //   if (event.which === KEY.D) {
  //     walker2.speedX = 5;
  //   }
  //   if (event.which === KEY.A) {
  //     walker2.speedX = -5;
  //   }
  // }
  // function handleKeyUp2(event) {
  //   if (event.which === KEY.S || event.which === KEY.W) {
  //     walker2.speedY = 0;
  //   }
  //   if (event.which === KEY.D || event.which === KEY.A) {
  //     walker2.speedX = 0;
  //   }
  // }
  //set borders for player 1
function checkPosition() {
  if (walker1.x > 390) {
    walker1.x = 390;
  }
  if (walker1.y > 390) {
    walker1.y = 390;
  }
  if (walker1.x < 0) {
    walker1.x = 0;
  }
  if (walker1.y < 0) {
    walker1.y = 0;
  }
}
//set border for player 2
function checkPosition2() {
  if (walker2.x > 390) {
    walker2.x = 390;
  }
  if (walker2.y > 390) {
    walker2.y = 390;
  }
  if (walker2.x < 0) {
    walker2.x = 0;
  }
  if (walker2.y < 0) {
    walker2.y = 0;
  }
}
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function swapTeams() {
    var temp = $('#walker').css('background-color');
    var temp2 = $('#walker2').css('background-color');
    $('#walker').css('background-color', temp2);
    $('#walker2').css('background-color', temp);
  }

  //repositions walker when keys are pressed
  function repositionGameItem() {
    walker1.x += walker1.speedX;
    walker1.y += walker1.speedY;
    walker2.x += walker2.speedX;
    walker2.y += walker2.speedY;
  }
  //redraws walker each time it moves
  function redrawGameItem() {
    $('#walker').css("left", walker1.x);
    $('#walker').css('top', walker1.y);
    $('#walker2').css("left", walker2.x);
    $('#walker2').css('top', walker2.y);
  }
  
  function checkWalls(square1, square2) {
    square1.left = square1.x;
    square1.top = square1.y;
    square1.right = square1.x + square1.width;
    square1.bottom = square1.y + square1.height;
    
    // TODO: Do the same for square2
    square2.left = square2.x
    square2.top = square2.y
    square2.right = square2.x + square2.width;
    square2.bottom = square2.y + square2.height;
    // TODO: Return true if they are overlapping, false otherwise
if ((square1.right > square2.left) && (square1.left < square2.right) && (square1.bottom > square2.top) && (square1.top < square2.bottom)) {
endGame();
}
  }
  function endGame() { 
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}

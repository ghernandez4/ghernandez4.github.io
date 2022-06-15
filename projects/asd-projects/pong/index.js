/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects
  var ball;
  var paddle1;
  var paddle2;

var KEY = {
  'W': 'w',
  'S': 's',
  'UP': 'ArrowUp',
  'DOWN': 'ArrowDown'
}

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keyDown', handleKeyDown);                             // change 'eventType' to the type of event you want to handle
  $(document).on('keyUp', handleKeyUp)

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    

  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.key === KEY.UP) {
      speed1 = 5;
    } else if (event.key === KEY.DOWN) {
      speed1 = -5;
    } else if (event.key === KEY.W) {
      speed2 = 5;
    } else if (event.key === KEY.S) {
      speed2 = -5;
    }
  }
  function handleKeyUp(event) {
    if (event.key === KEY.UP || event.key === KEY.DOWN) {
      speed1 = 0;
    } else if (event.key === KEY.W || event.key === KEY.S) {
      speed2 = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function drawPaddle(paddle, x, y) {
    $('#' + paddle).css('top', y);
    $('#' + paddle).css('left', x);
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}

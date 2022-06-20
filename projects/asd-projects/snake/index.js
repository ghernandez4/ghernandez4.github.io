/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var snake = {
    head : {
      id: "#head",
      x: 220,
      y: 220,
      speedX: 0,
      speedY: 0,
      direction: '',
    }
  };
  var board = {
    width: 421,
    height: 421,
  }
  score = 0;
  var FRAME_RATE = 10;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // Game Item Objects
var KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    checkPosition();
    drawSnake(snake.head, snake.head);
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT && snake.head.direction !== "right") { 
      snake.head.direction = "left"; 
    } else if (event.which === KEY.RIGHT && snake.head.direction !== "left") {
      snake.head.direction = "right";
    } else if (event.which === KEY.UP && snake.head.direction !== "down") {
      snake.head.direction = "up";
    } else if (event.which === KEY.DOWN && snake.head.direction !== "up") {
      snake.head.direction = "down";
    }; 
    console.log(snake.head.direction)
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
function drawSnake(piece) {
  updateSnake(snake.head);
  updateHeadPosition(snake);
  $('#snake').css('left', piece.x)
  $('#snake').css('top', piece.y)
}
  function updateHeadPosition(piece) { 
      piece.head.x += piece.head.speedX; 
      piece.head.y += piece.head.speedY;
     }
     function updateSnake(arr) {
      if (arr.direction === 'left') {
        arr.speedX = -20;
        arr.speedY = 0;
      } else if (arr.direction === 'right') {
        arr.speedX = 20;
        arr.speedY = 0;
      } else if (arr.direction === 'up') {
        arr.speedY = -20;
        arr.speedX = 0;
      } else if (arr.direction === 'down') {
        arr.speedY = 20
        arr.speedX = 0;
      }
     }
     function checkPosition() {
       if (snake.head.x < -1 || snake.head.y > 421 || snake.head.x > 421 || snake.head.y < -1) {
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
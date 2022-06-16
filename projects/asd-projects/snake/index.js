/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var count = 0;
  var snake = [
     {
      name: 'head',
      id: "#head",
      x: 220,
      y: 220,
      speedX: 0,
      speedY: 0,
      direction: ''
    },
  ];
  var appleN = {}
  var board = {
    width: 420,
    height: 420,
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
    moveBody();
    drawSnake(snake);
    appleCollision();
    updateApple();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT && snake[0].direction !== "right") {
      snake[0].direction = "left";
    } else if (event.which === KEY.RIGHT && snake[0].direction !== "left") {
      snake[0].direction = "right";
    } else if (event.which === KEY.UP && snake[0].direction !== "down") {
      snake[0].direction = "up";
    } else if (event.which === KEY.DOWN && snake[0].direction !== "up") {
      snake[0].direction = "down";
    };
    console.log(snake[0].direction)
  }
  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function addPiece(){
    var nextId = "body" + snake.length;
    createElement(nextId);
    var newObject = factory('#' + nextId);
    snake.push(newObject);
    addCSS('#' + nextId);
  }
  function addCSS(id) {
    var newX = snake[0].x;
    var newY = snake[0].y;
    if (snake[0].direction === 'left') {
      newX = snake[0].x - 20;
    } else if (snake[0].direction === 'right') {
      newX = snake[0].x + 20;
    } else if (snake[0].direction === 'up') {
      newY = snake[0].y - 20;
    } else {
      newY = snake[0].y + 20;
    }
    snake[count].x = newX;
    snake[count].y = newY;
    $(id).css('left', newX);
    $(id).css('top', newY)
  }
  function factory(id) {
    return {id: id};
  }
  function createElement(id) {
    $('<div>').attr('id', id)
              .addClass('body')
              .appendTo('#board');
  }
  function drawSnake(piece) {
    checkPosition();
    updateSnake(piece);
    updateHeadPosition(piece);
    $('#snake').css('left', piece[0].x)
    $('#snake').css('top', piece[0].y)
  }
  function updateApple() {
    appleN.x = parseFloat($('#apple').css('left'))
    appleN.y = parseFloat($('#apple').css('top'))
  }
  function drawApple() {
    var tempX = Math.floor(Math.random() * 21) * 20;
    var tempY = Math.floor(Math.random() * 21) * 20;
    checkAppleCollision(tempX, tempY);
    $('#apple').css('left', tempX);
    $('#apple').css('top', tempY);
    }
    function checkAppleCollision(x,y) {
      for (i = 0; i < snake.length; i++) {
        var checkX = snake[i].x;
        var checkY = snake[i].y;
        if (checkX === x && checkY === y) {
          drawApple();
        }
    }
  }
  function moveBody(snake) {
    for (i = snake.length - 1; i < 1; i--) {
      snake[i + 1].x = snake[i].x;
      snake[i + 1].y = snake[i].y;
    }
  }
  function updateHeadPosition(jb) {
    jb[0].x += jb[0].speedX;
    jb[0].y += jb[0].speedY;
  }
  function appleCollision() {
    if (appleN.x === snake[0].x && appleN.y === snake[0].y) {
      drawApple();
      console.log(appleN);
      count++;
      addPiece();
    }
  }
  function updateSnake(arr) {
    if (arr[0].direction === 'left') {
      arr[0].speedX = -20;
      arr[0].speedY = 0;
    } else if (arr[0].direction === 'right') {
      arr[0].speedX = 20;
      arr[0].speedY = 0;
    } else if (arr[0].direction === 'up') {
      arr[0].speedY = -20;
      arr[0].speedX = 0;
    } else if (arr[0].direction === 'down') {
      arr[0].speedY = 20
      arr[0].speedX = 0;
    }
  }
  function checkPosition() {
    if (snake[0].x < 0) {
      endGame();
    } else if (snake[0].y > board.height) {
      endGame();
    } else if (snake[0].x > board.width) {
      endGame();
    } else if (snake[0].y < 0) {
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

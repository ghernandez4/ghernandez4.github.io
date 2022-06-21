/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // Game Item Objects
  var board = grabCSS('#board');
  var ball = grabCSS('#ball');
  var paddle1 = grabCSS('#paddleleft');
  var paddle2 = grabCSS('#paddleright');
  var score1 = 0;
  var score2 = 0;

  //define magic numbers into easier to read variables
  var KEY = {
    W: 87,
    S: 83
  }

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                             // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  //starts ball when game begins
  startBall();
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    moveObject(ball);
    ballAndWall(ball);
    moveObject(paddle1);
    moveObject(paddle2);
    paddleCollide(paddle1, ball);
    paddleCollide(paddle2, ball);
    player2();
    wallPaddle(paddle1);
    wallPaddle(paddle2);
    checkScore();
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.W) {
      paddle1.speedY = -10;
    } else if (event.which === KEY.S) {
      paddle1.speedY = 10;
    }
  }
  function handleKeyUp(event) {
    if (event.which === KEY.W || event.which === KEY.S) {
      paddle1.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  //grabs CSS values for game items
  function grabCSS(id) {
    let tempArr = {};
    tempArr.id = id;
    tempArr.width = $(id).width();
    tempArr.height = $(id).height();
    tempArr.x = parseFloat($(id).css('left'));
    tempArr.y = parseFloat($(id).css('top'));
    tempArr.speedX = 0;
    tempArr.speedY = 0;
    return tempArr;
  }
  function moveObject(parm) {
    parm.x += parm.speedX;
    parm.y += parm.speedY;
    $(parm.id).css('top', parm.y);
    $(parm.id).css('left', parm.x);
    if (ball.x <= 0) {
      didScore2();
    } else if (ball.x >= board.width + board.x) {
      didScore1();
    }
  }
  function didScore1() {
    startBall();
    score2 += 1;
    $('#score2').text(score2);
  }
  function didScore2() {
    startBall();
    score1 += 1;
    $('#score1').text(score1);
  }

  function player2() {
    if (paddle2.y < ball.y) {
      paddle2.speedY = 6;
    } else if (paddle2.y > ball.y) {
      paddle2.speedY = -6;
    }
  }
  function startBall() {
    ball.x = 150;
    ball.y = 150;
    var randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedX = randomNum;
    ball.speedY = 10;
  }
  function checkScore() {
    if (score1 === 10 || score2 === 10) {
      endGame();
      alert('Game Ended');
      document.location.reload();
    }
    if (score1 === 6 && score2 === 9) {
      alert('(225)242-9963')
    }
  }
  ///////////////////////////////////////////////////////////////////////////////
  //////////////////////////Collision functions//////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  //detects if the paddle collides with an item
  function paddleCollide(a, b) {
    //define paddle sides
    a.left = a.x;
    a.top = a.y;
    a.right = a.x + a.width;
    a.bottom = a.y + a.height;
    //define ball sides
    b.left = b.x
    b.top = b.y
    b.right = b.x + b.width;
    b.bottom = b.y + b.height;
    //check if ball and paddle collide
    if ((a.right > b.left) && (a.left < b.right) && (a.bottom > b.top) && (a.top < b.bottom)) {
      //if true, reverse the speed of the object
      b.speedX *= -1;
    } else {
      return false;
    }
  }
  //detects if an item collides with the wall
  function ballAndWall(obj) {
    board.left = 0;
    board.top = 0;
    board.right = board.width;
    board.bottom = board.height;

    obj.left = obj.x;
    obj.top = obj.y;
    obj.right = obj.x + obj.width;
    obj.bottom = obj.y + obj.height;

    if ((board.bottom < obj.bottom) || (board.top > obj.top)) {
      //reverses speed and redraws item if true
      obj.speedY *= -1;
      obj.y = board.bottom < obj.bottom ? board.bottom - obj.height : board.top;
      $(obj.id).css('top', obj.y);
    }
  }

  //detects if the paddle hits the top of the bottom of the wall
  function wallPaddle(paddle) {
    paddle.top = paddle.y;
    paddle.bottom = paddle.y + paddle.height;
    board.top = 0;
    board.bottom = board.height;
    if (paddle.bottom > board.bottom && paddle.top > board.top) {
      paddle.y = board.bottom - paddle.height - 1;
    } else if (paddle.top < board.top && paddle.bottom < board.bottom) {
      paddle.y = 1;
    }
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}

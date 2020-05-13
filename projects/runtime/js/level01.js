var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY -50 },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 800, "y": groundY - 20},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
function createSawBlade(x,y){
    var hitZoneSize = 25;
    var damageFromObstacle = 20;
    var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
    sawBladeHitZone.x = x;
    sawBladeHitZone.y = y;
    game.addGameItem(sawBladeHitZone); 
    var obstacleImage = draw.bitmap('img/sawblade.png');
    sawBladeHitZone.addChild(obstacleImage);
    obstacleImage.x = -25;
    obstacleImage.y = -25;
}    

 for (var i = 0; i < levelData.gameItems.length; i++) {
    var eachElement = levelData.gameItems[i];
    createSawBlade(firstX, firstY);
    var firstX = eachElement.x;
    var firstY = eachElement.y;
 }
 function createEnemy(x,y) {
     var enemy =  game.createGameItem('enemy',25);
    var redSquare = draw.rect(50,50,'red');
    redSquare.x = -25;
    redSquare.y = -25;
    enemy.addChild(redSquare);
    enemy.x = x;
    enemy.y = y;
    game.addGameItem(enemy);
    enemy.velocityX = -2;
    enemy.rotationalVelocity = 10;
    enemy.onPlayerCollision = function() {
    game.changeIntegrity(-50);
    };
 enemy.onProjectileCollision = function() {
        game.increaseScore(1000);
        enemy.fadeOut();
    };
     
 }
 function createBlackHole(x, y){
            var hitZoneSize = 20;
            var damageFromObstacle = 30;
            var blackHole = game.createObstacle(hitZoneSize,damageFromObstacle);

            blackHole.x = x;
            blackHole.y = y;
    
            game.addGameItem(blackHole);    

            var obstacleImage = draw.circle(20, 'black', 'pink');
            blackHole.addChild(obstacleImage);
            blackHole.onPlayerCollision = function() {
                game.changeIntegrity(-20);
            };
        }
      createEnemy(800,groundY - 50); 
      createBlackHole(1200,groundY - 100);
function createReward(x,y) {
    var reward =  game.createGameItem('reward',16);
    var blueSquare = draw.rect(50,50,'blue');
    blueSquare.x = -25;
    blueSquare.y = -25;
    reward.addChild(blueSquare);
    reward.x = x;
    reward.y = y;
    game.addGameItem(reward);
    reward.velocityX = -2;
    reward.onPlayerCollision = function() {
        game.changeIntegrity(30);
        game.increaseScore(1000);
        reward.fadeOut();
        };
    }
createReward(1400,groundY-150);
};

       // DO NOT EDIT CODE BELOW HERE
  
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}

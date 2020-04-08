var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        var tree;
        var buildings = [];
        
        // Add any variables that will be used by render AND update here:
        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            background.removeAllChildren();

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,ground.y,'midnightblue');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var star;
            for (var i = 0; i < 128; i++){
                star = draw.rect(2, 2, 'white', 'blue');
                star.x = Math.random()*canvasWidth;
                star.y = Math.random()*(ground.y-2);
                background.addChild(star);
            }
            
            var moon = draw.bitmap('img/moon.png');
            moon.x = 50;
            moon.y = 25;
            moon.scaleX = 0.25;
            moon.scaleY = 0.25;
            background.addChild(moon);
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            var buildingHeight = 200;
            var building;
            var buildingScale;
            for(var i=0;i<5;++i) {
                buildingScale = Math.random()+0.1;
                building = draw.rect(75, buildingHeight * buildingScale,'#'+(Math.random()*0xffffff).toString(16).slice(-6),'Black',1);
                building.x = 200*i;
                building.y = groundY-buildingHeight*buildingScale;
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/tree.png');
            tree.x = 200;
            tree.y = ground.y - 240;
            background.addChild(tree);
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x--;
            if(tree.x < -256) {
                tree.x += canvasWidth+256;
            }
            
            // TODO 5: Part 2 - Parallax
            var building;
            for (var i = 0; i < buildings.length; i++){
                building = buildings[i];
                building.x -= 0.5;
                if(building.x < -75){
                    building.x += canvasWidth + 75;
                }
            }

        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}

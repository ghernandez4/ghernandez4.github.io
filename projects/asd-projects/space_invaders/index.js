    import Player from "./player.js";
    import BulletController from "./BulletController.js";
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 550;
    canvas.height = 600;
    
    const bulletController = new BulletController(canvas);
    const player = new Player(canvas.width / 2.2, canvas.height / 1.3,bulletController);
    
    function gameLoop() {
      setCommonStyle();
      ctx.fillStyle = 'black';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      bulletController.draw(ctx);
      player.draw(ctx);
    
    }
    function setCommonStyle() {
      ctx.shadowColor = '#d53';
      ctx.shadowBlur = 20;
      ctx.lineJoin = 'bevel';
      ctx.lineWidth = 5;
    }
    setInterval(gameLoop, 1000/60)
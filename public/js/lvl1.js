(function(){
  game.state.add('lvl1', {create:create, update:update});

  var score, txtScore, timer, time, txtTime, platforms, dude, diamonds, stars, emitter, jump, transform, dead;

  function create(){
    score = 0, time = 30;

    jump = game.add.audio('jump');
    transform = game.add.audio('transform');
    dead = game.add.audio('dead');

    game.add.tileSprite(0, 0, 800, 600, 'bg');
    txtScore = game.add.text(20, 20, "0",   { font: "30px Arial", fill: "#ffffff" });
    txtTime  = game.add.text(740, 20, time, { font: "30px Arial", fill: "#ffffff" });
    timer = game.time.events.loop(1000, subtractTime);

    platforms = game.add.group();
    platforms.enableBody = true;
    platforms.physicsBodyType = Phaser.Physics.ARCADE;
    platforms.add(game.add.tileSprite(0, game.world.height-20, 800, 20, 'floor'));
    platforms.add(game.add.tileSprite(400,  80, 200, 20, 'floor'));
    platforms.add(game.add.tileSprite(0,  160, 300, 20, 'floor'));
    platforms.add(game.add.tileSprite(400, 240, 400, 20, 'floor'));
    platforms.add(game.add.tileSprite(0,  350, 500, 20, 'floor'));
    platforms.add(game.add.tileSprite(60, 470, 600, 20, 'floor'));
    platforms.setAll('body.immovable', true);

    dude = game.add.sprite(game.world.centerX, game.world.height - (20 + 48), 'dude');
    dude.animations.add('left', [0, 1, 2, 3], 10, true);
    dude.animations.add('right', [5, 6, 7, 8], 10, true);
    game.physics.arcade.enable(dude);
    dude.body.gravity.y = 500;
    dude.body.bounce.y = 0.3;
    dude.body.collideWorldBounds = true;

    diamonds = game.add.group();
    diamonds.enableBody = true;
    diamonds.physicsBodyType = Phaser.Physics.ARCADE;

    for(var i = 0; i < 10; i++){
      var diamond = game.add.sprite(game.world.randomX, game.world.randomY - (20 + 28), 'diamond');
      diamonds.add(diamond);
    }

    diamonds.setAll('body.gravity.y', 100);
    diamonds.setAll('body.bounce.y', 1);
    diamonds.setAll('body.collideWorldBounds', true);

    stars = game.add.group();
    stars.enableBody = true;
    stars.physicsBodyType = Phaser.Physics.ARCADE;
    stars.createMultiple(10, 'star');
    stars.setAll('body.gravity.y', 200);
    stars.setAll('body.bounce.y', 1);
    stars.setAll('body.collideWorldBounds', true);

    emitter = game.add.emitter(0, 0, 100);
    emitter.makeParticles('balls', [0, 1, 2, 3, 4, 5]);
    emitter.gravity = 200;

    cursors = game.input.keyboard.createCursorKeys();
  }

  function update(){
    game.physics.arcade.collide(dude, platforms);
    game.physics.arcade.collide(diamonds, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(diamonds, diamonds);
    game.physics.arcade.collide(stars, stars);
    game.physics.arcade.overlap(dude, diamonds, collectDiamond);
    game.physics.arcade.overlap(dude, stars, collectStar);

    if(cursors.left.isDown){
      dude.body.velocity.x = -150;
      dude.animations.play('left');
    }
    else if(cursors.right.isDown){
      dude.body.velocity.x = 150;
      dude.animations.play('right');
    }else{
      dude.body.velocity.x = 0;
      dude.animations.stop();
      dude.frame = 4;
    }

    if(cursors.up.isDown && dude.body.touching.down){
      dude.body.velocity.y = -350;
      jump.play();
    }
  }

  function subtractTime(){
    time--;
    txtTime.text = time;
    if(!time){
      game.state.restart();
    }

    randomizePositions();
  }

  function randomizePositions(){
    diamonds.forEachAlive(function(d){
      d.body.velocity.x = Phaser.Math.randomSign() * 25;
    });

    stars.forEachAlive(function(s){
      s.body.velocity.x = Phaser.Math.randomSign() * 150;
      s.body.velocity.y = -1 * Phaser.Math.getRandom([100, 200, 300, 400]);
    });
  }

  function collectDiamond(player, diamond){
    diamond.kill();
    score += 20;
    txtScore.text = score;

    emitter.x = game.world.randomX;
    emitter.y =  game.world.randomY - (20 + 22);
    emitter.start(true, 2000, null, 10);

    transform.play();

    var star = stars.getFirstDead();
    star.reset(emitter.x, emitter.y);
  }

  function collectStar(player, star){
    star.kill();
    score += 40;
    txtScore.text = score;

    dead.play();
  }
})();

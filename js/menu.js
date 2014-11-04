(function(){
  game.state.add('menu', {preload:preload, create:create});

  function preload(){
    game.load.image('bg', 'assets/background.png');
    game.load.image('floor', 'assets/floor.png');
    game.load.image('diamond', 'assets/diamond.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('balls', 'assets/balls.png', 17, 17);
    game.load.audio('jump', 'assets/jump.mp3');
    game.load.audio('transform', 'assets/coin.mp3');
    game.load.audio('dead', 'assets/dead.mp3');
  }

  function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.tileSprite(0, 0, 800, 600, 'bg');

    var text = game.add.text(game.world.centerX, game.world.centerY, 'RoundUp\nPress SPACE to Begin');
    text.anchor.setTo(0.5);

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(start);
  }

  function start(){
    game.state.start('lvl1');
  }
})();

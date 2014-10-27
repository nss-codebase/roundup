(function(){
  game.state.add('lvl1', {preload:preload, create:create, update:update});

  function preload(){
  }

  function create(){
    game.add.tileSprite(0, 0, 800, 600, 'bg');
  }

  function update(){
  }
})();

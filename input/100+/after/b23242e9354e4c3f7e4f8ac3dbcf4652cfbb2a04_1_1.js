function start() {
  game.errorTile = new TileType({code: '_',sprite: new Sprite({ imageURL: '404' })});

  baseTileSet = new TileSet();
  baseTileSet.add({code: 'g',sprite: new Sprite({imageURL: 'tiles/grass'}),clipto: [true,true,true,true]});
  baseTileSet.add({code: 'd',sprite: new Sprite({imageURL: 'tiles/dirttograss',x: 17,y: 51})});

  tileTransitionSet(baseTileSet,'dg','tiles/dirttograss');
  tileTransitionSet(baseTileSet,'hg','tiles/hilltograss');

  baseTileSet.add({code: 'gfr',sprite: new Animation(
    [new Sprite({imageURL: 'tiles/redflower', x: 0, y: 0, duration: 700}),
    new Sprite({imageURL: 'tiles/redflower', x: 17, y: 0, duration: 700}),
    new Sprite({imageURL: 'tiles/redflower', x: 0, y: 0, duration: 700}),
    new Sprite({imageURL: 'tiles/redflower', x: 34, y: 0, duration: 700}),],
    {loop: true, paused: false})
  });

  game.editortile = 'd';


  for(var code in baseTileSet.tiles) {
    var tile = baseTileSet.tiles[code];
    game.menus.side.write('<a href="#" onclick="game.editortile=\''+code+'\'">'+code+'</a>');
  }


  mapone = new Map(14,12);
  game.currentMap = mapone;

  testEnt = new EntityLiving({ name: 'testEnt', x: 5, y: 5, sprites: characterSheet('characters/kantopokemon',780,1032)});
  gengar = new EntityLiving({ name: 'gengar', x: 5, y: 4, sprites: characterSheet('characters/kantopokemon',325,774)});
  game.viewport.tracking = testEnt;

  game.on_tick.subscribe(function(){
    game.keyboard.poll();
  },false,false);
  game.drawFrame();
  game.tick();
  setInterval(function() {
    game.menus.main.box.innerHTML = (Object.keys(game.entities).length+' entities<br>');
    game.menus.main.box.innerHTML += (game.visible_entities+' visible<br>');
    game.menus.main.box.innerHTML += (game.framesThisSecond+' fps<br>');
    game.menus.main.box.innerHTML += (game.ticksThisSecond+' tps');
    game.framesThisSecond = 0;
    game.ticksThisSecond = 0;
  },1000);
}
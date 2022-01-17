function(list) {
      for (var i in list ){
        var deadPlayer = world.createEntity({
          name: 'dead-player-' + i,
          type: 'static',
          x: list[i].attr.coords.x,
          y:  list[i].attr.coords.y,
          width: 2.4,
          height: 1,
          imageOffsetX: -.7,
          imageOffsetY: -.8,
          restitution: 0,
          spriteSheet:true,
          image: 'img/player.png',
          spriteWidth: 96,
          spriteHeight: 96
        });
        deadPlayer.sprite(4, 2)
      }
      kickoff();
    }
function( x, y ) {
      player.destroy();
      var deadPlayer = world.createEntity({
        name: 'deadPlayer',
        type: 'static',
        color: 'black',
        x: this.position().x,
        y: this.position().y,
        width: 2,
        height: 2,
        fixedRotation: true,
        friction: 12,
        density: 1,
        restitution: 0,
        spriteSheet:true,
        image: 'img/player.png',
        spriteWidth: 96,
        spriteHeight: 96,
        spriteX: 0,
        spriteY: 0
      });
    
      for(var i = 1; i < 5; i++){
        deadPlayer.sprite(i, 2);
      }

      var coords = {
        x: this.position().x,
        y: this.position().y
      }

      var entity = new Kinvey.Entity({
          coords: coords
      }, 'dead-bodies');
    
      entity.save({
        success: function(response) {
          console.log(response)
        },
        error: function(error) {
          console.log(error)
        }
      });

      player.killed = true;
    }
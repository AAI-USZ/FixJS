function(){
      
      var playerPos = player.position();
      var playerLastPos = player.lastPos;

      if( playerPos.y < 0.4 ) {
        if( playerPos.y < playerLastPos.y ) {
          world.camera({x: 0, y: playerPos.y - 7 });
        }
      }

      frameCounter++;
      if( frameCounter > 6 ) {
        frameCounter = 0;
      }
      if( inputState.left ) {
        if(!this.contact){
          player.sprite( 1, 0 );
        } else {
          player.sprite( frameCounter, 0 );
        }
      }
      if( inputState.right ) {
        if(!this.contact){
          player.sprite( 1, 1 );
        } else {
          player.sprite( frameCounter, 1);
        }
      }
      // kill the player if they fall off the screen
      if(world.canvasPositionAt(player.position().x, player.position().y).y > 610) {
        if( player.killed !==true) {
          player.kill();
        }
      }
      player.lastPos = this.position();
    }
function(ctx) {
    var p = player.position();
    var c = this.camera();
    if( p.y < 0.4 ) {
      if( p.y < lastPos) {
        this.camera({x: 0, y: p.y - 7 });
      }
    }
    lastPos = p.y;
    
    // kill the player if they fall off the screen
    if(world.canvasPositionAt(player.position().x, player.position().y).y > 610) {
      player.kill();
    }
  }
function( e ){
    
    // Right
    if (e.keyCode === 39) {
      this.setForce('movement', force, 90);
      inputState.right = true;
      player.lastDirection = 'right';
    }

    // Left
    if (e.keyCode === 37) {
      this.setForce('movement', force, 270);
      inputState.left = true;
      player.lastDirection = 'left';
    }
      
    // Jump
    if( this.contact && this.jumps < 2 ) {

      if (e.keyCode === 32 || 38) {
        this.jumps++;
        this.applyImpulse( 50 );
        inputState.up = true;
      }
    }
  }
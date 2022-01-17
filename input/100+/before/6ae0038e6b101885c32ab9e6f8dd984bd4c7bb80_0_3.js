function( e ){
    player.clearForce( 'movement' );
    if( player.lastDirection === 'right' ){
      player.sprite( 0, 1 );
    } else {
      player.sprite( 0, 0 );
    }

    // Right
    if (e.keyCode === 39) {
      inputState.right = false;
    }

    // Left
    if (e.keyCode === 37) {
      inputState.left = false;
    }
    
    // Jump
    if (e.keyCode === 32 || 38) {
      inputState.up = false;
    }
  }
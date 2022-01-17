function(){
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
  }
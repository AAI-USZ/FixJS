function( e ){
      if( e.wheelDeltaY ){
        tracksContainer.element.scrollTop -= e.wheelDeltaY;
        e.preventDefault();
      }
    }
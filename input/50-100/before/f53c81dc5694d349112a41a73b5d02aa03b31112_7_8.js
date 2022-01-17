function imgLoaded( event ) {
      if ( --len <= 0 && event.target.src !== blank ){
        setTimeout( triggerCallback );
        $images.unbind( 'load error', imgLoaded );
      }
    }
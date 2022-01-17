function(){
        return ( _popcorn && /* Make sure _popcorn still exists (e.g., destory() hasn't been called) */
                 ( _popcorn.media.readyState >= 1 &&
                   _popcorn.duration() > 0
                 )
               );
      }
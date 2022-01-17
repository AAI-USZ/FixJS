function onSeeked() {
      elPopcorn.currentTime( popcorn.currentTime() - slideOptions.start );

      if ( wasPlaying ) {
        elPopcorn.play();
      }
    }
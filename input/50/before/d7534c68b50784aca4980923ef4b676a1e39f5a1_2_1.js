function( butter ) {
        var trackOne = butter.currentMedia.tracks[ 0 ];
            trackTwo = butter.currentMedia.getTrackById( trackOne.id );

        equal( trackOne.id, trackTwo.id, "getTrackById returned expected track event" );
        start();
      }
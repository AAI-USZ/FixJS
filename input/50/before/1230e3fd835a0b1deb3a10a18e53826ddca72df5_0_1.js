function() {

          if ( !media.paused ) {

            currentTime = youtubeObject.getCurrentTime();
            media.dispatchEvent( "timeupdate" );
            setTimeout( timeupdate, 10 );
          }
        }
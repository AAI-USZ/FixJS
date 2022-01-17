function() {

          if ( !media.paused ) {

            currentTime = media.youtubeObject.getCurrentTime();
            media.dispatchEvent( "timeupdate" );
            setTimeout( timeupdate, 10 );
          }
        }
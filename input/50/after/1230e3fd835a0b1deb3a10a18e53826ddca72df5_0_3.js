function() {

          if ( !media.paused ) {

            media.paused = true;
            media.dispatchEvent( "pause" );
            media.youtubeObject.pauseVideo();
          }
        }
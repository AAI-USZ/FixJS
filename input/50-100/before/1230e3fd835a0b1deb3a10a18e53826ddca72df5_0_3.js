function( val ) {

            if ( youtubeObject.isMuted() !== val ) {

              if ( val ) {

                youtubeObject.mute();
              } else {

                youtubeObject.unMute();
              }

              lastMuted = youtubeObject.isMuted();
              media.dispatchEvent( "volumechange" );
            }

            return youtubeObject.isMuted();
          }
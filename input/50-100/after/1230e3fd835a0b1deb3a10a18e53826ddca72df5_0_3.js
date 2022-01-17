function( val ) {

            if ( media.youtubeObject.isMuted() !== val ) {

              if ( val ) {

                media.youtubeObject.mute();
              } else {

                media.youtubeObject.unMute();
              }

              lastMuted = media.youtubeObject.isMuted();
              media.dispatchEvent( "volumechange" );
            }

            return media.youtubeObject.isMuted();
          }
function( val ) {

            if ( media.youtubeObject.getVolume() / 100 !== val ) {

              media.youtubeObject.setVolume( val * 100 );
              lastVolume = media.youtubeObject.getVolume();
              media.dispatchEvent( "volumechange" );
            }

            return media.youtubeObject.getVolume() / 100;
          }
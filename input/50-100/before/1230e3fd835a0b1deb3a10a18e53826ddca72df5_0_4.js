function( val ) {

            if ( youtubeObject.getVolume() / 100 !== val ) {

              youtubeObject.setVolume( val * 100 );
              lastVolume = youtubeObject.getVolume();
              media.dispatchEvent( "volumechange" );
            }

            return youtubeObject.getVolume() / 100;
          }
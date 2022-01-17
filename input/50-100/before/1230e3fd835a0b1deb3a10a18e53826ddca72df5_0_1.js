function() {
	
          if ( lastMuted !== youtubeObject.isMuted() ) {

            lastMuted = youtubeObject.isMuted();
            media.dispatchEvent( "volumechange" );
          }

          if ( lastVolume !== youtubeObject.getVolume() ) {

            lastVolume = youtubeObject.getVolume();
            media.dispatchEvent( "volumechange" );
          }

          setTimeout( volumeupdate, 250 );
          
          
        }
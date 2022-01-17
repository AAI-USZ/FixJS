function() {
	
          if ( lastMuted !== media.youtubeObject.isMuted() ) {

            lastMuted = media.youtubeObject.isMuted();
            media.dispatchEvent( "volumechange" );
          }

          if ( lastVolume !== media.youtubeObject.getVolume() ) {

            lastVolume = media.youtubeObject.getVolume();
            media.dispatchEvent( "volumechange" );
          }

          setTimeout( volumeupdate, 250 );
          
          
        }
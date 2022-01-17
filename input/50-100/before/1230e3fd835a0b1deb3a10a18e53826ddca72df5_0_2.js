function( val ) {
			if(val!=0||options.cue_in==0){
            // make sure val is a number
            currentTime = seekTime = +val;
            seeking = true;
            media.dispatchEvent( "seeked" );
            media.dispatchEvent( "timeupdate" );
            youtubeObject.seekTo( currentTime );
            }
            else if(val==0&&options.cue_in==0){
            	 media.dispatchEvent( "timeupdate" );
            }
            return currentTime;
          }
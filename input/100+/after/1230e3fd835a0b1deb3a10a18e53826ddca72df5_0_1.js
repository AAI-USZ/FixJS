function( state ) {
	
		 console.log('onstatechange: '+state+' : '+media.youtubeId+' and canplay '+media.canPlay);
          // playing is state 1
          // paused is state 2
          
          
          if ( state === 1&&media.canPlay==0) {
          	
          	media.canPlay=1;
          	media.pause();
          	media.readyState = 4;
          	media.duration = media.youtubeObject.getDuration();
			media.dispatchEvent( "canplaythrough" );
			media.dispatchEvent( "load" );
			
			media.dispatchEvent( "durationchange" );
			volumeupdate();
	
			media.dispatchEvent( "loadeddata" );
          
          } else if(state===1){
		
            media.paused && media.play();
          // youtube fires paused events while seeking
          // this is the only way to get seeking events
          } else if ( state === 2 ) {

            // silly logic forced on me by the youtube API
            // calling youtube.seekTo triggers multiple events
            // with the second events getCurrentTime being the old time
            if ( seeking && seekTime === currentTime && Math.abs(parseFloat(seekTime) - parseFloat(media.youtubeObject.getCurrentTime()))>2 ) {

              	media.youtubeObject.seekTo( currentTime );
              
              return;
            }
            else if(seeking && seekTime === currentTime && Math.abs(parseFloat(seekTime) - parseFloat(media.youtubeObject.getCurrentTime()))<2 ) {
   
            	seeking=false;
            	delay=true;	
            	currentTime = media.youtubeObject.getCurrentTime();
				media.dispatchEvent( "timeupdate" );
				!media.paused && media.pause();
				return
            }
            
            if(delay){
            	delay=false;
            	return;
            	}
            else{

				currentTime = media.youtubeObject.getCurrentTime();
				media.dispatchEvent( "timeupdate" );
				!media.paused && media.pause();
            }
				
          }
        }
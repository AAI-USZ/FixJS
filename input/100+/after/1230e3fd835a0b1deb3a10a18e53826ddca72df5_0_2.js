function() {
		
        media.youtubeObject = document.getElementById( container.id );

        // more youtube callback nonsense
       stateChangeEventHandler[media.youtubeId] = function( state ) {
	
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
        };

        stateChangeEventHandler[Popcorn.guid()] = function( errorCode ) {
          if ( [ 2, 100, 101, 150 ].indexOf( errorCode ) !== -1 ) {
            media.dispatchEvent( "error" );
          }
        };

        // youtube requires callbacks to be a string to a function path from the global scope
        media.youtubeObject.addEventListener( "onStateChange", "stateChangeEventHandler["+ media.youtubeId+"]" );

        media.youtubeObject.addEventListener( "onError", "onErrorEventHandler[" + media.youtubeId+']');

        var timeupdate = function() {

          if ( !media.paused ) {

            currentTime = media.youtubeObject.getCurrentTime();
            media.dispatchEvent( "timeupdate" );
            setTimeout( timeupdate, 10 );
          }
        };

        var volumeupdate = function() {
	
          if ( lastMuted !== media.youtubeObject.isMuted() ) {

            lastMuted = media.youtubeObject.isMuted();
            media.dispatchEvent( "volumechange" );
          }

          if ( lastVolume !== media.youtubeObject.getVolume() ) {

            lastVolume = media.youtubeObject.getVolume();
            media.dispatchEvent( "volumechange" );
          }

          setTimeout( volumeupdate, 250 );
          
          
        };

        media.play = function() {

          media.paused = false;
          media.dispatchEvent( "play" );

          media.dispatchEvent( "playing" );
          timeupdate();
          media.youtubeObject.playVideo();
        };

        media.pause = function() {

          if ( !media.paused ) {

            media.paused = true;
            media.dispatchEvent( "pause" );
            media.youtubeObject.pauseVideo();
          }
        };

        Popcorn.player.defineProperty( media, "currentTime", {
          set: function( val ) {
			if(val!=0||options.cue_in==0){
            // make sure val is a number
            currentTime = seekTime = +val;
            seeking = true;
            media.dispatchEvent( "seeked" );
            media.dispatchEvent( "timeupdate" );
            media.youtubeObject.seekTo( currentTime );
            }
            else if(val==0&&options.cue_in==0){
            	 media.dispatchEvent( "timeupdate" );
            }
            return currentTime;
          },
          get: function() {

            return currentTime;
          }
        });

        Popcorn.player.defineProperty( media, "muted", {
          set: function( val ) {

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
          },
          get: function() {

            return media.youtubeObject.isMuted();
          }
        });

        Popcorn.player.defineProperty( media, "volume", {
          set: function( val ) {

            if ( media.youtubeObject.getVolume() / 100 !== val ) {

              media.youtubeObject.setVolume( val * 100 );
              lastVolume = media.youtubeObject.getVolume();
              media.dispatchEvent( "volumechange" );
            }

            return media.youtubeObject.getVolume() / 100;
          },
          get: function() {

            return media.youtubeObject.getVolume() / 100;
          }
        });
		
		media.youtubeObject.loadVideoById(src,options.cue_in);
        
      }
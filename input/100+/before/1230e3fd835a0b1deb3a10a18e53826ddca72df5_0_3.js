function( options ) {

    var media = this,
        youtubeObject,
        container = document.createElement( "div" ),
        currentTime = 0,
        seekTime = 0,
        seeking = false,
        delay =false,

        // state code for volume changed polling
        volumeChanged = false,
        lastMuted = false,
        lastVolume = 100;

    container.id = media.id + Popcorn.guid();
	youtubeId = Popcorn.guid();
	
    media.appendChild( container );

    var youtubeInit = function() {

      var flashvars,
          params,
          attributes,
          src,
          width,
          height,
          query;
          canPlay=0;
		
      // expose a callback to this scope, that is called from the global callback youtube calls
      onYouTubePlayerReady[ container.id ] = function() {
		
        youtubeObject = document.getElementById( container.id );

        // more youtube callback nonsense
       stateChangeEventHandler[youtubeId] = function( state ) {
	
          // playing is state 1
          // paused is state 2
          if ( state === 1&&canPlay==0) {
          	
          	canPlay=1;
          	media.pause();
          	media.readyState = 4;
          	media.duration = youtubeObject.getDuration();
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
            if ( seeking && seekTime === currentTime && Math.abs(parseFloat(seekTime) - parseFloat(youtubeObject.getCurrentTime()))>2 ) {

              	youtubeObject.seekTo( currentTime );
              
              return;
            }
            else if(seeking && seekTime === currentTime && Math.abs(parseFloat(seekTime) - parseFloat(youtubeObject.getCurrentTime()))<2 ) {
   
            	seeking=false;
            	delay=true;	
            	currentTime = youtubeObject.getCurrentTime();
				media.dispatchEvent( "timeupdate" );
				!media.paused && media.pause();
				return
            }
            
            if(delay){
            	delay=false;
            	return;
            	}
            else{

				currentTime = youtubeObject.getCurrentTime();
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
        youtubeObject.addEventListener( "onStateChange", "stateChangeEventHandler["+ youtubeId+"]" );

        youtubeObject.addEventListener( "onError", "onErrorEventHandler[" + youtubeId+']');

        var timeupdate = function() {

          if ( !media.paused ) {

            currentTime = youtubeObject.getCurrentTime();
            media.dispatchEvent( "timeupdate" );
            setTimeout( timeupdate, 10 );
          }
        };

        var volumeupdate = function() {
	
          if ( lastMuted !== youtubeObject.isMuted() ) {

            lastMuted = youtubeObject.isMuted();
            media.dispatchEvent( "volumechange" );
          }

          if ( lastVolume !== youtubeObject.getVolume() ) {

            lastVolume = youtubeObject.getVolume();
            media.dispatchEvent( "volumechange" );
          }

          setTimeout( volumeupdate, 250 );
          
          
        };

        media.play = function() {

          media.paused = false;
          media.dispatchEvent( "play" );

          media.dispatchEvent( "playing" );
          timeupdate();
          youtubeObject.playVideo();
        };

        media.pause = function() {

          if ( !media.paused ) {

            media.paused = true;
            media.dispatchEvent( "pause" );
            youtubeObject.pauseVideo();
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
            youtubeObject.seekTo( currentTime );
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
          },
          get: function() {

            return youtubeObject.isMuted();
          }
        });

        Popcorn.player.defineProperty( media, "volume", {
          set: function( val ) {

            if ( youtubeObject.getVolume() / 100 !== val ) {

              youtubeObject.setVolume( val * 100 );
              lastVolume = youtubeObject.getVolume();
              media.dispatchEvent( "volumechange" );
            }

            return youtubeObject.getVolume() / 100;
          },
          get: function() {

            return youtubeObject.getVolume() / 100;
          }
        });
		
		youtubeObject.loadVideoById(src,options.cue_in);
        
      };

      options.controls = +options.controls === 0 || +options.controls === 1 ? options.controls : 1;
      options.annotations = +options.annotations === 1 || +options.annotations === 3 ? options.annotations : 1;
	options.cue_in=options.cue_in||0
     
     flashvars = {
        playerapiid: container.id
      };

      params = {
       	wmode: "opaque", 
       	disablekb: "1" ,
        allowScriptAccess: "always"
      };

      attributes = {
        id: container.id
      };

      src = /^.*(?:\/|v=)(.{11})/.exec( media.src )[ 1 ];
      query = ( media.src.split( "?" )[ 1 ] || "" ).replace( /v=.{11}/, "" );

      // setting youtube player's height and width, default to 560 x 315
      width = media.style.width ? ""+media.offsetWidth : "560";
      height = media.style.height ? ""+media.offsetHeight : "315";
		console.log(youtubeId);
      swfobject.embedSWF("http://www.youtube.com/apiplayer?enablejsapi=1&version=3&key=AI39si7oX_eCGjrxs2lil28MMQdXn-ZWhzku8fGsRVhju-pziYgmI3EOt0o4GmEl00vGXsA_OGGEKwX-xAM0a5Gbsr8zgrGpyg&playerapiid="+container.id, 
				   container.id, '100%', '100%', "8", null, flashvars, params, attributes);
    console.log(container.id);
    	
    
    };

    if ( !window.swfobject ) {

      Popcorn.getScript( "//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js", youtubeInit );
    } else {

      youtubeInit();
    }
  }
function() {

      var src, query, params, playerVars, queryStringItem;

      var timeUpdate = function() {

        if ( options.destroyed ) {
          return;
        }

        if ( !seeking ) {
          currentTime = options.youtubeObject.getCurrentTime();
          media.dispatchEvent( "timeupdate" );
        } else if ( currentTime === options.youtubeObject.getCurrentTime() ) {

          seeking = false;
          media.dispatchEvent( "seeked" );
          media.dispatchEvent( "timeupdate" );
        } else {

          // keep trying the seek until it is right.
          options.youtubeObject.seekTo( currentTime );
        }
        setTimeout( timeUpdate, 250 );
      };

      options.controls = +options.controls === 0 || +options.controls === 1 ? options.controls : 1;
      options.annotations = +options.annotations === 1 || +options.annotations === 3 ? options.annotations : 1;

      src = /^.*(?:\/|v=)(.{11})/.exec( media.src )[ 1 ];

      query = ( media.src.split( "?" )[ 1 ] || "" )
                         .replace( /v=.{11}/, "" );
      query = query.replace( /&t=(?:(\d+)m)?(?:(\d+)s)?/, function( all, minutes, seconds ) {

        // Make sure we have real zeros
        minutes = minutes | 0; // bit-wise OR
        seconds = seconds | 0; // bit-wise OR

        fragmentStart = ( +seconds + ( minutes * 60 ) );
        return "";
      });
      query = query.replace( /&start=(\d+)?/, function( all, seconds ) {

        // Make sure we have real zeros
        seconds = seconds | 0; // bit-wise OR

        fragmentStart = seconds;
        return "";
      });

      autoPlay = ( /autoplay=1/.test( query ) );

      params = query.split( /[\&\?]/g );
      playerVars = { wmode: "transparent" };

      for( var i = 0; i < params.length; i++ ) {
        queryStringItem = params[ i ].split( "=" );

        playerVars[ queryStringItem[ 0 ] ] = queryStringItem[ 1 ];
      }
      
      options.youtubeObject = new YT.Player( container.id, {
        height: "100%",
        width: "100%",
        wmode: "transparent",
        playerVars: playerVars,
        videoId: src,
        events: {
          "onReady": function(){

            // pulling initial volume states form baseplayer
            lastVolume = media.volume;
            lastMuted = media.muted;

            media.duration = options.youtubeObject.getDuration();

            media.dispatchEvent( "durationchange" );
            volumeupdate();

            // pulling initial paused state from autoplay or the baseplayer
            // also need to explicitly set to paused otherwise.
            if ( autoPlay || !media.paused ) {
              paused = false;
            }

            createProperties();
            options.youtubeObject.playVideo();

            if ( paused ) {
              options.youtubeObject.pauseVideo();
            }

            media.currentTime = fragmentStart;

            media.dispatchEvent( "loadedmetadata" );
            media.dispatchEvent( "loadeddata" );
            media.readyState = 4;

            timeUpdate();
            media.dispatchEvent( "canplaythrough" );
          },
          "onStateChange": function( state ){

            if ( options.destroyed || state.data === -1 ) {
              return;
            }

            // state.data === 2 is for pause events
            // state.data === 1 is for play events
            if ( state.data === 2 ) {

              paused = true;
              media.dispatchEvent( "pause" );
              playerQueue.next();
            } else if ( state.data === 1 ) {
              paused = false;
              media.dispatchEvent( "play" );
              media.dispatchEvent( "playing" );
              playerQueue.next();
            } else if ( state.data === 0 ) {
              media.dispatchEvent( "ended" );
            }
          },
          "onError": function( error ) {

            if ( [ 2, 100, 101, 150 ].indexOf( error.data ) !== -1 ) {
              media.error = {
                customCode: error.data
              };
              media.dispatchEvent( "error" );
            }
          }
        }
      });

      var volumeupdate = function() {

        if ( options.destroyed ) {

          return;
        }

        if ( lastMuted !== options.youtubeObject.isMuted() ) {

          lastMuted = options.youtubeObject.isMuted();
          media.dispatchEvent( "volumechange" );
        }

        if ( lastVolume !== options.youtubeObject.getVolume() ) {

          lastVolume = options.youtubeObject.getVolume();
          media.dispatchEvent( "volumechange" );
        }

        setTimeout( volumeupdate, 250 );
      };
    }
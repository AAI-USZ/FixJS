function() {
		var _this = this;
		// Don't run onclipdone if _propagateEvents is off
		if( !_this._propagateEvents ){
			return ;
		}
		mw.log( 'EmbedPlayer::onClipDone: propagate:' +  _this._propagateEvents + ' id:' + this.id + ' doneCount:' + this.donePlayingCount + ' stop state:' +this.isStopped() );
		// Only run stopped once:
		if( !this.isStopped() ){
			// set the "stopped" flag:
			this.stopped = true;
			
			// Show the control bar:
			this.controlBuilder.showControlBar();

			// TOOD we should improve the end event flow
			// First end event for ads or current clip ended bindings
			if( ! this.onDoneInterfaceFlag ){
				this.stopEventPropagation();
			}
			
			mw.log("EmbedPlayer:: trigger: ended ( inteface continue pre-check: " + this.onDoneInterfaceFlag + ' )' );
			$( this ).trigger( 'ended' );
			mw.log("EmbedPlayer::onClipDone:Trigged ended, continue? " + this.onDoneInterfaceFlag);

			
			if( ! this.onDoneInterfaceFlag ){
				// Restore events if we are not running the interface done actions
				 this.restoreEventPropagation(); 
				 return ;
			}
			
			// A secondary end event for playlist and clip sequence endings
			if( this.onDoneInterfaceFlag ){
				// We trigger two end events to match KDP and ensure playbackComplete always comes before  playerPlayEnd
				// in content ends. 
				mw.log("EmbedPlayer:: trigger: playbackComplete");
				$( this ).trigger( 'playbackComplete' );
				// now trigger postEnd for( playerPlayEnd )
				mw.log("EmbedPlayer:: trigger: postEnded");
				$( this ).trigger( 'postEnded' );
			}
			// if the ended event did not trigger more timeline actions run the actual stop:
			if( this.onDoneInterfaceFlag ){
				mw.log("EmbedPlayer::onDoneInterfaceFlag=true do interface done");
				// Prevent the native "onPlay" event from propagating that happens when we rewind:
				this.stopEventPropagation();
				
				// Update the clip done playing count ( for keeping track of replays )
				_this.donePlayingCount ++;
				
				// Rewind the player to the start: 
				// NOTE: Setting to 0 causes lags on iPad when replaying, thus setting to 0.01
				
				var onResetClip = function(){
					// Set to stopped state:
					_this.stop();
					
					// Check if we have the "loop" property set
					if( _this.loop ) {
						_this.stopped = false;
						_this.restoreEventPropagation(); 
						_this.play();
						return;
					} else {
						// make sure we are in a paused state. 
						_this.pause();
					}
					
					// Check if have a force display of the large play button
					if( mw.getConfig('EmbedPlayer.ForceLargeReplayButton') === true ){
						_this.addLargePlayBtn();
					} else{
						// Check if we should hide the large play button on end: 
						if( $( _this ).data( 'hideEndPlayButton' ) || !_this.useLargePlayBtn() ){
							_this.hideLargePlayBtn();
						} else {
							_this.addLargePlayBtn();
						}
					}
					// An event for once the all ended events are done.
					mw.log("EmbedPlayer:: trigger: onEndedDone");
					if ( !_this.triggeredEndDone ){
						_this.triggeredEndDone = true;
						$( _this ).trigger( 'onEndedDone' );
					}
					
					// Restore events after we rewind the player 
					// ( in a time out to handle, resedual events iOS )
					setTimeout(function(){
						_this.restoreEventPropagation(); 
					}, mw.getConfig( 'EmbedPlayer.MonitorRate' ) );
				}
				
				// HLS on iOS has time sync issues, ( reset the src via source switch ) 
				var orgSource = this.mediaElement.selectedSource;
				if( mw.isIOS() && orgSource.mimeType == "application/vnd.apple.mpegurl" ){
					var blackSource = new mw.MediaSource( 
						$('<source />').attr({
							'src':  mw.getMwEmbedPath() + 'modules/EmbedPlayer/resources/blackvideo.mp4',
							'type' : 'video/h.264'
						})
					);
					// switch to black video
					_this.switchPlaySource( blackSource, function(){
						// give iOS 1/2 second to figure out new src
						setTimeout(function(){
							// Switch back to content ( shouold clear out broken HLS state ) 
							_this.switchPlaySource( orgSource, function(){
								onResetClip();
							});
						},500);
					} );
				} else {
					this.setCurrentTime(0.01, function(){
						onResetClip();
					})
				}
			}
		}
	}
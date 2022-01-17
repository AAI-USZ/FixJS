function(event){
			// set a local method for true ad playback start. 
			_this.startedAdPlayback = function(){
				// disable the poster for smother HTML5 src switch:
				_this.embedPlayer.adTimeline.updateUiForAdPlayback( _this.currentAdSlotType );
				_this.startedAdPlayback = null;
			}
			// loading ad:
			_this.embedPlayer.pauseLoading();
			// sometimes CONTENT_PAUSE_REQUESTED is the last event we receive :(
			// give double click 12 seconds to load the ad, else return to content playback
			setTimeout( function(){
				if( $.isFunction( _this.startedAdPlayback ) ){
					// ad error will resume playback
					_this.onAdError( " CONTENT_PAUSE_REQUESTED without no ad LOADED! ");
				}
			}, 12000 );
		}
function(){
				if( $.isFunction( _this.startedAdPlayback ) ){
					// ad error will resume playback
					_this.onAdError( " CONTENT_PAUSE_REQUESTED without no ad LOADED! ");
				}
			}
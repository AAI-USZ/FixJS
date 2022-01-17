function(){
			// restore the playlist blocker ( if present  
			$( _this.target + ' .playlist-block-list').show();
			
			// only resize if the playlist has a ui: 
			if( !_this.sourceHandler.includeInLayout ){
				return ;
			}
			
			// Do another resize on a timeout ( takes time for iframe to resize )
			setTimeout(function(){
				_this.syncPlayerSize();
			}, 250);
			
			$(uiSelector).show();
		}
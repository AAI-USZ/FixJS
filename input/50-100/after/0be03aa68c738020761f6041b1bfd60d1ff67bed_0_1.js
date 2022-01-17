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
			// Add an additional sync player size call in case things are not up-to date at 250ms  
			setTimeout(function(){
				_this.syncPlayerSize();
			}, 500);
			
			$(uiSelector).show();
		}
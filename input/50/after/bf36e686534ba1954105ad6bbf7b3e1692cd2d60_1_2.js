function(){
			isPlaying = true;
			_this.embedPlayer.duration = vid.duration;
			$( vid ).unbind( playBindStr );
		}
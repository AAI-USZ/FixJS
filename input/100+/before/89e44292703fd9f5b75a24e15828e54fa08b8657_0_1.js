function() {
		if(channel) {
			channel.stop();
			channel = null;
		} else {
			if (self._tmpObj && self._tmpObj.path != currentPath){
				currentPath = self._tmpObj.path		
				mp3 = new air.Sound(new air.URLRequest('file://' + currentPath));
			}
			channel = mp3.play();
			channel.addEventListener(air.Event.SOUND_COMPLETE,
			function(e) { channel = null; btn.attr('value', 'Play'); }); 
		}
		btn.attr('value', channel ? 'Stop' : 'Play');
	}